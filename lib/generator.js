const fs = require('fs');
const {
  createCanvas
} = require('canvas');
const {
  url_for,
} = require('hexo-util');


module.exports = function (locals) {
  const {
    config
  } = this;
  const {
    og_image
  } = config;
  const {
    main_color,
    secondary_color,
    font_color,
    title_font,
    title_height,
    date_font,
    date_height,
  } = og_image;

  let posts = locals.posts.sort('-date');
  posts = posts.filter(post => {
    return post.draft !== true;
  });

  data = [];
  for (let i = 0; i < posts.length; i++) {
    var post = posts[i];
    var filepath = url_for.call(post.path) + "thumbnail.png";
    var title = post.title;
    var date = post.date;

    let width = 1200;
    let height = 628;

    var is_cjk = (content) => {
      var reg = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\u3131-\uD79D]/g;
      if (String(content).match(reg)) {
        return true;
      } else {
        return false;
      }
    }

    var wrapText = (text, font, maxWidth, maxHeight) => {
      const words = [];
      for (const [_, w] of text.split(' ').entries()) {
        if (is_cjk(w)) {
          for (const [_, x] of w.split('').entries()) {
            words.push(x);
          }
        } else {
          words.push(w);
        }
      }
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      ctx.font = font;
      let line = '';
      let lines = [];
      for (const [index, w] of words.entries()) {
        let testLine = "";
        if (is_cjk(w)) {
          testLine = line + w;
          if (!is_cjk(words[index + 1])) {
            testLine = testLine + ' ';
          }
        } else {
          testLine = line + w + ' ';
        }
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && index > 0) {
          if (maxHeight < date_height * index) {
            line = line + "...";
            break;
          }
          lines.push(line);
          line = w;
          if (!is_cjk(w)) line = line + ' ';
        } else {
          line = testLine;
        }
      }
      if (line.length > 0) {
        lines.push(line);
      }
      return lines.reverse();
    }

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.fillStyle = main_color;
    context.fillRect(0, 0, width, height);

    context.fillStyle = secondary_color;
    context.fillRect(0, 600, width, height);

    context.fillStyle = font_color;
    context.font = date_font;
    let remaining = 628 - 58 - date_height;
    context.fillText(date, 50, remaining);

    context.font = title_font;
    context.fillStyle = title_height;
    let lines = wrapText(title, context.font, width - 100, remaining);
    for (const [index, line] of lines.entries()) {
      context.fillText(line, 50, remaining - (index + 1) * title_height);
    }

    const buffer = canvas.toBuffer('image/png');
    data.push({filepath, buffer});
  }


  return data;
};
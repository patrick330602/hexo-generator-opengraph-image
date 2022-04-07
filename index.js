/* global hexo */
'use strict';

hexo.config.og_image = Object.assign({
  enable: true,
  main_color: '#fff',
  secondary_color: "#000",
  font_color: "#000",
  title_font: "Bold 70pt Arial",
  date_font: "Regular 30pt Arial",
}, hexo.config.og_image);

const config = hexo.config.og_image;
const ogimage = require('./lib/generator');

if (!config.enable) {
  return;
}

hexo.extend.generator.register('og_image', locals => {
    return ogimage.call(hexo, locals);
});


/* global hexo */
'use strict';

hexo.config.opengraph_image = Object.assign({
  enable: true,
  main_color: '#fff',
  secondary_color: "#000",
  font_color: "#000",
  title_font: "Bold 70pt Arial",
  date_font: "Regular 30pt Arial",
}, hexo.config.opengraph_image);

const config = hexo.config.opengraph_image;
const ogimage = require('./lib/generator');

if (!config.enable) {
  return;
}

hexo.extend.generator.register('opengraph_image', locals => {
    return ogimage.call(hexo, locals);
});


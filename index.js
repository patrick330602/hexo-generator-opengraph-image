/* global hexo */
'use strict';

hexo.config.opengraph_image = Object.assign({
  enable: true,
  main_color: '#fff',
  secondary_color: "#000",
  font_color: "#000",
  title_font: "Bold 70pt Arial",
  date_font: "Regular 30pt Arial",
  date_style: "YYYY/MM/DD",
}, hexo.config.opengraph_image);

const config = hexo.config.opengraph_image;
const ogimage = require('./lib/generator');

if (!config.enable) {
  return;
}

hexo.extend.generator.register('opengraph_image', locals => {
    return ogimage.call(hexo, locals);
});

hexo.extend.helper.register('opengraph_image', function(){
    const url_for = hexo.extend.helper.get('url_for').bind(hexo);
    const is_post = hexo.extend.helper.get('is_post').bind(hexo);
    return '<meta property="og:image" content="https://cdn.patrickwu.space/base/social.png" />';
});
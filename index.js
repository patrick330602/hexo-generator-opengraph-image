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
    if (this.is_post() ) {
        let url_path = "";
        if (this.page.thumbnail) {
            url_path = this.full_url_for(this.page.thumbnail);
        } else {
            url_path = this.full_url_for(this.path).replace(/index\.html$/, "") +'thumbnail.png';
        }
        return '<meta property="og:image" content="' + url_path + '" />';
    }
});
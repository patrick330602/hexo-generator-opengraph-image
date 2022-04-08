# hexo-generator-opengraph-image

Generate OpenGraph Images for your every post in Hexo.

## Usage

1. Install package by running `npm install --save hexo-generator-opengraph-image`;
2. include the `opengraph_image()` in the header section of your theme file (for example, in ejs you should input `<%- opengraph_image() %>`).

Default Configuration in `_config.yml`:

```yml
opengraph_image:
  enable: true
  main_color: '#fff'
  secondary_color: "#000"
  font_color: "#000"
  title_font: "Bold 70pt Arial"
  date_font: "Regular 30pt Arial"
  date_style: "YYYY/MM/DD"
```
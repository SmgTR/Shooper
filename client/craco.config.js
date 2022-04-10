const sassResourcesLoader = require('craco-sass-resources-loader');
module.exports = {
  mode: 'development',
  output: {
    path: __dirname
  },
  plugins: [
    { plugin: sassResourcesLoader, options: { resources: './src/styles/sass/global.scss' } }
  ]
};

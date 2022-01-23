const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const PAGES_DIR = path.join(__dirname, '/src/pug/pages/')
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'))

module.exports = {
  context: path.resolve(__dirname, 'src'),
  plugins: [
    new CleanWebpackPlugin(),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`
        })
    ),
    new CopyPlugin({
      patterns: [{ from: 'static', to: 'static', noErrorOnMissing: true }]
    })
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  }
}

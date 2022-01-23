const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',

  entry: {
    main: ['./index.js']
  },

  output: {
    filename: 'scripts/build.[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/build.[contenthash].css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      overrideBrowserslist: ['> 1%', 'last 4 version']
                    }
                  ]
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[contenthash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[contenthash][ext]'
        }
      }
    ]
  }
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})

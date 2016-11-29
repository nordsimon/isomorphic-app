const path = require("path");
const fs = require('fs');
const webpack = require('webpack');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const entries = fs.readdirSync('./apps')
.map(file => {
  const absolutePath = path.resolve('./apps', file)

  return {
    name: file,
    absolutePath: path.resolve(absolutePath, 'client.js'),
    isDirectory: fs.statSync(absolutePath).isDirectory()
  }
})
.filter(s => s.isDirectory)
.reduce((entries, entry) => Object.assign(entries, {
  [entry.name]: ['webpack-hot-middleware/client', entry.absolutePath]
}), {})

module.exports = {
    entry: entries,
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: '/dist',
        chunkFilename: "[id].chunk.js"
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            plugins: [
              ["react-transform", {
                transforms: [{
                  "transform": "react-transform-hmr",
                  "imports": ["react"],
                  "locals": ["module"]
                }, {
                  "transform": "react-transform-catch-errors",
                  "imports": ["react", "redbox-react"]
                }]
              }]
            ]
          }
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new CommonsChunkPlugin({
          filename: "commons.js",
          name: "commons"
      })
    ]
}

const express = require('express');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const renderReactApp = require('./lib/renderReactApp');

const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

const app = express();

const start = +new Date();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

glob("apps/**/routes.js", function (err, routeFiles) {
  routeFiles.forEach(file => {
    const routes = require(path.resolve(__dirname, file))
    const name = file.split('/')[1]

    Object.keys(routes).forEach(route => {
        const reactApp = routes[route]

        app.get(route, renderReactApp(name, reactApp))
    })
  })
})


app.listen(4000, function() {
  console.log('open http://localhost:4000 in your browser')
})

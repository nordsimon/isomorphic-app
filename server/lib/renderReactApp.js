const ReactDOM = require('react-dom/server');
const React = require('react');
const start = +new Date();

module.exports = function renderReactApp(name, reactApp) {
  return (req, res) => {
    res.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${name}</title>
        </head>
        <body>
    `)

    const html = ReactDOM.renderToString(React.createElement(reactApp))

    res.write(`<div id="app">${html}</div>`)

    res.write(`
        <script type="text/javascript" src="/dist/commons.js?time=${start}"></script>
        <script type="text/javascript" src="/dist/${name}.bundle.js?time=${start}"></script>
        </body>
      </html>
    `)

    res.end();
  }
}

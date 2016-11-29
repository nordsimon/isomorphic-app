const React = require('react');
const ReactDOM = require('react-dom')
const Route = require('route-parser');

module.exports = function(routes) {
  for (let route in routes) {
    if(new Route(route).match(window.location.pathname)) {
      return ReactDOM.render(React.createElement(routes[route]), document.getElementById('app'))
    }
  }
}

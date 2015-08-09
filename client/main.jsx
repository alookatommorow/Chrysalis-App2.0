require('./assets/app.css');
// require('./assets/menu.css');
// require('./assets/blabs.css');
// require('./assets/pure.css')

var React = require('react');
var App = require('./components/App.jsx');
var Router = require('react-router');
var routes = require('./config/routes.jsx');

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});

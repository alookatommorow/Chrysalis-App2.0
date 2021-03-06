var React = require('react');
var Reqwest = require('reqwest');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Uri = require('jsuri');

// Components
var NavBar = require('./NavigationBar.jsx')

var App = React.createClass({
  getDefaultProps: function() {
    // use this for heroku deployment
    return {origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''};

    // use this when in development
    // return {origin: 'http://localhost:3000'};
  },
  getInitialState: function() {
    return {
      signedIn: false,
      currentUser: {handle: '', uid: null},
      showMenu: false,
    };
  },
  componentWillMount: function() {
    var jwt = new Uri(location.search).getQueryParamValue('jwt');
    if (!!jwt) {sessionStorage.setItem('jwt', jwt);}
  },
  componentDidMount: function() {
    if (!!sessionStorage.getItem('jwt')) {this.currentUserFromAPI();}
  },
  currentUserFromAPI: function() {
    this.readFromAPI(this.props.origin + '/current_user', function(user) {
      this.setState({signedIn: true, currentUser: user, uid: user.uid});
    }.bind(this));
  },

  handleMenuClick: function() {
    this.setState({showMenu: !this.state.showMenu});
  },

  readFromAPI: function(url, successFunction) {
    Reqwest({
      url: url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      headers: {'Authorization': sessionStorage.getItem('jwt')},
      success: successFunction,
      error: function(error) {
        console.error(url, error['response']);
        location = '/';
      }
    });
  },
  writeToAPI: function(url, method, data, successFunction) {
    Reqwest({
      url: url,
      type: 'json',
      method: method,
      data: data,
      contentType: 'application/json',
      headers: {'Authorization': sessionStorage.getItem('jwt')},
      success: successFunction,
      error: function(error) {
        console.error(url, error['response']);
        location = '/';
      }
    });
  },

  render: function () {
    var menu = this.state.showMenu ? 'show-menu' : 'hide-menu';

    return (
      <div id="app" className={menu}>
        <NavBar signedIn={this.state.signedIn} currentUser={this.state.currentUser} origin={this.props.origin} sendMenuClick={this.handleMenuClick}/>
          <RouteHandler origin={this.props.origin} readFromAPI={this.readFromAPI} writeToAPI={this.writeToAPI} signedIn={this.state.signedIn} currentUser={this.state.currentUser}/>
      </div>
    );
  },
});


module.exports = App;

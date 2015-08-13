var React = require('react');
var Basket = require('../basket.js');
var Router = require('react-router');
var Link = Router.Link;


// Material UI
var mui = require('material-ui');
var TextField = mui.TextField;
var ThemeManager = new mui.Styles.ThemeManager();
var RaisedButton = mui.RaisedButton;
var LinearProgress = mui.LinearProgress;
var Slider = mui.Slider;
var Dialog = mui.Dialog;

// Components
var StocksContainer = require('./StocksContainer.jsx');
var RecommendedPieChart = require('./RecommendedPieChart.jsx')
var UserPieChart = require('./UserPieChart.jsx')

var slider_value = null

var RecommendationContainer = React.createClass({
  getInitialState: function () {
    return {
      risk_preference: null,
      slider: null,
      age: null,
      modalOpen: false,
      basket: new Basket,
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentDidMount: function(){
    this.readUserInfoFromApi();
    this.state.basket.on('change', this.basketChanged);
    this.state.basket.on('new_stocks', this.wipeOutBasket);
    if (!!sessionStorage.getItem('jwt')) {this.readUserInfoFromApi();}
  },

  wipeOutBasket: function () {
    this.state.basket.empty();
    this.forceUpdate();
  },

  componentWillUnmount: function(){
    this.state.basket.off('change');
  },

  basketChanged: function(){
    this.forceUpdate();
    this.state.basket.emit('update-chart');
  },

  readUserInfoFromApi: function(){
    var uid = this.props.currentUser.uid
    this.props.readFromAPI(this.props.origin + '/users/' + uid + '/profile', function(info){
      this.setState({
        risk_preference: info.risk_preference,
        age: info.age,
        modalOpen: !info.ageSet,
      });
    }.bind(this));
  },

  createUserBasket: function (e) {
    e.preventDefault();
    var id = {}
    this.forceUpdate();
    for(var i = 0; i < this.state.basket.stocks.length; i++) {
        id[i] = this.state.basket.stocks[i].ticker
    };

    var data = {
      info: {
        ids: id,
        name: this.refs.createBasket.getValue(),
      }
    };
    var uid = this.props.currentUser.uid

    this.props.writeToAPI(this.props.origin + '/users/' + uid + '/baskets', 'post', JSON.stringify(data), function(message){
      this.refs.createBasket.clearValue();
      alert('Basket Created!');
    }.bind(this));
    this.state.basket.emit('basket_created');
  },

  handleRiskSliderMove: function (e, value) {
    slider_value = value
  },

  updateSliderValue: function (e, ui) {
    this.setState({risk_preference: slider_value})
  },

  render: function () {
    if (this.props.signedIn === true && this.state.modalOpen === true) {
      var profileSetUpModal = (
        <Dialog openImmediately={true}>
          Please click here to set up your profile:
          <br />
          <Link to="profile">{this.props.currentUser}</Link>
        </Dialog>
      );
    };
    if (this.state.basket.stocks.length != 0) {
      var addBox = false
    } else {
      var addBox = true
    };
    if (this.state.risk_preference != null) {
      var standardActions = [
        { text: 'Close' },
      ];
      var modal = (
        <Dialog openImmediately={true} modal={true} actions={standardActions}>
          Move the slider to browse different stocks
          <br />
          To create a basket, please add at least one stock!
        </Dialog>
      )
      return (
        <div className="container">
          {profileSetUpModal}
          <div className="row">
            <div className="small-12 medium-6 large-6 columns Ta(c)">
              <RecommendedPieChart age={this.state.age}/>
              <br />
            </div>
            <div className="small-12 medium-6 large-6 columns Ta(c)">
              <UserPieChart readFromAPI={this.props.readFromAPI} writeToAPI={this.props.writeToAPI} currentUser={this.state.currentUser} basket={this.state.basket}/>
              <br />
            </div>
          </div>
          <div className="row">
            <div className="small-12 medium-6 large-4 columns">
              <div>
              <TextField
                ref="createBasket"
                hintText="Required"
                errorText={this.state.floatingErrorText}
                floatingLabelText="Basket Name"
                onChange={this._handleFloatingErrorInputChange}/>
              <br />
              <RaisedButton label="Create Basket" primary={true} onClick={this.createUserBasket} disabled={addBox}/>
              <br />
              </div>
              {this.state.message}
              {modal}
            </div>
            <div className="small-12 medium-6 large-8 columns">
              <p>Move the Slider to adjust Risk Preference</p>
              <Slider name="Risk Preference" defaultValue={Number(this.state.risk_preference)} step={1} min={1} max={10} onChange={this.handleRiskSliderMove} onDragStop={this.updateSliderValue}/>
            </div>
          </div>
            <div className="row">
              <div className="small-12 medium-12 large-12 columns">
                <StocksContainer risk_preference={this.state.risk_preference} readFromAPI={this.props.readFromAPI} origin={this.props.origin} basket={this.state.basket}/>
              </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h3>Loading Your Recommended Stocks...</h3>
          {profileSetUpModal}
          <LinearProgress mode="indeterminate"  />
        </div>
      );
    };

  },
});

module.exports = RecommendationContainer;

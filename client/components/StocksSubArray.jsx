var React = require('react');
var mui = require('material-ui');
var StockCard = require('./StockCard.jsx')
var Card = mui.Card;
var CardHeader = mui.CardHeader;
var CardText = mui.CardText;
var CardActions = mui.CardActions;
var ThemeManager = new mui.Styles.ThemeManager();
var RaisedButton = mui.RaisedButton;


var StocksSubArray = React.createClass({

	childContextTypes: {
    muiTheme: React.PropTypes.object
  },

	getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  handleClicked: function () {
  	console.log('healsflakj')
  },

	render: function () {
		var stocks = this.props.stocks.map(function (stock, index) {
			return (

				<StockCard key={stock.id} stock={stock} definitions={this.props.definitions} basket={this.props.basket}/>

			);
		}.bind(this));
		return (
			<div>
				{stocks}
			</div>
		);
	},

});

module.exports = StocksSubArray;
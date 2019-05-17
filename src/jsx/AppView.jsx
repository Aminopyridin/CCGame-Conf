var GameModel = require("./GameModel");
var GameView = require("./GameView");
var tracker = require("./Tracker");
var settings = require("../settings.json");

var AppView = React.createClass({
	mixins: [Backbone.React.Component.mixin],
	getInitialState: function() {
		return {
			started: false,
		};
	},
	render: function() {
		return (
				<div>
					{this.renderHeader()}
			  	{this.renderBody()}
			  </div>
		);
	},


	renderHeader: function(){
		var classes = "header-text" + (this.state.started ? '' : ' tall');
		return (
			<div>
		    <div className="container">
		      <div className={classes}>
			      <h1 className="pointer" onClick={this.handleHome}>The Clean Code Game</h1>
		      </div>
		    </div>
		  </div>
		)
	},

	handleHome: function(){
		window.location.reload();
	},

	renderBody: function(){
		if (this.state.started)
			return <div className="container">
					<GameView model={this.getModel()}/>
				</div>
		else
			return this.renderIntro();
	},

	renderIntro: function(){
		return <div className="container body">
		    <div className="home-text"> 
		      <p>
		        {settings.description}
		      </p>
		      <p>Проверь себя!</p>
		      <p><button className="button" onClick={this.handleClick}>Начать игру</button></p>
		    </div>
			<img className="home-cat" src="img/cat.png" />
		    <div className="clearfix"></div>
		  </div>
	},

	handleClick: function(){
		this.setState({
			started: true
		});
	},

	handleKonturClick: function(){
		tracker.track("career");
	},
});

React.render(<AppView model={new GameModel()} />, document.getElementById("app"));
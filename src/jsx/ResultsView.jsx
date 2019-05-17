var BooksView = require("./BooksView");
var tracker = require("./Tracker");

function removeHash () { 
	history.pushState("", document.title, window.location.pathname + window.location.search);
}

var ResultsView = React.createClass({
	mixins: [Backbone.React.Component.mixin],
	getInitialState: function() {
		return {
			userName: null,
			email: null,
			registered: false,
		};
	},
	componentDidMount: function() {
		tracker.finished(this.props.score);
		removeHash();
	},

	getScorePercentage: function(){
		if (this.props.maxScore <= 0) return 0;
		return Math.round(100 * this.props.score / this.props.maxScore);
	},


	render: function() {
		if (!this.state.registered || !this.state.email || !this.state.userName) {
			return this.renderAuthView();
		}

		var rate = this.getScorePercentage();
		if (rate > 100)
			return this.renderVerdict("Ого! Да перед нами читер!");
		else if (rate == 100) 
			return this.renderVerdict("Ого! Да перед нами профи!");
		else if (rate > 60)
			return this.renderVerdict("Неплохо, неплохо. Но можно и лучше!");
		else
			return this.renderVerdict("Ну, по крайней мере ты добрался до конца!");
	},

	renderVerdict: function(headerPhrase){
		return (
			<div>
				<h2>{headerPhrase}</h2>
				{this.renderScoreInfo()}
				
				<BooksView />
				{this.renderAgainButton()}
			</div>);
	},

	renderScoreInfo: function(){
		return (
			<p>Ты прошел Clean Code Game с результатом {this.getScorePercentage()}%! ({this.props.score} из {this.props.maxScore} возможных).</p>
			);
	},

	renderAgainButton: function(){
		return <p><a className="button" href="#" onClick={this.handlePlayAgain}>Ещё разик?</a></p>
	},

	renderAuthView: function() {
		return (
			<div className="registrationContainer">
				<form className="form" onSubmit={this.handleSubmitRegForm}>
					<input 
						value={this.state.userName}
						onChange={evt => this.setState({userName: evt.target.value})}
						className="block" 
						type="text"
						id="name" 
						name="name"
						placeholder="Имя и фамилия"
						autofocus
						autoComplete="off"
					/>
					<input
						value={this.state.email}
						onChange={evt => this.setState({email: evt.target.value})}
						className="block" 
						type="email"
						id="email" 
						name="email" 
						placeholder="Email" 
						autoComplete="off" />
					<button className="button" type="submit">
						Посмотреть результат
					</button>
				</form>
			</div>
		);
	},

	handlePlayAgain: function(){
		tracker.track("again_after_success_with", this.props.score);
		this.getModel().reset();
	},

	handleSubmitRegForm: function(evt) {
		evt.preventDefault();
		var currentScoreboard = localStorage.getItem("ccscoreboard");
		if (currentScoreboard) {
			currentScoreboard = JSON.parse(currentScoreboard);
		} else {
			currentScoreboard = [];
		}

		currentScoreboard.push({
			name: this.state.userName,
			email: this.state.email,
			score: this.props.score,
		})

		localStorage.setItem("ccscoreboard", JSON.stringify(currentScoreboard));

		this.setState({
			registered: true,
		});
	}
});

module.exports = ResultsView;

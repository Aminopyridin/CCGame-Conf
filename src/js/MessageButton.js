module.exports = React.createClass({displayName: "exports",
	propTypes: {
		title: React.PropTypes.string,
		disabledTitle: React.PropTypes.string,
		enabled: React.PropTypes.bool,
		message: React.PropTypes.string,
		onClick: React.PropTypes.func
	},

	handleClick: function(){
		bootbox.alert(this.props.message, this.props.onClick);
	},

	render: function() {
		if (this.props.enabled)
			return React.createElement("span", {className: "tb-item", onClick: this.handleClick}, this.props.title);
		else 
			return React.createElement("span", {className: "tb-item disabled"}, this.props.disabledTitle)
	}
});
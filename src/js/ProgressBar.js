var ProgressBar = React.createClass({displayName: "ProgressBar",
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return React.createElement("table", {className: "header-progress"}, 
					React.createElement("tr", null, 
						
							_.map(_.keys(this.props.levels), function(level, i){
								var classes = "progress-tile" + ((i < this.props.levelIndex) ? " solved" : "");
								return React.createElement("td", {key: "level" + i, className: classes})
							}.bind(this))
						
					)
				)
	},
});

module.exports=ProgressBar;
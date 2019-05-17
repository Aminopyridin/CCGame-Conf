var settings = require("../settings.json");

var CodeView = React.createClass({
	propTypes: {
		code: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func.isRequired
	},

	getDefaultProps: function() {
		console.log(settings.codeMirrorMode)
		return {
			lineNumbers: false,
			mode: settings.codeMirrorMode,
			readOnly: "nocursor",
		};
	},

	componentDidMount: function() {
		this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), this.props);
		this.getDOMNode().onmouseup =
			function(ev){
				var sel = this.editor.doc.sel.ranges[0].head;
				var $el = $(ev.target);
				var word = $el.text();
				this.props.onClick(sel.line, sel.ch, word, $el);
			}.bind(this);
	},

    componentDidUpdate: function() {
    	if (this.editor) {
        	this.editor.setValue(this.props.code);
    	}
    },

	render: function() {
		return (
			<div>
				<textarea
					ref='editor'
					defaultValue={this.props.code}
					readOnly='true' />
			</div>);
	}
});

module.exports = CodeView;
var CodeSample = require("./CodeSample");
window.levels = require("../../data/data.json");

function getHash(){
	if (window && window.location && window.location.hash !== undefined && window.location.hash.length > 0)
		return Math.max(0, ~~window.location.hash.substring(1) - 1);
	else
		return 0;
}


var GameModel = Backbone.Model.extend({
	defaults: {
		levelIndex: getHash(),
		levels: levels,
		level: new CodeSample(levels[getHash()]),
		originalLevel: new CodeSample(levels[getHash()]),
		prevScore: 0,
		score: 0,
		maxScore: 0,
		penalty: {},
		levelPenalty: [],
		bugTime: Date.now(),
		startLevelTime: Date.now(),
	},

	reset: function(){
		this.set(this.defaults);
	},

	finishLevel: function(){
		var newLevelIndex = this.get('levelIndex')+1;
		var newLevel = newLevelIndex < this.get('levels').length ? new CodeSample(levels[newLevelIndex]) : null;
		var penalty = this.get('penalty');
		var levelPenalty = this.get('levelPenalty');
		_(levelPenalty).uniq().forEach(function(t){ penalty[t] = ~~penalty[t] + 1});
		var originalLevel = this.get('originalLevel');
		var additionalMaxScore = originalLevel ? 1000 * originalLevel.bugsCount : 0
		this.set({
			maxScore: this.get('maxScore') + additionalMaxScore,
			levelIndex: this.get('levelIndex')+1,
			level: newLevel,
			originalLevel: newLevel,
			penalty: penalty,
			levelPenalty: [],
			startLevelTime: Date.now(),
		});
	},

	fixBug: function(bug){
		var level = this.get('level');
		var fixedCode = level.fix(bug);
		var bugTime = this.get('bugTime');
		var startLevelTime = this.get('startLevelTime');
		var additionalScore = Math.round(1000 - (Date.now() - Math.max(bugTime, startLevelTime)) / 1000);

		if (this.get('levelIndex') === 0) {
			additionalScore = 1000;
		}

		var score = this.get('score');
		var nextScore = score + (additionalScore >= 1 ? additionalScore : 1);


		this.set({
			prevScore: score,
			score: nextScore,
			level: fixedCode,
			bugTime: Date.now(),
		});
	},

	useHint: function(){
		if (~~this.get('level').learning) return;
		this.decreaseScore(this.get('score') - 400);
	},

	missClick: function(){
		if (~~this.get('level').learning) return;
		this.decreaseScore(this.get('score') - 200);
	},

	decreaseScore: function(newScore){
		var prevScore = this.get('score');
		this.set({
			prevScore: prevScore,
			score: newScore,
			levelPenalty: this.updatePenalty()
		});
	},

	updatePenalty: function(){
		var bugs = _.values(this.get('level').bugs);
		return _.union(_.pluck(bugs, 'type'), this.get('levelPenalty'));
	},
})

module.exports = GameModel;

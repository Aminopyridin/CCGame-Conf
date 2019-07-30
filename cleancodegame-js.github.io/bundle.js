(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GameModel = require("./GameModel");
var GameView = require("./GameView");
var tracker = require("./Tracker");
var settings = require("../settings.json");

var AppView = React.createClass({displayName: "AppView",
	mixins: [Backbone.React.Component.mixin],
	getInitialState: function() {
		return {
			started: false,
		};
	},
	render: function() {
		return (
				React.createElement("div", null, 
					this.renderHeader(), 
			  	this.renderBody()
			  )
		);
	},


	renderHeader: function(){
		var classes = "header-text" + (this.state.started ? '' : ' tall');
		return (
			React.createElement("div", null, 
		    React.createElement("div", {className: "container"}, 
		      React.createElement("div", {className: classes}, 
			      React.createElement("h1", {className: "pointer", onClick: this.handleHome}, "The Clean Code Game")
		      )
		    )
		  )
		)
	},

	handleHome: function(){
		window.location.reload();
	},

	renderBody: function(){
		if (this.state.started)
			return React.createElement("div", {className: "container"}, 
					React.createElement(GameView, {model: this.getModel()})
				)
		else
			return this.renderIntro();
	},

	renderIntro: function(){
		return React.createElement("div", {className: "container body"}, 
		    React.createElement("div", {className: "home-text"}, 
		      React.createElement("p", null, 
		        settings.description
		      ), 
		      React.createElement("p", null, "Проверь себя!"), 
		      React.createElement("p", null, React.createElement("button", {className: "button", onClick: this.handleClick}, "Начать игру"))
		    ), 
			React.createElement("img", {className: "home-cat", src: "img/cat.png"}), 
		    React.createElement("div", {className: "clearfix"})
		  )
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

React.render(React.createElement(AppView, {model: new GameModel()}), document.getElementById("app"));
},{"../settings.json":15,"./GameModel":6,"./GameView":8,"./Tracker":13}],2:[function(require,module,exports){
module.exports=[
  {
    "name": "hello",
    "instruction": "Найди и исправь все стилевые ошибки в коде. Кликай мышкой по ошибкам.\nКаждая найденная ошибка приносит баллы",
    "learning": true,
    "code": "function hello() {\n\tconst {{veryBadVariableName_clickIt}} = prompt('Enter your name: ');\n\talert('Hello, ' + {{veryBadVariableName_clickIt}});\n}",
    "bugs": {
      "veryBadVariableName_clickIt": {
        "type": "naming",
        "replace": "name",
        "description": "Длинное и ужасное имя переменной!"
      }
    }
  },
  {
    "name": "GetThem",
    "instruction": "Качественно выбранные имена — то что делает ваш код понятнее!",
    "learning": true,
    "code": "function {{getThem}}({{theBigList}}) {\n\tconst {{list1}} = []\n\n\t{{theBigList}}.forEach(function(cell, index) {\n\t\tif (!cell) {\n\t\t\t{{list1}}.push(index)\n\t\t}\n\t})\n\treturn {{list1}}\n}",
    "bugs": {
      "getThem": {
        "type": "naming",
        "replace": "getEmptyPositions",
        "description": "Не используйте местоимения в именах. Это совсем не добавляет понятности."
      },
      "list1": {
        "type": "naming",
        "replace": "emptyPositions",
        "description": "Имя должно отражать семантику, а не тип переменной. Имена вида s, list, array не дают полезной информации читателю."
      },
      "theBigList": {
        "type": "naming",
        "replace": "allCells",
        "description": "Имя должно отражать семантику, а не тип переменной. Имена вида s, list, array не дают полезной информации читателю."
      }
    }
  },
  {
    "name": "ViewsPerSecond",
    "instruction": "А что ещё, кроме качественных имен может сделать код понятнее?",
    "learning": true,
    "code": "function getViewsPerSecond(views, {{t}}) {\n\tvar {{n}} = {{86400}};\n\tvar viewsCount = views.filter(function(v) {\n\t\treturn v.date === {{t}};\n\t}).length;\n\treturn viewsCount / {{n}};\n}",
    "bugs": {
      "86400": {
        "type": "other",
        "replace": "24 * 60 * 60",
        "description": "Иногда, арифметические выражения понятнее, чем значение этого выражения.\nЗапись 24 * 60 * 60 проще проверить на корректность, чем 86400."
      },
      "t": {
        "type": "naming",
        "replace": "date",
        "description": "Имя переменной должно отражать семантику. \nСтарайтесь избегать однобуквенных имен. Общее правило: чем больше область видимости — тем подробнее должно быть имя."
      },
      "n": {
        "type": "naming",
        "replace": "secondsInDay",
        "description": "Имя переменной должно отражать семантику. \nСтарайтесь избегать однобуквенных имен. Общее правило: чем больше область видимости — тем подробнее должно быть имя."
      }
    }
  },
  {
    "name": "rstr",
    "instruction": "Осторожнее — начиная с этого уровня, за каждый неверный клик и каждую подсказку вы будете терять баллы!",
    "code": "var {{rstr}} = prompt('');\nvar {{flag}} = false;\nfor (var charIndex = 0; charIndex < {{rstr}}.length; charIndex++) {\n\tif ({{flag}} || {{rstr}}[charIndex] !== '\\\\') {\n\t\tconsole.log({{rstr}}[charIndex]);\n\t}\n\t{{flag}} = {{rstr}}[charIndex] === '\\\\'\n}",
    "bugs": {
      "rstr": {
        "replace": "line",
        "type": "naming",
        "description": "Избегайте труднпрзнсимых имен и кодирования, понятного лишь вам."
      },
      "flag": {
        "replace": "escaped",
        "type": "naming",
        "description": "Не называйте булевы переменные flag, f и подобными именами.\nУ каждого \"флага\" есть смысл, который и нужно отразить в имени."
      }
    }
  },
  {
    "name": "bigrams",
    "instruction": "Придерживайтесь общепринятого стиля именования для текущего языка программирования.",
    "code": "function getBigrams(words) {\n\tvar {{colBigrams}} = words.length - 1;\n\tvar {{bigrams_list}} = [];\n\tfor (var {{I}} = 0; {{I}} < {{colBigrams}}; {{I}}++) {\n\t\t{{bigrams_list}}[{{I}}] = words[{{I}}] + ' ' + words[{{I}} + 1];\n\t}\n\treturn {{bigrams_list}};\n}",
    "bugs": {
      "I": {
        "replace": "i",
        "type": "naming",
        "description": "В JS имена локальных переменных принято начинать с маленькой буквы.\nНарушение таких, казалось бы, несущественных правил часто сильно раздражает опытных программистов."
      },
      "colBigrams": {
        "replace": "bigramsCount",
        "type": "naming",
        "description": "Не используйте русские слова в именах (если только вы не программируете на 1C).\nЧитая код, программисты ожидают видеть английские имена, \nпоэтому написанные транслитом русские слова могут быть восприняты неправильно.\nНапример, в данном случае col (количество) легко спутать с сокращением от слова column."
      },
      "bigrams_list": {
        "type": "naming",
        "replace": "bigrams",
        "description": "В JS для составных имен принято использовать стиль CamelCase, и не использовать snake_case."
      }
    }
  },
  {
    "name": "manager",
    "instruction": "Продолжаем охоту на слова без смысла.",
    "code": "function {{dataManager}}() {\n\tconst filePath = path.resolve(settings.defaultDirectory, 'tasks.json');\n\tconst fileRowText = fs.readFileSync(filePath);\n\tconst tasks = JSON.parse(fileRowText);\n\treturn tasks;\n}",
    "bugs": {
      "dataManager": {
        "type": "naming",
        "replace": "getTasks",
        "description": "Manager — слово заместитель, не добавляющее смысла, как и слово data. Часто их можно заменить на что-то более осмысленное."
      }
    }
  },
  {
    "name": "CopyChars",
    "instruction": "Проблемы с именами в этом коде очевидны. Но тут есть кое-что еще!",
    "code": "function copyChars({{array1}}, {{array2}}) {\n\t{{//copy arrays item by item.}}\n\tfor(var i = 0; i < {{array1}}.length; i++) {\n\t\t{{array2}}[i] = {{array1}}[i];\n\t}\n}",
    "bugs": {
      "array1": {
        "replace": "source",
        "type": "naming",
        "description": "Имена с номерами на конце — это антипаттерн.\nВместо добавления номеров старайтесь отразить в именах суть различия."
      },
      "array2": {
        "replace": "destination",
        "type": "naming",
        "description": "Функцию с непонятными именами аргументов неудобно использовать."
      },
      "//copy": {
        "replace": "",
        "type": "comments",
        "description": "Нет смысла писать комментарии, повторяющие код."
      }
    }
  },
  {
    "name": "Chessboard",
    "instruction": "Время закрепить все полученные на предыдущих уровнях знания!",
    "code": "const {{colorCell}} = {\n\tblack: 'black',\n\twhite: 'white',\n}\n\nclass Chessboard {\n\tconstructor({{n}}) {\n\t\tthis.{{m_brdSz}} = {{n}};\n\t\tthis.{{array}} = [];\n\t\t{{//Fill board with black and white colors}}\n\t\tfor(var {{a}} = 0; {{a}} < this.{{m_brdSz}}; {{a}}++) {\n\t\t\tfor(var {{b}} = 0; {{b}} < this.{{m_brdSz}}; {{b}}++) {\n\t\t\t\tconst isBlack = ({{a}} + {{b}}) % 2 === 0;\n\t\t\t\tthis.{{array}}[{{a}}][{{b}}] = isBlack ? {{colorCell}}.black : {{colorCell}}.white\n\t\t\t}\n\t\t}\n\t}\n}",
    "bugs": {
      "//Fill": {
        "type": "comments",
        "replace": "",
        "description": "Комментарии повторяющие код не имеют смысла."
      },
      "colorCell": {
        "type": "naming",
        "replace": "cellColor",
        "description": "Нарушение правильного для английского языка порядка слов в составных именах — частая ошибка программистов \nсо слабым знанием английского.\ncolorCell — это цветная клетка, а цвет клетки — cellColor.\nНе путайте — не вводите в замешательство читающих."
      },
      "n": {
        "type": "naming",
        "replace": "size",
        "description": "В данном контексте, n может обозначать как размер шахматной доски, так и количество фигур на доске или номер доски.\nИмя size устранит эту неоднозначность."
      },
      "m_brdSz": {
        "type": "naming",
        "replace": "size",
        "description": "Не используйте закодированные или труднопроизносимые имена. Вам их придется произносить или хотя бы мысленно проговаривать!"
      },
      "array": {
        "type": "naming",
        "replace": "cellColors",
        "description": "Имя должно отражать семантику, а не тип переменной. Имена вида s, list, array не дают полезной информации читателю."
      },
      "a": {
        "type": "naming",
        "replace": "y",
        "description": "Для обозначения координат вместо i, j и a, b лучше использовать предсказуемые и понятные x, y. "
      },
      "b": {
        "type": "naming",
        "replace": "x",
        "description": "Избегайте необходимости мысленного декодирования при чтении кода."
      }
    }
  },
  {
    "name": "SplitMethod",
    "instruction": "Имена переменных и методов тут в порядке. Но не только это делает код хорошим!",
    "code": "function copyFile(filePath, outputPath) {\n\tconst inputLines = fs.readFileSync(filePath).split('\\n');\n\tif (fs.existsSync(outputPath)) {\n\t\toutputPath = path.resolve(outputPath, path.basename(filePath));\n\t}\n\t{{//Convert file}}\n\tconst escapedLines = inputLines.map(i => i.replace('\"', '\\\"'));\n\tconst outputText = escapedLines.join('\\n');\n\tfs.writeFileSync(outputPath, outputText);\n\tconsole.log(`${outputText.length} characters`);\n}",
    "bugs": {
      "//Convert": {
        "type": "methods",
        "replace": "convertFile(inputLines, outputPath);\n}\n\nfunction convertFile(inputLines, outputPath) {",
        "description": "Вместо комментария, разделяющего код на две фазы, стоит сделать настоящее разделение кода на методы.\nКаждый метод должен делать ровно одну вещь. Если вы можете естественным образом разбить одну функцию на две — сделайте это!\n"
      }
    }
  },
  {
    "name": "CommentExplainCode",
    "instruction": "Крохотные методы в одну-две строки часто могут значительно повысить читаемость кода.",
    "code": "{{//If employee deserves full benefits}}\nif ({{employee.isHourly() && employee.age > 65 || employee.hasSpecialReward()}}){\n\tpay(employee, fullBenefitsAmount); {{//Pay largeAmount}}\n} else {\n\tpay(employee, reducedAmount);\n}",
    "bugs":  {
      "//Pay": {
        "type": "comments",
        "replace": "",
        "description": "Комментарии повторяющие код не нужны. Они легко могут устареть!"
      },
      "employee.isHourly()": {
        "type": "methods",
        "replace": "employee.deservesFullBenefits()",
        "description": "Сложные булевы выражения стоит выделять в методы или вспомогательные переменные, давая им говорящие названия. Это улучшит читаемость."
      },
      "//If": {
        "type": "comments",
        "replace": "",
        "description": "Вместо поясняющего комментария лучше изменить код так, чтобы в комментарии не было нужды."
      }
    }
  },
  {
    "name": "endComments",
    "instruction": "Как вы уже поняли, далеко не все комментарии полезны!",
    "code": "try {\n\tlet linesCount = 0;\n\tlet charsCount = 0;\n\tfor (const line of lines) {\n\t\tlinesCount++;\n\t\tcharsCount += line.length;\n\t} {{//for}}\n} {{//try}}\ncatch (e) {\n\tconsole.error(`Error: ${e.message}`);\n} {{//catch}}",
    "bugs": {
      "//for": {
        "type": "comments",
        "replace": "",
        "description": "Комментарии вида 'конец цикла', 'конец функции' и подобные бессмысленны. "
      },
      "//try": {
        "type": "comments",
        "replace": "",
        "description": "Для коротких функций такие комментарии не нужны, а длинные функции лучше разбить на несколько более коротких."
      },
      "//catch": {
        "type": "comments",
        "replace": "",
        "description": "Современные среды разработки и программистские редакторы умеют подсвечивать парные скобки. Это надежнее таких комментариев."
      }
    }
  },
  {
    "name": "collision",
    "instruction": "Время закрепить освоенные знания!",
    "code": "{{/** \n * Обрабатывает столкновение героя с врагом\n */}}\nfunction collisionHandler(hero, enemy) {\n\t{{//If hero and enemy collided\n\tif ((hero.x - enemy.x)*(hero.x - enemy.x) + (hero.y - enemy.y)*(hero.y - enemy.y)\n\t    < (hero.radius + enemy.radius)*(hero.radius + enemy.radius)}}) {\n\t\thero.life--;\n\t\tif (!hero.isAlive) {{//нужно оповестить подписчиков}}\n\t\t\tonHeroDeath(hero);\n\t}\n}",
    "bugs": {
      "/**": {
        "type": "comments",
        "replace": "",
        "description": "JSDoc-комментарии бессмысленны, если не несут новую информацию."
      },
      "//If": {
        "type": "comments",
        "replace": "if (collided(hero, enemy))",
        "description": "Не используйте комментарии там, где можно выделить метод с говорящим именем."
      },
      "//нужно": {
        "type": "comments",
        "replace": "",
        "description": "Комментарии дословно повторяющие код бессмысленны."
      }
    }
  }
]

},{}],3:[function(require,module,exports){
var BooksView = React.createClass({displayName: "BooksView",
	books: [
		{
			title: 'Чистый код. Роберт Мартин',
			img: 'img/cleancode.jpg',
			url: 'http://www.ozon.ru/context/detail/id/21916535/'
		},
		{
			title: 'Совершенный код. Стив Макконнелл',
			img: 'img/codecomplete.jpg',
			url: 'http://www.ozon.ru/context/detail/id/3159814/'
		}
	],
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("p", null, 
				"Далеко не все аспекты чистого кода можно раскрыть в такой короткой и простой игре." + ' ' +
				"Больше и подробнее можно узнать из этих замечательных книг:"), 
				React.createElement("div", {className: "books pull-left"}, 
					_(this.books).map(function(b){
						return React.createElement("a", {className: "book", key: b.title, target: "blank", 
								title: b.title, href: b.url}, React.createElement("img", {src: b.img, alt: b.title}))
					}), 
					React.createElement("img", {className: "book", src: "img/cat.png", width: "250", alt: "Чистый кот"})
				), 
				React.createElement("div", {className: "clearfix"})
			)
			);
	}
});

module.exports = BooksView;
},{}],4:[function(require,module,exports){
'use strict';

var _ = require("lodash");
var utils = require("./utils");

var CodeSample = function(data) {
	var me = this;
	this.name = data.name;
	this.code = data.code.replace('\r', '');
	this.bugs = data.bugs;
	this.instruction = data.instruction;
	this.learning = data.learning;
	this.bugsCount = _.keys(this.bugs).length;

	parseCode();

	function parseCode(code) {
		_.each(_.values(me.bugs), function(bug) {
			bug.offsets = []
		});
		_.each(_.keys(me.bugs), function(bugName) {
			me.bugs[bugName].name = bugName
		});
		var resultOffset = 0;
		me.text = me.code
			.replace(/{{([\s\S]*?)}}/gm, function(sub, p, offset, s) {
				var start = offset - resultOffset;
				resultOffset += 4;
				addBugPosition(p, start, p.length);
				return p;
			});
		addBugLinePositions();
	}

	function addBugPosition(token, start, len) {
		var name = token.trim().split(' ', 2)[0];
		var bug = me.bugs[name];
		if (bug == undefined) {
			console.log(me.bugs);
			throw new Error("In code " + data.name +" unknown bug " + name);
		}
		bug.content = token;
		bug.offsets.push({
			startIndex: start,
			len: len
		});
	}

	function addBugLinePositions() {
		var eols = [-1];
		for (var i = 0; i < me.text.length; i++) {
			if (me.text[i] == '\n')
				eols.push(i);
		}
		eols.push(1000000000);
		_.each(_.values(me.bugs), function(bug) {
			bug.offsets.forEach(function(off) {
				off.start = getPos(off.startIndex, eols);
				off.end = getPos(off.startIndex + off.len - 1, eols);
			});
		});
	}

	function getPos(pos, eols) {
		for (var line = 0; line < eols.length; line++)
			if (eols[line] >= pos) {
				return {
					line: line - 1,
					ch: pos - eols[line - 1] - 1
				};
			}
		return null;
	}

	function containPos(offset, line, ch) {
		return (offset.start.line < line || (offset.start.line == line && offset.start.ch <= ch + 1)) && (offset.end.line > line || (offset.end.line == line && offset.end.ch >= ch - 1))

	}

	this.findBug = function(line, ch) { //return Bug
		for (var bugName in me.bugs) {
			var bug = me.bugs[bugName];
			var offsets = bug.offsets.filter(function(off) {
				return containPos(off, line, ch);
			});
			if (offsets.length != 0) return bug;
		}
		return null;
	};

	this.fix = function(bug) { //return CodeSample
		var code2 = this.code.replace(new RegExp("\\{\\{" + utils.escapeRe(bug.content) + "\\}\\}", "gm"), bug.replace);
		var bugs2 = _.cloneDeep(this.bugs);
		delete bugs2[bug.name];
		return new CodeSample({
			name: this.name,
			code: code2,
			bugs: bugs2,
			instruction: this.instruction,
			learning: this.learning
		});
	}
};

module.exports = CodeSample;
},{"./utils":14,"lodash":undefined}],5:[function(require,module,exports){
var settings = require("../settings.json");

var CodeView = React.createClass({displayName: "CodeView",
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
			React.createElement("div", null, 
				React.createElement("textarea", {
					ref: "editor", 
					defaultValue: this.props.code, 
					readOnly: "true"})
			));
	}
});

module.exports = CodeView;
},{"../settings.json":15}],6:[function(require,module,exports){
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

},{"../../data/data.json":2,"./CodeSample":4}],7:[function(require,module,exports){
var BooksView = require("./BooksView");
var tracker = require("./Tracker");

var GameOverView = React.createClass({displayName: "GameOverView",
	mixins: [Backbone.React.Component.mixin],

	componentDidMount: function() {
		tracker.track("fail_on", this.props.levelIndex);
	},

	render: function() {
		return React.createElement("div", null, 
			React.createElement("h2", null, "Вы проиграли!"), 
			React.createElement("p", null, 
				"Это была плохая новость." + ' ' +
				"Хорошая новость — вам есть куда расти!"
			), 
			React.createElement(BooksView, null), 

			React.createElement("p", null, 
				"Впрочем, возможно, вам просто не повезло. Попробуйте ещё раз!"
			), 

			React.createElement("button", {className: "button", onClick: this.handlePlayAgain}, "Ещё раз")
		);
	},

	handlePlayAgain: function(){
		tracker.track("again_after_fail_on", this.props.levelIndex);
		this.getModel().reset();
	},
});

module.exports = GameOverView;
},{"./BooksView":3,"./Tracker":13}],8:[function(require,module,exports){
var CodeSample = require("./CodeSample");
var LevelView = require("./LevelView");
var ResultsView = require("./ResultsView");
var GameOverView = require("./GameOverView");
var tracker = require("./Tracker");

var GameView = React.createClass({displayName: "GameView",
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		var m = this.getModel();
		if (m.get('score') < 0)
			return React.createElement(GameOverView, {model: m});
		else if (m.get('levelIndex') >= m.get('levels').length){
			return React.createElement(ResultsView, {model: m});
		}
		else 
			return React.createElement(LevelView, {key: m.get('levelIndex'), model: m});
	},
});

module.exports = GameView;
},{"./CodeSample":4,"./GameOverView":7,"./LevelView":10,"./ResultsView":12,"./Tracker":13}],9:[function(require,module,exports){
module.exports =  React.createClass({displayName: "exports",
	propTypes: {
		text: React.PropTypes.string.isRequired,
		enabled: React.PropTypes.bool.isRequired,
		onEnter: React.PropTypes.func.isRequired,
		onLeave: React.PropTypes.func.isRequired
	},

	render: function() {
		if (this.props.enabled)
			return React.createElement("span", {className: "tb-item", 
				onMouseEnter: this.props.onEnter, 
				onTouchStart: this.props.onEnter, 
				onMouseLeave: this.props.onLeave, 
				onTouchEnd: this.props.onLeave}, this.props.text)
		else
			return React.createElement("span", {className: "tb-item disabled"}, this.props.text)
	},
});


},{}],10:[function(require,module,exports){
var CodeView = require("./CodeView");
var CodeSample = require("./CodeSample");
var HoverButton = require("./HoverButton");
var MessageButton = require("./MessageButton");

var utils = require("./utils");
var animate = utils.animate;
var tracker = require("./Tracker");

var LevelView = React.createClass({displayName: "LevelView",
	mixins: [Backbone.React.Component.mixin],

	getInitialState: function() {
		var level = this.getModel().get('level');
		return {
			explanations: [],
			availableHints: _.values(level.bugs),
			showOriginal: false,
			solved: false
		};
	},

	finished: function(){
		return this.props.level.bugsCount == 0;
	},

	handleMiss: function (line, ch, word){
		word = word.trim().substring(0, 20);
		var miss = this.props.level.name + "." + word;
		if (!this.trackedMisses[miss]){
			tracker.missed(this.props.level, word);
			this.trackedMisses[miss] = true;
			this.reduceScore();
		}
	},

	handleFix: function(bug){
		var explanations = _.union(this.state.explanations, [bug.description]);
		var newHints = _.filter(this.state.availableHints, function(h) { return h.name != bug.name });
		this.getModel().fixBug(bug);
		this.setState({
			availableHints: newHints,
			explanations: explanations
		});
	},

	reduceScore: function(){
		this.getModel().missClick();
	},

	handleClick: function(line, ch, word, $target){
		if (this.finished()) return;
		var bug = this.props.level.findBug(line, ch);
		if (bug != null){
			this.handleFix(bug);
		}
		else {
			utils.animate$($target, "shake", function(){
				this.handleMiss(line, ch, word);
			}.bind(this));
		}
	},

	componentDidMount: function() {
		this.trackedMisses = {};
		utils.animate(this.refs.round, "fadeInRight");
	},

	handleUseHint: function(){
		tracker.hintUsed(this.props.level, this.state.availableHints[0]);
		this.getModel().useHint();
		this.setState({
			availableHints: this.state.availableHints.slice(1),
		});
	},

	handleNext: function(){
		utils.animate(this.refs.round, "fadeOutLeft");
		$(this.refs.round.getDOMNode()).one('webkitAnimationEnd', function(){
			this.setState({solved: true});
			tracker.levelSolved(this.props.levelIndex);
			this.getModel().finishLevel();
		}.bind(this));		
	},

	renderExplanations: function(){
		if (this.state.explanations.length == 0) return "";
		return React.createElement("div", null, 
			React.createElement("h3", null, "Объяснения:"), 
			React.createElement("ol", null, 
				 this.state.explanations.map(function(d, i){ return React.createElement("li", {key: i}, d) }) 
			)
		)
	},

	renderNextButton: function(){
		if (!this.finished()) return "";
		var classes = "button";
		if (this.props.prevScore < this.props.score) classes += " animated flipInX";
		return React.createElement("button", {ref: "nextButton", key: this.props.levelIndex, 
				className: classes, 
				style: {marginTop: 0}, 
				onClick: this.handleNext}, "Дальше")
	},

	getHint: function(){
		if (this.state.availableHints.length > 0)
			return this.state.availableHints[0].description;
		else
			return undefined;
	},
	renderBugsCount: function(){
		var classes = this.props.prevScore < this.props.score ? "animated bounce" : "";
		var bugsCount = this.props.level.bugsCount;
		return React.createElement("div", {className: "score"}, 
				"Осталось найти: ", React.createElement("span", {key: bugsCount, className: classes}, bugsCount)
			)
	},

	render: function() {
		var code = this.state.showOriginal ? this.props.originalLevel : this.props.level;
		var hasProgress = this.props.level.bugsCount < this.props.originalLevel.bugsCount;
		if (this.state.solved) return null;
		return  (
			React.createElement("div", {className: "round", ref: "round"}, 
			  React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-sm-12"}, 
					React.createElement("h2", null, "Уровень ", this.props.levelIndex+1, this.finished() && ". Пройден!"), 
					
						_.map(
							this.props.level.instruction.split('\n'), 
							function(text, i){return React.createElement("div", {key: "instruction-" + i}, text)}), 
					
					React.createElement("div", {className: "code-container"}, 
						React.createElement("span", {className: "code-toolbar"}, 
							React.createElement(HoverButton, {
								text: "сравнить", 
								enabled: hasProgress, 
								onEnter: this.showOriginalCode, 
								onLeave: this.showCurrentCode}), 
							React.createElement(MessageButton, {
								title: "подсказка", disabledTitle: "нет подсказок", 
								enabled: this.getHint()!==undefined, 
								message: this.getHint(), 
								onClick: this.handleUseHint})
						), 
						React.createElement(CodeView, {code: code.text, onClick: this.handleClick})
					)
				)
			  ), 
			  React.createElement("div", null, 
				this.renderNextButton()
				), 
			  React.createElement("div", {className: "row"}, 
			  	React.createElement("div", {className: "col-sm-4"}, 
					React.createElement("div", {ref: "scoreDiv", className: "score"}, 
						React.createElement("div", {className: "pull-left"}, 
							"Общий счёт:" 
						), 
						React.createElement("div", {className: "pull-left score-value", ref: "score"}, this.props.score), 
						 this.props.prevScore > this.props.score
							? React.createElement("div", {key: this.props.score, className: "pull-left minus-one animated fadeOutDown"}, " —", this.props.prevScore - this.props.score)
							: null, 
						React.createElement("div", {className: "clearfix"})
					)
			  	), 
			  	React.createElement("div", {className: "col-sm-5"}, 
					this.renderBugsCount()
			  	)
			  	), 
			  	React.createElement("div", {className: "row"}, 
				  	React.createElement("div", {className: "col-sm-12"}, 
						this.renderExplanations()
				  	)
			  	)
			)
			);
	},

	showOriginalCode: function() {
		this.setState({ showOriginal: true });
	},

	showCurrentCode: function() {
		this.setState({ showOriginal: false });
	},
});

module.exports=LevelView;
},{"./CodeSample":4,"./CodeView":5,"./HoverButton":9,"./MessageButton":11,"./Tracker":13,"./utils":14}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
var BooksView = require("./BooksView");
var tracker = require("./Tracker");

function removeHash () { 
	history.pushState("", document.title, window.location.pathname + window.location.search);
}

var ResultsView = React.createClass({displayName: "ResultsView",
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
			React.createElement("div", null, 
				React.createElement("h2", null, headerPhrase), 
				this.renderScoreInfo(), 
				
				React.createElement(BooksView, null), 
				this.renderAgainButton()
			));
	},

	renderScoreInfo: function(){
		return (
			React.createElement("p", null, "Ты прошел Clean Code Game с результатом ", this.getScorePercentage(), "%! (", this.props.score, " из ", this.props.maxScore, " возможных).")
			);
	},

	renderAgainButton: function(){
		return React.createElement("p", null, React.createElement("a", {className: "button", href: "#", onClick: this.handlePlayAgain}, "Ещё разик?"))
	},

	renderAuthView: function() {
		return (
			React.createElement("div", {className: "registrationContainer"}, 
				React.createElement("form", {className: "form", onSubmit: this.handleSubmitRegForm}, 
					React.createElement("input", {
						value: this.state.userName, 
						onChange: evt => this.setState({userName: evt.target.value}), 
						className: "block", 
						type: "text", 
						id: "name", 
						name: "name", 
						placeholder: "Имя и фамилия", 
						autofocus: true, 
						autoComplete: "off"}
					), 
					React.createElement("input", {
						value: this.state.email, 
						onChange: evt => this.setState({email: evt.target.value}), 
						className: "block", 
						type: "email", 
						id: "email", 
						name: "email", 
						placeholder: "Email", 
						autoComplete: "off"}), 
					React.createElement("button", {className: "button", type: "submit"}, 
						"Посмотреть результат"
					)
				)
			)
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

},{"./BooksView":3,"./Tracker":13}],13:[function(require,module,exports){
module.exports = {
	levelSolved: function(levelIndex){
		var category = 'level-solved';
		this.track(category, levelIndex);
	},

	hintUsed: function(level, hint){
		var category = "hint." + level.name;
		var hint = hint.description.substring(0, 20);
		this.track(category, hint);
	},

	finished: function(score){
		this.track('result', score);
	},

	missed: function(level, miss){
		this.track("miss." + level.name, miss);
	},
	
	track: function(event, value){
		if (value == undefined){
			console.log(['track: ', event]);
		}
		else{
			var ev = event + "." + value;
			console.log(['track: ', ev]);
		}
	}
};
},{}],14:[function(require,module,exports){
'use strict';

module.exports.animate = function(comp, effect){
	if (!comp) return;
	var $el = $(comp.getDOMNode());
	$el.addClass("animated-fast " + effect);
	$el.one(
		'webkitAnimationEnd', 
		function(){$el.removeClass("animated " + effect)}
		);
};

module.exports.animate$ = function($el, effect, callback){
	$el.addClass("animated-fast " + effect);
	$el.one(
		'webkitAnimationEnd', 
		function(){
			$el.removeClass("animated " + effect);
			callback();
		}
	);
};

module.exports.initUpToLike = function(){
	$("#uptolikescript").remove();
	var s = document.createElement('script');
	s.id="uptolikescript";
	s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
	s.src = ('https:' == window.location.protocol ? 'https' : 'http')  + '://w.uptolike.com/widgets/v1/uptolike.js';
	document.getElementsByTagName('body')[0].appendChild(s);
};

module.exports.escapeRe = function(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};


},{}],15:[function(require,module,exports){
module.exports={
    "description": "Все хотят иметь дело только\nс понятным чистым кодом.\nНо не все могут его создавать.",
    "codeMirrorMode": "text/javascript"
}
},{}]},{},[1]);

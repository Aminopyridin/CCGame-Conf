(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GameModel = require("./GameModel");
var GameView = require("./GameView");
var tracker = require("./Tracker");
var settings = require("../settings.json");

var ProgressBar = require("./ProgressBar");

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
			  	this.renderBody(), 
				this.renderFooter()
			  )
			  );
	},


	renderHeader: function(){
		var classes = "header-text" + (this.state.started ? '' : ' tall');
		return React.createElement("div", {className: "header"}, 
		    React.createElement("div", {className: "container header"}, 
		      React.createElement("div", {className: classes}, 
			      React.createElement("h1", {className: "pointer", onClick: this.handleHome}, "The Clean Code Game"), 
			      React.createElement("h2", null, settings.version)
		      )
		    ), 
		    this.state.started && React.createElement(ProgressBar, {model: this.getModel()})
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
		      React.createElement("p", null, React.createElement("button", {className: "btn btn-lg btn-primary btn-styled", onClick: this.handleClick}, "Начать игру"))
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

	renderFooter: function(){
		return React.createElement("div", {className: "footer"}, 
			    React.createElement("div", {className: "container"}, 
			      React.createElement("p", {className: "text-muted"}, 
			        "© 2019 ", React.createElement("a", {href: "https://kontur.ru/career", onClick: this.handleKonturClick}, "СКБ Контур")
			      )
			    )
			  );
	}
});

React.render(React.createElement(AppView, {model: new GameModel()}), document.getElementById("app"));
},{"../settings.json":16,"./GameModel":6,"./GameView":8,"./ProgressBar":12,"./Tracker":14}],2:[function(require,module,exports){
module.exports=[
  {
    "name": "hello",
    "instruction": "Найди и исправь все стилевые ошибки в коде. Кликай мышкой по ошибкам.\nКаждая найденная ошибка: +1 балл.",
    "learning": true,
    "code": "void Main()\n{\n\tConsole.WriteLine(\"Enter your name: \");\n\tvar {{veryBadVariableName_clickIt}} = Console.ReadLine();\n\tConsole.WriteLine(\"Hello, \" + {{veryBadVariableName_clickIt}});\n}",
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
    "code": "List<Position> {{GetThem}}(List<Cell> {{theBigList}})\n{\n\tvar {{list1}} = new List<Position>();\n\tforeach (var cell in {{theBigList}})\n\t{\n\t\tif (cell.IsEmpty) \n\t\t\t{{list1}}.Add(cell.Position);\n\t}\n\treturn {{list1}};\n}",
    "bugs": {
      "GetThem": {
        "type": "naming",
        "replace": "GetEmptyPositions",
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
    "code": "double GetViewsPerSecond(IEnumerable<PageView> views, DateTime {{t}})\n{\n\tvar {{n}} = {{86400}};\n\tvar viewsCount = views.Count(v => v.Timestamp.Date == {{t}});\n\treturn (double)viewsCount / {{n}};\n}",
    "bugs": {
      "86400": {
        "type": "other",
        "replace": "24 * 60 * 60",
        "description": "Иногда, арифметические выражения понятнее, чем значение этого выражения.\nЗапись 24 * 60 * 60 проще проверить на корректность, чем 86400."
      },
      "t": {
        "type": "naming",
        "replace": "date",
        "description": "В именах стоит отражать существенные особенности. \nНапример, если переменная типа DateTime хранит только дату, можно назвать ее date."
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
    "instruction": "Осторожнее — начиная с этого уровня, за каждый неверный клик и каждую подсказку вы будете терять один балл!",
    "code": "var {{rstr}} = Console.ReadLine();\nvar {{flag}} = false;\nfor(var charIndex = 0; charIndex < {{rstr}}.Length; charIndex++)\n{\n\tif ({{flag}} || {{rstr}}[charIndex] != '\\\\')\n\t\tConsole.Write({{rstr}}[charIndex]);\n\t{{flag}} = {{rstr}}[charIndex] == '\\\\';\n}",
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
    "code": "List<string> GetBigrams(IList<string> words)\n{\n\tvar {{colBigrams}} = words.Count - 1;\n\tvar {{bigrams_list}} = new string[{{colBigrams}}];\n\tfor (var {{I}} = 0; {{I}} < {{colBigrams}}; {{I}}++)\n\t\t{{bigrams_list}}[{{I}}] = words[{{I}}] + \" \" + words[{{I}} + 1];\n\treturn {{bigrams_list}}.Distinct().ToList();\n}",
    "bugs": {
      "I": {
        "replace": "i",
        "type": "naming",
        "description": "В C# имена локальных переменных принято начинать с маленькой буквы.\nНарушение таких, казалось бы, несущественных правил часто сильно раздражает опытных программистов."
      },
      "colBigrams": {
        "replace": "bigramsCount",
        "type": "naming",
        "description": "Не используйте русские слова в именах (если только вы не программируете на 1C).\nЧитая код, программисты ожидают видеть английские имена, \nпоэтому написанные транслитом русские слова могут быть восприняты неправильно.\nНапример, в данном случае col (количество) легко спутать с сокращением от слова column."
      },
      "bigrams_list": {
        "type": "naming",
        "replace": "bigrams",
        "description": "В C# для составных имен принято использовать стиль CamelCase, и не использовать snake_case."
      }
    }
  },
  {
    "name": "arg",
    "instruction": "В имени нужно отражать полезный для понимания смысл и стараться избегать слов заместителей с неопределенным смыслом.",
    "code": "static void Main(string[] args)\n{\n\tvar {{arg}} = args.Length > 0 ? args[0] : defaultFilename;\n\tDateTime lastWriteTime = new FileInfo({{arg}}).LastWriteTime;\n\tbool {{check}} = lastWriteTime > DateTime.Now - TimeSpan.FromSeconds(1);\n\t{{Handle}}({{arg}}, {{check}});\n\tConsole.WriteLine(lastWriteTime);\n}",
    "bugs": {
      "arg": {
        "replace": "inputFile",
        "type": "naming",
        "description": "Отражайте в имени то, что важно при дальнейшем использовании.\nВ данном случае то, что это имя входного файла важнее того, что оно получено из аргументов командной строки."
      },
      "check": {
        "replace": "recentlyModified",
        "type": "naming",
        "description": "Имя 'check' почти всегда можно улучшить. Сообщите в имени, что именно проверяется."
      },
      "Handle": {
        "type": "methods",
        "replace": "ConvertFileToJson",
        "description": "Handle — слово заместитель, не добавляющее смысла. В чем именно заключается \"обработка\"? Отразите это в имени вместо слова Handle."
      }
    }
  },
  {
    "name": "manager",
    "instruction": "Продолжаем охоту на слова без смысла.",
    "code": "public interface {{IPriceManager}}\n{\n\tJson JsonFromXml(XmlDocument prices);\n\tXmlDocument XmlFromJson(Json prices);\n}",
    "bugs": {
      "IPriceManager": {
        "type": "naming",
        "replace": "IPriceFormatConverter",
        "description": "Manager — слово заместитель, не добавляющее смысла. Часто его можно заменить на что-то более осмысленное.\nНапример, менеджер по продажам может стать продавцом консультантом."
      }
    }
  },
  {
    "name": "CopyChars",
    "instruction": "Проблемы с именами в этом коде очевидны. Но тут есть кое-что еще!",
    "code": "void CopyChars(char[] {{array1}}, char[] {{array2}})\n{\n\t{{//copy arrays item by item.\n\t}}for(var i = 0; i < {{array1}}.Length; i++)\n\t\t{{array2}}[i] = {{array1}}[i];\n}",
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
    "name": "English",
    "instruction": "В составных именах очень легко случайно продемонстрировать незнание английского :-)",
    "code": "private string {{directoryInput}};\n\nprivate string outputDirectory;\n\npublic enum {{QualityRender}} \n{\n\tHigh,\n\tMedium,\n\tLow\n}\n",
    "bugs": {
      "QualityRender": {
        "type": "naming",
        "replace": "RenderQuality",
        "description": "Нарушение правильного порядка слов в составных именах — частая ошибка программистов \nсо слабым знанием английского.\nКачество рендера — это QualityOfRender или просто RenderQuality."
      },
      "directoryInput": {
        "type": "naming",
        "replace": "inputDirectory",
        "description": "directoryInput с английского — это ввод директории. Входная директория — это inputDirectory."
      }
    }
  },
  {
    "name": "ShareIfYouLike",
    "instruction": "Автору будет приятно, если вы поделитесь ссылкой на эту игру с коллегами.\nЗаранее спасибо! :-)",
    "code": "if (you.Like(this.Game))\n{\n\tyou.Tweet();\n\tyou.Post();\n\tyou.Share();\n}\nelse\n{\n\tyou.{{H4Te_AUth0R()}};\n}\n",
    "bugs": {
      "H4Te_AUth0R()": {
        "type": "naming",
        "replace": "EmailAuthor(\"pe@kontur.ru\")",
        "description": "Ненависть — плохое чувство! :-)"
      }
    }
  },
  {
    "name": "Chessboard",
    "instruction": "Время закрепить все полученные на предыдущих уровнях знания!",
    "code": "enum {{ColorCell}}\n{ \n\tBlack, \n\tWhite\n}\n\nclass Chessboard \n{\n\tprivate {{ColorCell}}[,] {{array}};\n\tprivate int {{m_brdSz}};\n\n\tpublic Chessboard(int {{n}}) \n\t{\n\t\tthis.{{m_brdSz}} = {{n}};\n\t\tthis.{{array}} = new {{ColorCell}}[{{m_brdSz}},{{m_brdSz}}];\n\t\t{{//Fill board with black and white colors}}\n\t\tfor(var {{a}} = 0; {{a}} < {{m_brdSz}}; {{a}}++)\n\t\t\tfor(var {{b}} = 0; {{b}} < {{m_brdSz}}; {{b}}++) \n\t\t\t{\n\t\t\t\tbool isBlack = ({{a}} + {{b}}) % 2 == 0;\n\t\t\t\t{{array}}[{{a}}, {{b}}] = isBlack ? {{ColorCell}}.Black : {{ColorCell}}.White;\n\t\t\t}\n\t}\n}\n",
    "bugs": {
      "//Fill": {
        "type": "comments",
        "replace": "",
        "description": "Комментарии повторяющие код не имеют смысла."
      },
      "ColorCell": {
        "type": "naming",
        "replace": "CellColor",
        "description": "Нарушение правильного для английского языка порядка слов в составных именах — частая ошибка программистов \nсо слабым знанием английского.\nColorCell — это цветная клетка, а цвет клетки — CellColor.\nНе путайте — не вводите в замешательство читающих."
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
    "name": "Initialization",
    "instruction": "Переменные и классы — это сущности, а методы — действия. Имейте это в виду!",
    "code": "public void {{Initialization}}(int boardSize)\n{\n\tLog(\"Board initialization...\");\n\tthis.piecesCount = 0;\n\tthis.board = {{Board}}(boardSize, boardSize);\n\tLog(\"Board initialization finished\");\n}",
    "bugs": {
      "Initialization": {
        "type": "methods",
        "replace": "InitializeBoard",
        "description": "Методы — это действия, называйте их глаголами или глагольными фразами."
      },
      "Board": {
        "type": "methods",
        "replace": "CreateBoard",
        "description": "Методы — это действия, называйте их глаголами или глагольными фразами."
      }
    }
  },
  {
    "name": "GetSet",
    "instruction": "Имена должны выполнять обещания и не вводить читателя в замешательство.",
    "code": "void {{GetFactory}}()\n{\n\tvar user = Environment.UserName;\n\tthis.factory = {{FactoryCreator}}(user);\n}\n\nTimeSpan GetTimeout()\n{\n\treturn this.timeout;\n}\n\nvoid {{SetTimeout}}()\n{\n\tvar sectionName = systemName + \"/timeout\";\n\tthis.timeout = ReadSettings(sectionName).Timeout;\n}",
    "bugs": {
      "GetFactory": {
        "type": "methods",
        "replace": "InitFactory",
        "description": "Методы GetXXX, CreateXXX, ReadXXX должны возвращать результат.\nvoid-методы, инициализирующие поля класса лучше так не называть."
      },
      "FactoryCreator": {
        "type": "methods",
        "replace": "CreateFactory",
        "description": "Методы — это действия, называйте их глаголами или глагольными фразами."
      },
      "SetTimeout": {
        "type": "methods",
        "replace": "InitTimeoutFromSettings",
        "description": "Методы SetXXX должны принимать устанавливаемое значение в качестве аргумента. \nМетоды без аргументов лучше так не называть."
      }
    }
  },
  {
    "name": "SplitMethod",
    "instruction": "Имена переменных и методов тут в порядке. Но не только это делает код хорошим!",
    "code": "void Main(string[] args)\n{\n\tstring[] inputLines = File.ReadAllLines(args[0]);\n\tstring outputPath = args[1];\n\tif (Directory.Exists(outputPath))\n\t\toutputPath = Path.Combine(outputPath, Path.GetFileName(args[0]));\n\t{{\n\t//Convert file}}\n\tvar escapedLines = inputLines.Select(s => s.Replace(@\"\", @\"\\\"));\n\tvar outputText = string.Join(\"\\n\", escapedLines);\n\tFile.WriteAllText(outputPath, outputText);\n\tConsole.WriteLine(\"{0} characters\", outputText.Length);\n}",
    "bugs": {
      "//Convert": {
        "type": "methods",
        "replace": "ConvertFile(inputLines, outputPath);\n}\n\nvoid ConvertFile(IEnumerable<string> inputLines, string outputPath)\n{",
        "description": "Вместо комментария, разделяющего код на две фазы, стоит сделать настоящее разделение кода на методы.\nКаждый метод должен делать ровно одну вещь. Если вы можете естественным образом разбить один метод на два — сделайте это!\n"
      }
    }
  },
  {
    "name": "CommentExplainCode",
    "instruction": "Крохотные методы в одну-две строки часто могут значительно повысить читаемость кода.",
    "code": "{{//If employee deserves full benefits}}\nif ({{employee.IsHourly() && employee.Age > 65 || employee.HasSpecialReward}}))\n\tPay(employee, fullBenefitsAmount); {{//Pay largeAmount}}\nelse\n\tPay(employee, reducedAmount);",
    "bugs": {
      "//Pay": {
        "type": "comments",
        "replace": "",
        "description": "Комментарии повторяющие код не нужны. Они легко могут устареть!"
      },
      "employee.IsHourly()": {
        "type": "methods",
        "replace": "employee.DeservesFullBenefits()",
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
    "code": "void Main(string[] args)\n{\n\ttry\n\t{\n\t\tvar linesCount = 0;\n\t\tvar charsCount = 0;\n\t\tvar lines = File.ReadAllLines(args[0]);\n\t\tforeach(var line in lines)\n\t\t{\n\t\t\tlinesCount++;\n\t\t\tcharsCount += line.Length;\n\t\t} {{//foreach}}\n\t\tConsole.WriteLine(\"linesCount = \" + linesCount);\n\t\tConsole.WriteLine(\"charsCount = \" + charsCount);\n\t} {{//try}}\n\tcatch (Exception e)\n\t{\n\t\tConsole.WriteLine(\"Error: \" + e.Message);\n\t} {{//catch}}\n}",
    "bugs": {
      "//foreach": {
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
    "name": "nameInsteadOfComment",
    "instruction": "Но не спешите удалять все комментарии из вашего кода. Бывают и полезные!",
    "code": "//format matched: hh:mm:ss, MMM dd, yyyy\nprivate Regex timeRegex = new Regex(@\"\\d*:\\d*:\\d*, \\w* \\d*, \\d*\");\n\nResponder {{GetResponder(); //Returns the Responder being tested.}}",
    "bugs": {
      "GetResponder();": {
        "type": "naming",
        "replace": "GetTestResponder();",
        "description": "Если появляется желание написать поясняющий комментарий к методу, стоит вместо этого постараться придумать более удачное имя методу."
      }
    }
  },
  {
    "name": "ExplainCompare",
    "instruction": "Хорошие комментарии должны объяснять намерения программиста в тех случаях, когда их сложно выразить непосредственно кодом.",
    "code": "{{//comparison of this and other object}}\npublic int CompareTo(object o)\n{\n\tvar other = o as WikiPagePath;\n\tif(other != null)\n\t{\n\t\t{{//compares concatenated names of this and others}}\n\t\tstring thisNames = string.Join(\"\", this.Names);\n\t\tstring otherNames = string.Join(\"\", other.Names);\n\t\treturn thisNames.CompareTo(otherNames);\n\t}\n\treturn 1; // WikiPagePath should be greater than any other wrong type.\n} {{//end of CompareTo}}",
    "bugs": {
      "//compares": {
        "type": "comments",
        "replace": "",
        "description": "Комментарии дословно повторяющие код бессмысленны."
      },
      "//comparison": {
        "type": "comments",
        "replace": "",
        "description": "Бессмысленно писать в комментарии то, что итак понятно из названия метода."
      },
      "//end": {
        "type": "comments",
        "replace": "",
        "description": "Комментарии вида 'конец цикла', 'конец функции' и подобные бессмысленны. \nДля коротких функций они не нужны, а длинные функции лучше разбить на несколько более коротких, вместо написания таких комментариев."
      }
    }
  },
  {
    "name": "XMLDoc",
    "instruction": "А что вы думаете о спец-комментариях — XML-документации и комментариях с историей изменений файла?",
    "code": "{{/*Changes (from 11-Oct-2011)\n* --------------------------\n* 12-Sep-2011 : Fix bug\n* 11-Oct-2011 : Move implementation to another file\n* 05-Nov-2011 : Add XML comments \n*/\n}}namespace Logger\n{\n\t///<summary>Implement Logger to provide customized event filtering</summary>\n\t///<remarks>\n\t///<para>\n\t///Users should implement this interface to implement customized logging\n\t///event filtering. Note that <see cref=\"Logger.Repository.Hierarchy.Logger\"/>\n\t///and <see cref=\"Logger.Appender.AppenderSkeleton\"/>, the parent class of all\n\t///standard appenders, have built-in filtering rules. It is suggested that you\n\t///first use and understand the built-in rules before rushing to write\n\t///your own custom filters.\n\t///</para>\n\t///</remarks>\n\tpublic interface IFilter : IOptionHandler\n\t{\n\t\t{{///<summary>Make a decision about logging event.</summary>\n\t\t///<param name=\"loggingEvent\">The LoggingEvent to decide upon</param>\n\t\t///<returns>The decision of the filter</returns>}}\n\t\tFilterDecision Decide(LoggingEvent loggingEvent);\n\n\t\t{{///<summary>Property to get and set the next filter</summary>\n\t\t///<value>The next filter in chain</value>\n\t\t}}IFilter NextInChain { get; set; }\n\t}\n}",
    "bugs": {
      "///<summary>Make": {
        "type": "comments",
        "replace": "",
        "description": "XML-комментарии не несущие новой информации бесполезны."
      },
      "///<summary>Property": {
        "type": "comments",
        "replace": "",
        "description": "Не пишите XML-комментарий только для того, чтобы он был. В наличии комментария должен быть какой-то смысл."
      },
      "/*Changes": {
        "type": "comments",
        "replace": "",
        "description": "Когда-то очень давно был смысл писать комментарии с историей изменения файла.\nНо сейчас вместо таких комментариев лучше использовать систему контроля версий и писать понятные сообщения к коммитам."
      }
    }
  },
  {
    "name": "collision",
    "instruction": "Время закрепить освоенные знания!",
    "code": "{{///<summary>Обрабатывает столкновение героя с врагом</summary>}}\nvoid {{CollisionHandler}}(GameObject hero, GameObject enemy)\n{\n\t{{//If hero and enemy collided\n\tif ((hero.X-enemy.X)*(hero.X-enemy.X) + (hero.Y-enemy.Y)*(hero.Y-enemy.Y) \n\t\t< (hero.Radius + enemy.Radius)*(hero.Radius + enemy.Radius))}}\n\t{\n\t\thero.Life--;\n\t\tif (!hero.IsAlive && OnHeroDeath != null) {{//нужно оповестить подписчиков}}\n\t\t\tOnHeroDeath(hero);\n\t}\n}",
    "bugs": {
      "///<summary>Обрабатывает": {
        "type": "comments",
        "replace": "",
        "description": "XML-комментарии бессмысленны, если не несут новую информацию."
      },
      "CollisionHandler": {
        "type": "methods",
        "replace": "HandleCollision",
        "description": "Методы — это действия, называйте их глаголами или глагольными фразами."
      },
      "//If": {
        "type": "comments",
        "replace": "if (Collided(hero, enemy))",
        "description": "Не используйте комментарии там, где можно выделить метод с говорящим именем."
      },
      "//нужно": {
        "type": "comments",
        "replace": "",
        "description": "Комментарии дословно повторяющие код бессмысленны."
      }
    }
  },
  {
    "name": "LoadMap",
    "instruction": "Последний уровень! По законам жанра тут должно быть много кода!",
    "code": "///<param name=\"path\">\n/// Path to file or directory with map description. \n/// If path is a path to directory, file default.map is used.\n///</param>\nGameMap LoadMap(string path)\n{\n\tvar {{Filename}} = Directory.Exists(path) \n\t\t? Path.Combine(path, \"default.map\") \n\t\t: path;\n\tvar lines = File.ReadAllLines({{Filename}});\n\tvar height = lines.Length;\n\tvar width = lines[0].Length;\n\t{{//Initialize map}}\n\tvar map = new GameMap(width, height{{) \n\t\t\t\t{\n\t\t\t\t\tScore = 0,\n\t\t\t\t\tHeroLifesCount = 3,\n\t\t\t\t\tTime = 0,\n\t\t\t\t}; }}\n\tfor(var y=0; y<height; y++)\n\t\tfor(var x=0; x<{{lines[0].Length}}; x++)\n\t\t{\n\t\t\t{{//============Select object to put in (x, y) cell;\n\t\t\tGameObject obj = null;\n\t\t\tswitch (lines[y][x])\n\t\t\t{\n\t\t\t\tcase 'H': \n\t\t\t\t\tobj = new Hero();\n\t\t\t\t\tbreak;\n\t\t\t\tcase '#':\n\t\t\t\t\tobj = new Wall();\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'M':\n\t\t\t\t\tobj = new Monster();\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\t//============Put created object on map}}\n\t\t\tmap.Put(x, y, obj);\n\t\t}\n\treturn map;\n}",
    "bugs": {
      "Filename": {
        "type": "naming",
        "replace": "filename",
        "description": "В C# локальные переменные принято называть с маленькой буквы."
      },
      "lines[0].Length": {
        "type": "other",
        "replace": "width",
        "description": "Устраняйте дублирование. Это делает код  понятнее и надежнее."
      },
      "//Initialize": {
        "type": "comments",
        "replace": "",
        "description": "При виде комментария, разделяющего метод на смысловые части, стоит вынести эти смысловые части в отдельные методы."
      },
      ")": {
        "type": "methods",
        "replace": ");",
        "description": "Логику инициализации полей карты лучше переместить в конструктор класса карты."
      },
      "//============Select": {
        "type": "methods",
        "replace": "var obj = CreateGameObjectFromChar(lines[y][x]);",
        "description": "Разделительные комментарии вроде такого часто показывают, что программист поленился выделить вспомогательный метод."
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
},{"./utils":15,"lodash":undefined}],5:[function(require,module,exports){
var CodeView = React.createClass({displayName: "CodeView",
	propTypes: {
		code: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func.isRequired
	},

	getDefaultProps: function() {
		return {
			lineNumbers: false,
			mode: "text/x-csharp",
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
},{}],6:[function(require,module,exports){
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

		var score = this.get('score');
		var nextScore = score + (additionalScore >= 1 ? additionalScore : 1);

		console.log(score, nextScore, additionalScore);

		this.set({
			prevScore: score,
			score: nextScore,
			level: fixedCode,
			bugTime: Date.now(),
		});
	},

	useHint: function(){
		if (~~this.get('level').learning) return;
		this.decreaseScore(this.get('score'));
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

			React.createElement("button", {className: "btn btn-lg btn-primary btn-styled", onClick: this.handlePlayAgain}, "Ещё раз")
		);
	},

	handlePlayAgain: function(){
		tracker.track("again_after_fail_on", this.props.levelIndex);
		this.getModel().reset();
	},
});

module.exports = GameOverView;
},{"./BooksView":3,"./Tracker":14}],8:[function(require,module,exports){
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
},{"./CodeSample":4,"./GameOverView":7,"./LevelView":10,"./ResultsView":13,"./Tracker":14}],9:[function(require,module,exports){
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
		$(this.refs.round.getDOMNode()).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
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
		var classes = "btn btn-lg btn-primary btn-styled btn-next";
		if (this.props.prevScore < this.props.score) classes += " animated flipInX";
		return React.createElement("button", {ref: "nextButton", key: this.props.levelIndex, 
				className: classes, 
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
							? React.createElement("div", {key: this.props.score, className: "pull-left minus-one animated fadeOutDown"}, " —1")
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
},{"./CodeSample":4,"./CodeView":5,"./HoverButton":9,"./MessageButton":11,"./Tracker":14,"./utils":15}],11:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
				
				React.createElement("p", null, React.createElement(BooksView, null)), 
				this.renderAgainButton()
			));
	},

	renderScoreInfo: function(){
		return (
			React.createElement("p", null, "Ты прошел Clean Code Game с результатом ", this.getScorePercentage(), "%! (", this.props.score, " из ", this.props.maxScore, " возможных).")
			);
	},

	renderAgainButton: function(){
		return React.createElement("p", null, React.createElement("a", {className: "btn btn-lg btn-primary btn-styled", href: "#", onClick: this.handlePlayAgain}, "Ещё разик?"))
	},

	renderAuthView: function() {
		return (
			React.createElement("form", {onSubmit: this.handleSubmitRegForm}, 
				React.createElement("h3", null, "Как тебя зовут?"), 
				React.createElement("label", {style: {display: 'block', fontWeight: 'normal'}}, 
					React.createElement("span", {style: {display: 'inline-block', width: 170,}}, "Имя, фамилия"), 
					React.createElement("input", {
						value: this.state.userName, 
						onChange: (evt) => this.setState({userName: evt.target.value}), 
						required: true, 
						placeholder: "Имя"})
				), 
				React.createElement("label", {style: {display: 'block', fontWeight: 'normal'}}, 
					React.createElement("span", {style: {display: 'inline-block', width: 170}}, "email"), 
					React.createElement("input", {
						value: this.state.email, 
						onChange: (evt) => this.setState({email: evt.target.value}), 
						required: true, 
						type: "email", 
						placeholder: "email"})
				), 
				React.createElement("button", {type: "submit", className: "btn btn-lg btn-primary btn-styled", style: {width: 400}}, 
					"Посмотреть результаты"
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
		console.log('submit!', this.state);
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

},{"./BooksView":3,"./Tracker":14}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
'use strict';

module.exports.animate = function(comp, effect){
	if (!comp) return;
	var $el = $(comp.getDOMNode());
	$el.addClass("animated-fast " + effect);
	$el.one(
		'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
		function(){$el.removeClass("animated " + effect)}
		);
};

module.exports.animate$ = function($el, effect, callback){
	$el.addClass("animated-fast " + effect);
	$el.one(
		'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
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


},{}],16:[function(require,module,exports){
module.exports={
    "version": "Версия C#",
    "description": "Все хотят иметь дело только\nс понятным чистым кодом.\nНо не все могут его создавать."
}
},{}]},{},[1]);

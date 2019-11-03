"use strict";

(function (window, undefined) {
  var document = window.document;
  var docElement = document.documentElement;
  var speechRecognition = window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition || window.SpeechRecognition;
  var speechGrammarList = window.webkitSpeechGrammarList || window.mozSpeechGrammarList || window.msSpeechGrammarList || window.oSpeechGrammarList || window.SpeechGrammarList;

  function addClass(className) {
    docElement.className = "".concat(docElement.className, " ").concat(className);
  }

  var colours = ['maroon', 'darkred', 'brown', 'firebrick', 'rosybrown', 'indianred', 'lightcoral', 'red', 'snow', 'mistyrose', 'salmon', 'tomato', 'darksalmon', 'coral', 'orangered', 'lightsalmon', 'sienna', 'seashell', 'saddlebrown', 'chocolate', 'sandybrown', 'peachpuff', 'peru', 'linen', 'bisque', 'darkorange', 'burlywood', 'tan', 'antiquewhite', 'navajowhite', 'blanchedalmond', 'papayawhip', 'moccasin', 'orange', 'wheat', 'oldlace', 'floralwhite', 'darkgoldenrod', 'goldenrod', 'cornsilk', 'gold', 'khaki', 'lemonchiffon', 'palegoldenrod', 'darkkhaki', 'olive', 'beige', 'lightgoldenrodyellow', 'yellow', 'lightyellow', 'ivory', 'olivedrab', 'yellowgreen', 'darkolivegreen', 'greenyellow', 'chartreuse', 'lawngreen', 'darkseagreen', 'darkgreen', 'green', 'lime', 'forestgreen', 'limegreen', 'lightgreen', 'palegreen', 'honeydew', 'seagreen', 'mediumseagreen', 'springgreen', 'mintcream', 'mediumspringgreen', 'mediumaquamarine', 'aquamarine', 'turquoise', 'lightseagreen', 'mediumturquoise', 'teal', 'darkcyan', 'aqua', 'cyan', 'darkslategray', 'darkslategrey', 'paleturquoise', 'lightcyan', 'azure', 'darkturquoise', 'cadetblue', 'powderblue', 'lightblue', 'deepskyblue', 'skyblue', 'lightskyblue', 'steelblue', 'aliceblue', 'dodgerblue', 'slategray', 'slategrey', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'cornflowerblue', 'royalblue', 'navy', 'darkblue', 'mediumblue', 'blue', 'midnightblue', 'lavender', 'ghostwhite', 'slateblue', 'darkslateblue', 'mediumslateblue', 'mediumpurple', 'rebeccapurple', 'blueviolet', 'indigo', 'darkorchid', 'darkviolet', 'mediumorchid', 'purple', 'darkmagenta', 'thistle', 'plum', 'violet', 'fuchsia', 'magenta', 'orchid', 'mediumvioletred', 'deeppink', 'hotpink', 'lavenderblush', 'palevioletred', 'crimson', 'pink', 'lightpink', 'black', 'dimgray', 'dimgrey', 'gray', 'grey', 'darkgray', 'darkgrey', 'silver', 'lightgray', 'lightgrey', 'gainsboro', 'whitesmoke', 'white'];
  var grammar = '#JSGF V1.0; grammar colours; public <colour> = ' + colours.join(' | ') + ' ;';

  function detectSpeech() {
    var recognition = new speechRecognition();
    var speechRecognitionList = new speechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList; //recognition.continuous = false;

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    var micBtn = document.getElementById('activateMic');
    var consoleLog = document.getElementById('consoleLog');
    var docBody = document.body;
    micBtn.addEventListener('click', function () {
      recognition.start();
      consoleLog.innerHTML = 'Ready to receive a colour command.';
    }, false);

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var colour = event.results[last][0].transcript;
      var sanitiseColour = colour.replace(/\s/g, '');
      consoleLog.innerHTML = 'You probably said: ' + sanitiseColour + '.\nConfidence: ' + event.results[0][0].confidence;
      docBody.style.setProperty('--bg-colour', sanitiseColour);
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onnomatch = function (event) {
      consoleLog.innerHTML = 'Sorry, could not tell what you said.';
    };

    recognition.onerror = function (event) {
      consoleLog.innerHTML = 'Recognition error: ' + event.error;
    };
  }

  docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1js$2');

  if (speechRecognition !== undefined) {
    addClass('speech');
    detectSpeech();
  } else {
    addClass('no-speech');
  }
})(window);
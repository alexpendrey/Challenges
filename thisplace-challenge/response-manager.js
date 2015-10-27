var ResponseManager = function() {
    var mathsSymbols = [
        {
            "match": 'plus',
            "replace": '+'
        },
        {
            "match": 'minus',
            "replace": '-'
        },
        {
            "match": 'times',
            "replace": '*'
        }
    ];

    var tests = [
        {
            "regex": /POST request to (.*?), use/,
            "urlregex": /POST request to (.*?), use/,
            "postvarregex": /`(.*?)`/,
            "method": 'post',
            "type": 'post',
            "postval": 'alex'
        },
        {
            "regex": /GET request to\n(.*?)$/,
            "urlregex": /GET request to\n(.*?)$/,
            "postvarregex": /`(.*?)`/,
            "method": 'get',
            "type": 'get'
        },
        {
            "regex": /Word question/,
            "urlregex": /POST to (.*?)\n/,
            "postvarregex": /`(.*?)`/,
            "method": 'post',
            "wordregex": /What are the (.*?) letters of the word "(.*?)"/,
            "type": 'word'
        },
        {
            "regex": /Arithmetic question/,
            "urlregex": /POST to (.*?)\n/,
            "postvarregex": /`(.*?)`/,
            "method": 'post',
            "arithmetic": /What is (.*?)\?/,
            "type": 'arithmetic'
        },
        {
            "regex": /Guess a number question/,
            "urlregex": /POST to (.*?)\n/,
            "postvarregex": /`(.*?)`/,
            "method": 'post',
            "guessregex": /What is (.*?)\?/,
            "type": 'guess'
        },
        {
            "regex": /That answer was incorrect/,
            "urlregex": /That answer (.*?) incorrect\n/,
            "postvarregex": /`(.*?)`/,
            "method": 'post',
            "guessregex": /My number is (.*?) than your guess/,
            "type": 'guess-wrong'
        },
        {
            "regex": /GET the next question from (.*?)$/,
            "urlregex": /GET the next question from (.*?)$/,
            "postvarregex": /`(.*?)`/,
            "method": 'get',
            "type": 'get'
        },
        {
            "regex": /Correct!/,
            "urlregex": /Please GET your animated prize from (.*?)$/,
            "postvarregex": /`(.*?)`/,
            "method": 'get',
            "type": 'get'
        }

    ];

    var calculateMathsAnswer = function(exp) {
        mathsSymbols.forEach(function(item) {
            exp = exp.replace(item.match, item.replace);
        });
        return eval(exp);
    };

    var calculateWordAnswer = function(calc, word) {
        var first = calc.match(/first/) ? calc.match(/first (\d)$/) : false;
        var last = calc.match(/last/) ? calc.match(/last (\d)$/) : false;
        if (first) {
            return word.substr(0, first[1]);
        }
        else {
            return word.substr(last[1]*-1, last[1]);
        }
    };

    var calculateGuess = function(guess, symbol) {
        var midGuessRange = Math.ceil(topGuessRange/2);
        var res;
        if (symbol == 'greater') {
            if (guess >= midGuessRange) {
                res = guess + (topGuessRange - guess)/2;
            }
            else { //guess below midGuessRange
                bottomGuessRange = guess; //store the bottom guess range (2)
                res = guess + (midGuessRange - guess)/2;
            }
        }
        else { //symbol less
            if (guess > midGuessRange) {
                res = guess - (topGuessRange - guess)/2;
            }
            else { //guess below midGuessRange
                var tmpGuess = Math.floor(guess/2);
                if (bottomGuessRange != 0) {
                    //if the bottom guess range is 2 then don't want to guess at 2 again
                    tmpGuess = tmpGuess <= bottomGuessRange ? tmpGuess + 1 : tmpGuess;
                }
                res = tmpGuess;
            }
        }
        res = Math.ceil(res);

        guessList.push(res);
        return res;
    };

    var myGuess = 5;
    var topGuessRange = 9;
    var bottomGuessRange = 0;
    var lastPostUrl = '';
    var lastPostVar = '';
    var guessList = [];

    var parse = function(body) {

        var result = {
            "url": '',
            "method": '',
            "postval": ''
        };

        tests.some(function(test) {
            var res = body.match(test.regex);
            var options = [];
            if (res) {
                console.log('match found for ' + test.regex);
                var url = body.match(test.urlregex);
                result.method = test.method;
                if (url) {
                    result.url = url[1] || '';
                    lastPostUrl = result.url;
                }

                if (test.type !== 'get') {
                    var postVarRes = body.match(test.postvarregex);
                    if (postVarRes) {
                        lastPostVar = postVarRes[1];
                        if (test.type == 'arithmetic') {
                            var exp = body.match(test.arithmetic);
                            options[postVarRes[1]] = calculateMathsAnswer(exp[1]); //e.g: 1 minus 4
                        }
                        else if (test.type == 'word') {
                            var wordres = body.match(test.wordregex);
                            options[postVarRes[1]] = calculateWordAnswer(wordres[1], wordres[2]); //e.g: last 2, word
                        }
                        else if (test.type == 'guess') {
                            options[postVarRes[1]] = myGuess; //start guessing at 5
                        }
                        else {
                            options[postVarRes[1]] = test.postval;
                        }
                        result.postval = options;
                    }
                    if (test.type == 'guess-wrong') {
                        var guess = body.match(test.guessregex);
                        myGuess = calculateGuess(myGuess, guess[1]); //e.g: 7, greater
                        result.url = lastPostUrl;
                        options[lastPostVar] = myGuess;
                        result.postval = options;
                    }
                }
                return true;
            }
            else {
                //console.log('no match found for ' + test.regex);
            }
        });
        return result;
    };

    return {
        parseResponse: function(body) {
            return parse(body);
        }
    }
}();

module.exports = ResponseManager;
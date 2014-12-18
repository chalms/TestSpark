var Test, colors, _;

colors = require("colors");

_ = require("lodash");

Test = (function() {
  var hasFunction;

  function Test() {}

  hasFunction = function(obj, funct, args) {
    return !(obj[funct] === void 0 || obj[funct] === null);
  };

  Test.tests = {};

  Test.setHeaderLeftFormattting = function(hl) {
    return this.headerLeft = hl;
  };

  Test.setHeaderRightFormatting = function(hr) {
    return this.headerRight = hr;
  };

  Test.setColor = function(c) {
    return this.color = c;
  };

  Test.getHeaderLeftFormatting = function() {
    if (this.headerLeft) {
      return this.headerLeft;
    } else {
      return "\n~";
    }
  };

  Test.getHeaderRightFormatting = function() {
    if (this.headerRight) {
      return this.headerRight;
    } else {
      return "~\n";
    }
  };

  Test.getHeaderColor = function() {
    if (this.color) {
      return this.color;
    } else {
      return colors.cyan;
    }
  };

  Test.getHeader = function(description) {
    return Test.getHeaderColor()(Test.getHeaderLeftFormatting() + description + Test.getHeaderRightFormatting());
  };

  Test.test = function(description, buildFunction) {
    console.log(Test.getHeader(description));
    return buildFunction(function(testObjects) {
      var aA, count, e, finalOut, finalStr, functionName, objectName, outObj, passed, s, subject, subjectTest, test, testFunctionUnderT, testN, _results;
      count = 0;
      passed = 0;
      testFunctionUnderT = function(tName, argsArray) {
        var actualResult, e, inputArgs, lastItem, prev, s;
        count += 1;
        lastItem = argsArray.pop();
        inputArgs = argsArray;
        try {
          if (hasFunction(subject, functionName, inputArgs)) {
            if (!(typeof lastItem === "function")) {
              prev = lastItem;
              lastItem = function(result) {
                return prev === result;
              };
            }
            actualResult = subject[functionName].apply(void 0, inputArgs);
            return s = lastItem(actualResult) ? colors.green(objectName + " under test [" + tName + "] has working function " + functionName + " with output " + actualResult + ". " + (++passed).toString() + " of " + count + " passed! ") : colors.red(objectName + " under test [" + tName + "] function " + functionName + " outputs " + actualResult + " when evaluated against test. " + passed.toString() + " of " + count + " failed!");
          } else {
            return s = colors.red(objectName + " under test[" + tName + "] does not have function " + functionName + " with " + inputArgs + " input arguements " + passed.toString() + " of " + count + " passed!");
          }
        } catch (_error) {
          e = _error;
          return s = colors.red(e.toString());
        } finally {
          console.log(s);
        }
      };
      _results = [];
      for (objectName in testObjects) {
        subject = testObjects[objectName];
        console.log(colors.cyan("Tests suite: " + objectName));
        try {
          outObj = colors.yellow(JSON.stringify(subject));
        } catch (_error) {
          e = _error;
          outObj = colors.yellow(subject);
        } finally {
          console.log(outObj);
        }
        for (test in Test.tests[objectName]) {
          if (test === 'functions') {
            for (functionName in Test.tests[objectName].functions) {
              aA = Test.tests[objectName].functions[functionName];
              if (aA instanceof Object && typeof aA === !'function') {
                for (testN in o) {
                  testFunctionUnderT(testN, aA[testN]);
                }
              } else {
                testFunctionUnderT(functionName, aA);
              }
            }
          } else {
            count += 1;
            subjectTest = Test.tests[objectName][test];
            try {
              s = subjectTest(subject) ? colors.green(objectName + " passed test " + test + ". " + (++passed).toString() + " of " + count + " passed.") : colors.red(objectName + " failed test " + test + ". " + passed.toString() + " of " + count + " passed!");
            } catch (_error) {
              e = _error;
              s = colors.red(e.toString());
            } finally {
              console.log(s);
            }
          }
        }
        finalStr = passed + " of " + count + " tests passed for object type: " + objectName;
        finalOut = passed === count ? colors.green(finalStr) : passed > 0 ? colors.cyan(finalStr) : colors.red(finalStr);
        _results.push(console.log(finalOut));
      }
      return _results;
    });
  };

  return Test;

})();

module.exports = Test;

//# sourceMappingURL=../maps/js/test/test.js.map
var colors, hasFunction, runTest, tests, _;

colors = require("colors");

_ = require("lodash");

hasFunction = function(obj, funct, args) {
  return !(obj[funct] === void 0 || obj[funct] === null);
};

tests = {
  obj: {
    isInstanceOfObject: (function(obj) {
      return obj instanceof Object;
    }),
    hasName: (function(obj) {
      return !(obj.name === void 0 || obj.name === null);
    }),
    nameIsString: (function(obj) {
      return typeof obj.name === 'string';
    }),
    functions: {
      addOne: [1, 2],
      add: [3, 3, 6],
      getString: [
        (function(obj) {
          return obj === "Apple";
        })
      ]
    }
  },
  arr: {
    isPrototypeOfArray: (function(obj) {
      return Object(obj).isPrototypeOf(Array);
    }),
    isNotEmpty: (function(obj) {
      return obj.length === !0;
    }),
    hasObjectsOfType: (function(obj) {
      var o;
      for (o in obj) {
        if (typeof o === !'string') {
          return false;
        }
      }
      return true;
    })
  }
};

runTest = function(description, buildFunction, testFunction) {
  console.log(colors.cyan("\n" + description + "\n"));
  return buildFunction(testFunction);
};

runTest("Testing runtest module on object predicates", (function(testFunct) {
  var objectTest, testObjects;
  testObjects = {};
  objectTest = new Object();
  objectTest.name = "Chalmee";
  objectTest.getName = (function() {
    return this.name;
  });
  objectTest.getString = function() {
    return "Apple";
  };
  objectTest.addOne = function(number) {
    return number + 1;
  };
  objectTest.add = function(a, b) {
    return a + b;
  };
  testObjects["obj"] = objectTest;
  return testFunct(testObjects);
}), (function(testObjects) {
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
        return s = lastItem(actualResult) ? colors.green(objectName + " under test [" + tName + "] has working function " + functionName + " with output " + actualResult + ". " + (passed++).toString() + " of " + count + " passed! ") : colors.red(objectName + " under test [" + tName + "] function " + functionName + " outputs " + actualResult + " when evaluated against test. " + passed.toString() + " of " + count + " failed!");
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
    for (test in tests[objectName]) {
      if (test === 'functions') {
        for (functionName in tests[objectName].functions) {
          aA = tests[objectName].functions[functionName];
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
        subjectTest = tests[objectName][test];
        try {
          s = subjectTest(subject) ? colors.green(objectName + " passed test " + test + ". " + (passed++).toString() + " of " + count + " passed.") : colors.red(objectName + " failed test " + test + ". " + passed.toString() + " of " + count + " passed!");
        } catch (_error) {
          e = _error;
          s = colors.red(e.toString());
        } finally {
          console.log(s);
        }
      }
    }
    finalStr = passed + " of " + count + " tests for object type: " + objectName;
    finalOut = passed === count ? colors.green(finalStr) : passed > 0 ? colors.cyan(finalStr) : colors.red(finalStr);
    _results.push(console.log(finalOut));
  }
  return _results;
}));

//# sourceMappingURL=../maps/js/test/test.js.map
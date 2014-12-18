var colors, runTest, tests;

colors = require("colors");

tests = {
  obj: {
    isPrototypeOfObject: (function(obj) {
      return Object(obj).isPrototypeOf(Object);
    }),
    hasName: (function(obj) {
      return !(obj.name === void 0 || obj.name === null);
    }),
    nameIsString: (function(obj) {
      return typeof obj.name === 'string';
    }),
    hasFunction: (function(obj, funct, args) {
      return !(obj[funct] === void 0 || obj[funct] === null);
    })
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

runTest("Testing runtest module on object predicates", (function(testFunction) {
  var objectTest, testObjects;
  testObjects = {};
  objectTest = new Object({});
  objectTest.name = "Chalmee";
  objectTest.getName = (function() {
    return this.name;
  });
  testObjects["obj"] = objectTest;
  return testFunction(testObjects);
}), (function(testObjects) {
  var count, e, finalOut, objectName, passed, s, test, _i, _j, _len, _len1, _ref, _results;
  _results = [];
  for (_i = 0, _len = testObjects.length; _i < _len; _i++) {
    objectName = testObjects[_i];
    count = 0;
    passed = 0;
    _ref = tests[objectName];
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      test = _ref[_j];
      try {
        if (tests[objectName][test](objectTest)) {
          s = colors.green(objectName + " passed test: " + test);
          passed += 1;
        } else {
          s = colors.red(objectName + "failed test: " + test);
        }
      } catch (_error) {
        e = _error;
        s = colors.red(e.getMessage());
      } finally {
        console.log(s);
        count += 1;
      }
    }
    finalOut = colors.cyan(passed + " of " + count(" tests passed for " + objectName));
    _results.push(console.log(finalOut));
  }
  return _results;
}));

//# sourceMappingURL=../maps/js/test/test.js.map
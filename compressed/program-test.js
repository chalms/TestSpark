var Predicate, PredicateList, Requirement, Test, predicates, requirements, tests;

Predicate = function(predicate) {
  _this["p"] = function(condition) {
    if (args) {
      return predicate(args);
    } else {
      return false;
    }
  };
  _this["p`"] = function(args) {
    if (args) {
      return !predicate(args);
    } else {
      return true;
    }
  };
  return _this;
};

PredicateList = function(list) {
  var key, _this;
  _this = list;
  for (key in list) {
    _this[key] = (Number.isInteger(list[key]) ? new Predicate(predicates[key]) : new Predicate(list[key]));
  }
  return _this;
};

Requirement = function(requirement) {
  var _this;
  _this = requirement;
  _this.predicates = new PredicateList(requirement.predicates);
  return _this;
};

requirements = require("./requirements.json");

predicates = require("./predicates.json");

Test = function(predicateName, predicate) {
  return {
    E: predicate[predicateName]["p"],
    U: predicate[predicateName]["p`"]
  };
};

Test.prototype.run = function() {
  var runTest, _results, _this;
  runTest = function(testString) {
    var key, test;
    test = _this[testString];
    if (testString === "E") {
      console.log(colors.yellow("Equivalence Tests: "));
    } else if (testString === "U") {
      console.log(colors.yellow("Un-Equivalence Tests: "));
    } else {
      throw new Error("");
    }
    for (key in test) {
      console.log("Testing Predicate " + key + ": ");
      _results[test] = test[key](obj);
      if (_results[test]) {
        console.log(colors.green("Pass!"));
      } else {
        console.log(colors.red("Fail!"));
      }
    }
  };
  _results = {};
  _this = this;
  runTest(string);
};

Requirement.prototype.buildTest = function() {
  var predicate, _this;
  _this = {};
  for (predicate in this.predicates) {
    _this[predicate] = new Test(this.predicate, this.predicates[predicate]);
  }
  return _this;
};

requirements.build = function() {
  var requirement, _this;
  _this = {};
  for (requirement in requirements) {
    requirements[requirement].name = requirement;
    _this[requirement] = new Requirement(requirements[requirement]);
  }
  return _this;
};

requirements = requirements.build().buildTests();

requirements.buildTests = function() {
  var requirement, requirementName, _this;
  _this = {};
  for (requirementName in this) {
    requirement = requirements[requirementName];
    if (typeof requirement !== "object") {
      throw new Error("Requirements is not an object!");
    }
    if (typeof requirement.predicates !== "object") {
      throw new Error("Requirement " + requirementName + " has no predicates objects!");
    }
    _this[requirement.name] = requirement.buildTest();
  }
  return _this;
};

tests = requirements.buildTests();

tests.resetNumber = function() {
  this.number = 0;
  return this.number;
};

tests.getNumber = function() {
  if (!this.number || (!Number.isInteger(this.number))) {
    this.number = 0;
  }
  return this.number;
};

tests.run = function(runList) {
  var test, _results;
  this.resetNumber();
  console.log(colors.cyan("\nLaunching Tests:\n"));
  _results = {};
  for (test in runList) {
    _results = this[test].run(runList[test]);
  }
  return _results;
};

//# sourceMappingURL=maps/program-test.js.map
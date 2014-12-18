var ExampleObject, Test;

Test = require("./test/test");

Test.tests.ExampleObject = {
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
};

ExampleObject = function() {
  var _this;
  _this = {
    name: "Chalmee",
    getName: (function() {
      return this.name;
    })
  };
  _this.getString = function() {
    return "Apple";
  };
  _this.addOne = function(number) {
    return number + 1;
  };
  _this.add = function(a, b) {
    return a + b;
  };
  return _this;
};

Test.test("Testing Test module on object predicates", (function(test) {
  return test({
    ExampleObject: new ExampleObject()
  });
}));

//# sourceMappingURL=maps/js/test-set.js.map
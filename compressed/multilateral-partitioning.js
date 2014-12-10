var MultilateralPartioning, _;

_ = require('lodash');

MultilateralPartioning = (function() {
  var locked, semaphores;

  MultilateralPartioning.prototype.inputs = {};

  semaphores = {};

  locked = true;

  MultilateralPartioning.prototype.addInput = function(input) {
    var a, b, c;
    if (this.inputs.hasOwnProperty(input.name)) {
      a = this.inputs[input.name].equivalenceClasses;
      b = input.equivalenceClasses;
      c = _.merge(a, b);
      console.log(e);
    } else {
      this.inputs[input.name] = input.equivalenceClasses;
    }
  };

  MultilateralPartioning.prototype.addInputClasses = function(inputClasses) {
    var input, _results;
    this.inputs = this.inputs || new Object({});
    _results = [];
    for (input in inputClasses) {
      _results.push(this.addInput(input));
    }
    return _results;
  };

  MultilateralPartioning.prototype.addEquivalence = function(inputClasses) {
    this.equivalenceClasses = this.equivalenceClasses || new Array();
    return this.addInputClasses(inputClasses);
  };

  function MultilateralPartioning(inputClasses) {
    this.addEquivalence(inputClasses);
    this;
  }

  return MultilateralPartioning;

})();

//# sourceMappingURL=maps/multilateral-partitioning.js.map
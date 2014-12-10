var MultilateralPartioning, _;

_ = require('lodash');

MultilateralPartioning = (function() {
  MultilateralPartioning.prototype.inputs = {};

  MultilateralPartioning.prototype.validateInputItem = function(input) {
    if (!input.equivalenceClasses) {
      throw new Error("Input has no equivalence classes attr");
    } else if (!input.name) {
      throw new Error("Input has no name attr");
    } else {
      return input.equivalenceClasses;
    }
  };

  MultilateralPartioning.prototype.addInput = function(input) {
    var currentClasses, equClasses;
    equClasses = this.validateInputItem(input);
    if (this.inputs.hasOwnProperty(name)) {
      currentClasses = this.inputs[input.name].equivalenceClasses;
      _.merge(currentClasses, equClasses);
    } else {
      equClasses;
    }
  };

  MultilateralPartioning.prototype.addEquivalence = function(predicate) {
    var i, next, _i, _len, _ref;
    next = [];
    _ref = this.equivalence;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      next.push(this.equivalence[i] ^ predicate);
    }
    return this.equivalence = _.merge(this.equivalence, next);
  };

  MultilateralPartioning.prototype.loopThroughDifference = function(result, fromBefore) {
    var hasSeen, i, _results;
    i = 0;
    _results = [];
    while (i < result.length) {
      hasSeen = fromBefore.indexOf(result[i]);
      if (hasSeen === -1) {
        addEquivalence(result[i]);
      }
      _results.push(i += 1);
    }
    return _results;
  };

  MultilateralPartioning.prototype.addInputClasses = function(inputClasses) {
    var fromBefore, input, result, _results;
    this.inputs = this.inputs || new Object({});
    _results = [];
    for (input in inputClasses) {
      result = this.addInput(input);
      fromBefore = this.inputs[input.name].equivalenceClasses[i];
      _results.push(loopThroughDifference(result, fromBefore));
    }
    return _results;
  };

  MultilateralPartioning.prototype.addEquivalenceClasses = function(inputClasses) {
    this.equivalenceClasses = this.equivalenceClasses || new Array();
    return this.addInputClasses(inputClasses);
  };

  function MultilateralPartioning(inputClasses) {
    this.addEquivalenceClasses(inputClasses);
  }

  return MultilateralPartioning;

})();

//# sourceMappingURL=maps/multilateral-partitioning.js.map
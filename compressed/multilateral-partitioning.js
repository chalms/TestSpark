var MultilateralPartitioning, _;

_ = require('lodash');

MultilateralPartitioning = (function() {
  MultilateralPartitioning.prototype.inputs = {};

  MultilateralPartitioning.prototype.validateInputItem = function(input) {
    if (!input.equivalenceClasses) {
      throw new Error("Input has no equivalence classes attr");
    } else if (!input.name) {
      throw new Error("Input has no name attr");
    } else {
      return input.equivalenceClasses;
    }
  };

  MultilateralPartitioning.prototype.addInput = function(input) {
    var currentClasses, equClasses;
    equClasses = this.validateInputItem(input);
    if (this.inputs.hasOwnProperty(name)) {
      currentClasses = this.inputs[input.name].equivalenceClasses;
      _.merge(currentClasses, equClasses);
    } else {
      equClasses;
    }
  };

  MultilateralPartitioning.prototype.buildCombinedEquivalence = function(equivalence, ec) {
    var next;
    next = {};
    next[equivalence.name] = equivalence[i];
    next[ec.name] = ec;
    return next;
  };

  MultilateralPartitioning.prototype.buildAllCombinedEquivalences = function(equivalenceClasses, ec) {
    var allNewEquivalences, equivalence;
    allNewEquivalences = [];
    for (equivalence in equivalenceClasses) {
      allNewEquivalences.push(buildCombinedEquivalence(equivalence, ec));
    }
    return allNewEquivalences;
  };

  MultilateralPartitioning.prototype.addEquivalence = function(ec) {
    var allNewEquivalences;
    allNewEquivalences = buildAllCombinedEquivalences(this.equivalenceClasses, ec);
    return this.equivalenceClasses = allNewEquivalences;
  };

  MultilateralPartitioning.prototype.loopThroughDifference = function(result, fromBefore) {
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

  MultilateralPartitioning.prototype.addInputClasses = function(inputClasses) {
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

  MultilateralPartitioning.prototype.addEquivalenceClasses = function(inputClasses) {
    this.equivalenceClasses = this.equivalenceClasses || new Array();
    return this.addInputClasses(inputClasses);
  };

  function MultilateralPartitioning(inputClasses) {
    this.addEquivalenceClasses(inputClasses);
  }

  return MultilateralPartitioning;

})();

module.exports = MultilateralPartitioning;

//# sourceMappingURL=maps/js/multilateral-partitioning.js.map
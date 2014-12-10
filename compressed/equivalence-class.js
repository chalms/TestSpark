var EquivalenceClass, Set;

Set = require('./set');

EquivalenceClass = (function() {
  EquivalenceClass.prototype.constraints = new Set;

  EquivalenceClass.prototype.values = new Set;

  EquivalenceClass.prototype.errorMessage = new Array(5);

  EquivalenceClass.__proto__.addValues = function(values) {
    return this.values.add(values);
  };

  EquivalenceClass.__proto__.addConstraints = function(constraints) {
    return this.constraints.add(constraints);
  };

  EquivalenceClass.__proto__.runError = function() {
    var _ref, _ref1;
    this.errorMessage[0] = "Input: " + arr[2] + "cannot be max or min constraint!";
    this.errorMessage[1] = "The max and min constraint must evaluate to false!";
    this.errorMessage[2] = value + " is the " + (this.errorMessage[3] = (_ref = p[0]) != null ? _ref : {
      "max": (_ref1 = p[1]) != null ? _ref1 : {
        "min": "result from a true"
      }
    });
    this.errorMessage[4] = message + " constraint";
    return this.errorMessage = this.errorMessage.join("\n");
  };

  EquivalenceClass.__proto__.valuesForConstraints = function(constraints, values) {
    var e, run;
    c.testInputs = values;
    run = function(c, v) {
      var arr, i, j, r, _i;
      j = c.length;
      r = new Array(j);
      for (i = _i = 0; 0 <= j ? _i < j : _i > j; i = 0 <= j ? ++_i : --_i) {
        arr = new Array(10);
        arr[9] = v;
        arr[7] = Math.max(arr[9]);
        arr[8] = Math.min(arr[9]);
        while (arr[5] > 0 && arr[3] < 3) {
          arr[2] = arr[9].pop();
          p[0] = arr[2] === arr[7];
          p[1] = arr[2] === arr[8];
          arr[2] = constraint(arr[2]);
          if (arr[2] ^ ((p[0] && !arr[0]) ^ (p[1] && !arr[1]))) {
            throw new Error("e:1");
          } else {
            arr[4] = arr[4] || arr[2];
            arr[3] = parseInt(arr[4]) + parseInt(!p[1]) + parseInt(p[1]);
          }
        }
        r[i] = c;
      }
      return r;
    };
    try {
      return run(constraints, constraints.testInputs);
    } catch (_error) {
      e = _error;
      if (e === "e:1") {
        this.runError.call(errorMessage);
        return console.log(errorMessage);
      }
    }
  };

  EquivalenceClass.__proto__.isValid = function() {
    if (!(this.constraints.length > 0)) {
      return false;
    }
    if (!(this.values.length > 2)) {
      return false;
    }
    return this.valuesForConstraints(this.constraints, this.values);
  };

  function EquivalenceClass(variable, constraints, values) {
    this.addConstraints(constraints);
    this.addValues(values);
    this.name = variable;
  }

  return EquivalenceClass;

})();

//# sourceMappingURL=maps/js/equivalence-class.js.map
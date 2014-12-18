var Set,
  __slice = [].slice;

Set = (function() {
  function Set() {
    return new Array();
  }

  return Set;

})();

Set.prototype.add = function() {
  var value, values, _results;
  value = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  _results = [];
  while (true) {
    if (this.indexOf(value) === -1) {
      this.push(value);
    }
    if (values.length === 0) {
      break;
    }
    _results.push(value = values.pop());
  }
  return _results;
};

module.exports = Set;

//# sourceMappingURL=maps/js/set.js.map
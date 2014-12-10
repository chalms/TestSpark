(function() {
  Array.runloop = function(funct) {
    var _$;
    if (this.length > 0) {
      _$ = this;
      return funct(_$.pop(), _$, (function(_$) {
        return function() {
          return _$.runloop(funct);
        };
      })(this));
    }
  };
  Object.runloop = function(funct) {
    return Object.keys(this).runloop(funct);
  };
  return module.exports = this;
}).call(this);

//# sourceMappingURL=maps/js/globals.js.map
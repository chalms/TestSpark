var MultilateralPartitioning, PartitionDomain;

MultilateralPartitioning = require('./multilateral-partitioning');

PartitionDomain = (function() {
  function PartitionDomain(partition) {
    var key, _i, _len, _this;
    _this = new MultilateralPartitioning;
    for (_i = 0, _len = partition.length; _i < _len; _i++) {
      key = partition[_i];
      _this.addEquivalenceClass(new EquivalenceClass(partition));
    }
  }

  return PartitionDomain;

})();

//# sourceMappingURL=maps/js/partition-domain.js.map
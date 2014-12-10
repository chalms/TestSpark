
 # jsTest - Test Case Generator and Test Analyzer
 # @version v1.0.0
 # @link
 # @license ISC

MultilateralPartitioning = require('./multilateral-partitioning')
class PartitionDomain
  constructor: (partition) ->
    _this = new MultilateralPartitioning
    for key in partition
      _this.addEquivalenceClass(new EquivalenceClass(partition))


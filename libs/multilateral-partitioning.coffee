# jsTest - Test Case Generator and Test Analyzer
# @version v1.0.0
# @link
# @license ISC

_ = require('lodash')

class MultilateralPartitioning
  inputs: {}

  validateInputItem: (input) ->
    unless (input.equivalenceClasses)
      throw new Error("Input has no equivalence classes attr")
    else unless (input.name)
      throw new Error("Input has no name attr")
    else
      input.equivalenceClasses

  addInput: (input) ->
    equClasses = @validateInputItem(input)
    if (@inputs.hasOwnProperty(name))
      currentClasses = @inputs[input.name].equivalenceClasses
      _.merge(currentClasses, equClasses)
    else
      equClasses
    return

  buildCombinedEquivalence: (equivalence, ec) ->
    next = {}
    next[equivalence.name] = equivalence[i]
    next[ec.name] = ec
    return next

  buildAllCombinedEquivalences: (equivalenceClasses, ec) ->
    allNewEquivalences = []
    for equivalence of equivalenceClasses
      allNewEquivalences.push(buildCombinedEquivalence(equivalence, ec))
    return allNewEquivalences

  addEquivalence: (ec) ->
    allNewEquivalences = buildAllCombinedEquivalences(@equivalenceClasses, ec)
    @equivalenceClasses = allNewEquivalences

  loopThroughDifference: (result, fromBefore) ->
    i = 0
    while i < result.length
      hasSeen = fromBefore.indexOf(result[i])
      addEquivalence(result[i]) if (hasSeen is -1)
      i += 1

  addInputClasses: (inputClasses) ->
    @inputs = @inputs || new Object({})
    for input of inputClasses
      result = @addInput(input)
      fromBefore = @inputs[input.name].equivalenceClasses[i]
      loopThroughDifference(result, fromBefore)

  addEquivalenceClasses: (inputClasses) ->
    @equivalenceClasses = @equivalenceClasses || new Array()
    @addInputClasses(inputClasses)

  constructor: (inputClasses) ->
    @addEquivalenceClasses(inputClasses)

module.exports = MultilateralPartitioning
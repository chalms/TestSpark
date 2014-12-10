# jsTest - Test Case Generator and Test Analyzer
# @version v1.0.0
# @link
# @license ISC

_ = require('lodash')

class MultilateralPartioning
  inputs: {}
  semaphores = {}
  locked = true

  addInput: (input) ->
    if (@inputs.hasOwnProperty(input.name))
      a = @inputs[input.name].equivalenceClasses
      b = input.equivalenceClasses
      c = _.merge(a, b)
      console.log(e)
    else
      @inputs[input.name] = input.equivalenceClasses
    return

  addInputClasses: (inputClasses) ->
    @inputs = @inputs || new Object({})
    for input of inputClasses
      @addInput(input)

  addEquivalence: (inputClasses) ->
    @equivalenceClasses = @equivalenceClasses || new Array()
    @addInputClasses(inputClasses)

  constructor: (inputClasses) ->
    @addEquivalence(inputClasses)
    @


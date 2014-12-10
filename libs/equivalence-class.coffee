# jsTest - Test Case Generator and Test Analyzer
# @version v1.0.0
# @link
# @license ISC

Set = require('./set')

class EquivalenceClass
  constraints: new Set
  values: new Set
  errorMessage:  new Array(5)

  @__proto__.addValues = (values) ->
    @values.add(values)

  @__proto__.addConstraints = (constraints) ->
    @constraints.add(constraints)

  @__proto__.runError = () ->
    @errorMessage[0] = "Input: " + arr[2] +  "cannot be max or min constraint!"
    @errorMessage[1] = "The max and min constraint must evaluate to false!"
    @errorMessage[2] =  value + " is the " +
    @errorMessage[3] = (p[0] ? "max" : (p[1] ? "min" : "result from a true"))
    @errorMessage[4] = message + " constraint"
    @errorMessage = @errorMessage.join("\n")

  @__proto__.valuesForConstraints = (constraints, values) ->
    c.testInputs = values
    run = (c, v) ->
      j = c.length
      r = new Array(j)
      for i in [0...j]
        arr = new Array(10)
        arr[9] = v
        arr[7] = Math.max(arr[9])
        arr[8] = Math.min(arr[9])
        while (arr[5] > 0 && arr[3] < 3)
          arr[2] = arr[9].pop()
          p[0] = arr[2] is arr[7]
          p[1] = arr[2] is arr[8]
          arr[2] = c[i] (arr[2])
          if (arr[2]^((p[0] && !arr[0]) ^ (p[1] && !arr[1])))
            throw new Error("e:1")
          else
            arr[4] = arr[4] || arr[2]
            arr[3] = parseInt(arr[4])+parseInt(!p[1]) + parseInt(p[1])
        r[i] = c
      return r
    try
      run(constraints, constraints.testInputs)
    catch e
      if e is "e:1"
        @runError.call(errorMessage)
        console.log(errorMessage)

  @__proto__.isValid = () ->
    return false unless (@constraints.length > 0)
    return false unless (@values.length > 2)
    return @.valuesForConstraints(@constraints, @values)

  constructor: (variable, constraints, values) ->
    @.addConstraints(constraints)
    @.addValues(values)
    @name = variable







 # jsTest - Test Case Generator and Test Analyzer
 # @version v1.0.0
 # @link
 # @license ISC


# Test.tests.arr = (
#   isPrototypeOfArray: ((obj) -> return (Object(obj).isPrototypeOf Array)),
#   isNotEmpty: ((obj) -> return (obj.length is not 0)),
#   hasObjectsOfType: ((obj) ->
#     for o of obj
#       if (typeof o is not 'string')
#         return false
#     return true
#   )
# )


Test = require("./test/test")

Test.tests.ExampleObject = (
  isInstanceOfObject: ((obj) -> return (obj instanceof Object)),
  hasName: ((obj) -> return (!(obj.name is undefined or obj.name is null))),
  nameIsString: ((obj) -> return (typeof obj.name is 'string')),
  functions: (
    addOne: [1, 2]
    add: [3, 3, 6]
    getString: [((obj) -> return (obj is "Apple"))] #Predicate verifier
  )
)

ExampleObject = () ->
  _this = (
    name: "Chalmee"
    getName: (() -> return this.name )
  )
  _this.getString = () -> return "Apple"
  _this.addOne = (number) -> return (number + 1)
  _this.add = (a, b) -> return (a + b)
  return _this

Test.test("Testing Test module on object predicates", ((test) ->
  test((
    ExampleObject: new ExampleObject()
  ))
))

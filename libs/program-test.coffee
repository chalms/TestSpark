
 # jsTest - Test Case Generator and Test Analyzer
 # @version v1.0.0
 # @link
 # @license ISC

# InputVar = (input) ->
#    # input.tes

# Condition = (predicate) ->
#   _this["E"] = (condition) ->
#     (if args then (predicate(args)) else false)
#   _this["U"] = (args) ->
#     (if args then (not predicate(args)) else true)
#   _this


# Predicate = (list) ->
#   _this = list
#   for key of list
#     _this[key] = (
#       if Number.isInteger(list[key])
#         new Condition(predicates[key])
#       else
#         new Condition(list[key])
#       return
#     )
#   _this


# TestUnit = (predicates) ->
#   return new Predicate(predicates)

# Requirement = (requirement) ->
#   _this = requirement
#   _this.testunit = new TestUnit(requirement.predicates)
#   _this

# requirements = require("./requirements.json")
# predicates = require("./predicates.json")

# Test = (predicateName, predicate) ->
#   E: predicate[predicateName]["p"]
#   U: predicate[predicateName]["p`"]

# Test::run = ->
#   runTest = (testString) ->
#     test = _this[testString]
#     if testString is "E"
#       console.log colors.yellow("Equivalence Tests: ")
#     else if testString is "U"
#       console.log colors.yellow("Un-Equivalence Tests: ")
#     else
#       throw new Error("")
#     for key of test
#       console.log "Testing Predicate " + key + ": "
#       _results[test] = test[key](obj)
#       if _results[test]
#         console.log colors.green("Pass!")
#       else
#         console.log colors.red("Fail!")
#     return
#   _results = {}
#   _this = this
#   runTest string
#   return

# Requirement::buildTest = ->
#   _this = {}
#   for predicate of @predicates
#     _this[predicate] = new Test(@predicate, @predicates[predicate])
#   _this

# requirements.build = ->
#   _this = {}
#   for requirement of requirements
#     requirements[requirement].name = requirement
#     _this[requirement] = new Requirement(requirements[requirement])
#   _this
# requirements = requirements.build().buildTests()

# requirements.buildTests = ->
#   _this = {}
#   for requirementName of this
#     requirement = requirements[requirementName]
#     if typeof requirement isnt "object"
#       throw new Error("Requirements is not an object!")
#     if typeof requirement.predicates isnt "object"
#       throw new Error("Requirement " + requirementName + " has no predicates")
#     _this[requirement.name] = requirement.buildTest()
#   _this

# tests = requirements.buildTests()
# tests.resetNumber = ->
#   @number = 0
#   @number

# tests.getNumber = ->
#   @number = 0  if not @number or (not Number.isInteger(@number))
#   @number

# tests.run = (runList) ->
#   @resetNumber()
#   console.log colors.cyan("\nLaunching Tests:\n")
#   _results = {}
#   for test of runList
#     _results = this[test].run(runList[test])
#   _results

colors = require "colors"

tests =
  obj: (
    isPrototypeOfObject: ((obj) -> return (Object(obj).isPrototypeOf Object)),
    hasName: ((obj) -> return (!(obj.name is undefined or obj.name is null))),
    nameIsString: ((obj) -> return (typeof obj.name is 'string')),
    hasFunction: ((obj, funct, args) -> return (!(obj[funct] is undefined or obj[funct] is null)))
  )
  arr: (
    isPrototypeOfArray: ((obj) -> return (Object(obj).isPrototypeOf Array)),
    isNotEmpty: ((obj) -> return (obj.length is not 0)),
    hasObjectsOfType: ((obj) ->
        for o of obj
          if (typeof o is not 'string')
            return false
        return true
      )
  )

runTest = (description, buildFunction, testFunction) ->
  console.log(colors.cyan("\n" + description  + "\n"))
  buildFunction(testFunction)

runTest("Testing runtest module on object predicates",
  ((testFunction) ->
    testObjects = {}
    objectTest = new Object({})
    objectTest.name = "Chalmee"
    objectTest.getName = (() ->
        return this.name
      )
    testObjects["obj"] = objectTest
    testFunction(testObjects)
  ),((testObjects) ->
    for objectName in testObjects
      count = 0
      passed = 0
      for test in tests[objectName]
        try
          if tests[objectName][test](objectTest)
            s = colors.green((objectName + " passed test: " + test))
            passed += 1
          else
            s = colors.red((objectName + "failed test: " + test))
        catch e
            s = colors.red(e.getMessage())
        finally
          console.log(s)
          count += 1
      finalOut = colors.cyan(passed + " of " + count " tests passed for " + objectName)
      console.log(finalOut)
  )
)



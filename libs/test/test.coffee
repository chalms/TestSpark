colors = require "colors"
_ = require "lodash"

hasFunction =  (obj, funct, args) ->
  return (!(obj[funct] is undefined or obj[funct] is null))

tests =
  obj: (
    isInstanceOfObject: ((obj) -> return (obj instanceof Object)),
    hasName: ((obj) -> return (!(obj.name is undefined or obj.name is null))),
    nameIsString: ((obj) -> return (typeof obj.name is 'string')),
    functions: (
      addOne: [1, 2]
      add: [3, 3, 6]
      getString: [((obj) -> return (obj is "Apple"))] #Predicate verifier
    )
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
  ((testFunct) ->
    testObjects = {}
    objectTest = new Object()
    objectTest.name = "Chalmee"
    objectTest.getName = (() ->
        return this.name
      )
    objectTest.getString = () ->
      return "Apple"
    objectTest.addOne = (number) ->
      return (number + 1)
    objectTest.add = (a, b) ->
      return (a + b)

    testObjects["obj"] = objectTest
    testFunct(testObjects)

  ),((testObjects) ->
      count = 0
      passed = 0
      testFunctionUnderT = (tName, argsArray) ->
        count += 1
        lastItem = argsArray.pop()
        inputArgs = argsArray
        try
          if hasFunction(subject, functionName, inputArgs)
            if not (typeof lastItem is "function")
              prev = lastItem
              lastItem = (result) ->
                return (prev is result)
            actualResult = subject[functionName].apply(undefined, inputArgs)
            s = if lastItem(actualResult) then colors.green(objectName + " under test [" + tName + "] has working function " + (functionName) + " with output " + actualResult + ". " + (passed++).toString() + " of " + count + " passed! ")
            else colors.red(objectName + " under test [" + tName + "] function " + (functionName) + " outputs " + actualResult + " when evaluated against test. " + (passed).toString() + " of " + count + " failed!")
          else
            s = colors.red((objectName + " under test[" + tName + "] does not have function " + functionName + " with " + inputArgs + " input arguements " + (passed).toString() + " of " + count + " passed!"))
        catch e
          s = colors.red(e.toString())
        finally
          console.log(s)
      for objectName of testObjects
        subject = testObjects[objectName]
        console.log colors.cyan("Tests suite: " + objectName)
        try
          outObj = colors.yellow((JSON.stringify(subject)))
        catch e
          outObj = colors.yellow((subject))
        finally
          console.log(outObj)
        for test of tests[objectName]
          if (test is 'functions')
            for functionName of tests[objectName].functions
              aA = tests[objectName].functions[functionName]
              if aA instanceof Object and typeof aA is not 'function'
                for testN of o
                  testFunctionUnderT(testN, aA[testN])
              else
                testFunctionUnderT(functionName, aA)
          else
            count += 1
            subjectTest = tests[objectName][test]
            try
              s = if subjectTest(subject) then colors.green(objectName + " passed test " + test + ". " + (passed++).toString() + " of " + count + " passed.") else colors.red(objectName + " failed test " + test + ". " + (passed).toString() + " of " + count + " passed!")
            catch e
                s = colors.red(e.toString())
            finally
              console.log(s)
        finalStr = passed + " of " + count + " tests for object type: " + objectName
        finalOut = if passed is count then colors.green(finalStr) else if (passed > 0) then colors.cyan(finalStr) else colors.red(finalStr)
        console.log(finalOut)
  )
)



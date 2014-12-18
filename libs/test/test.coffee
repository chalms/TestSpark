colors = require "colors"
_ = require "lodash"

class Test
  hasFunction =  (obj, funct, args) ->
    return (!(obj[funct] is undefined or obj[funct] is null))

  @tests: {}

  @setHeaderLeftFormattting: (hl) ->
    @headerLeft = hl

  @setHeaderRightFormatting: (hr) ->
    @headerRight = hr

  @setColor: (c) ->
    @color = c

  @getHeaderLeftFormatting: () ->
    return if @headerLeft then @headerLeft else "\n~"

  @getHeaderRightFormatting: () ->
    return if @headerRight then @headerRight else "~\n"

  @getHeaderColor: () ->
    return if @color then @color else colors.cyan

  @getHeader: (description) ->
    return Test.getHeaderColor()(Test.getHeaderLeftFormatting() + description + Test.getHeaderRightFormatting())

  @test: (description, buildFunction) ->
    console.log(Test.getHeader(description))
    buildFunction((testObjects) ->
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
            s = if lastItem(actualResult) then colors.green(objectName + " under test [" + tName + "] has working function " + (functionName) + " with output " + actualResult + ". " + (++passed).toString() + " of " + count + " passed! ")
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
        for test of Test.tests[objectName]
          if (test is 'functions')
            for functionName of Test.tests[objectName].functions
              aA = Test.tests[objectName].functions[functionName]
              if aA instanceof Object and typeof aA is not 'function'
                for testN of o
                  testFunctionUnderT(testN, aA[testN])
              else
                testFunctionUnderT(functionName, aA)
          else
            count += 1
            subjectTest = Test.tests[objectName][test]
            try
              s = if subjectTest(subject) then colors.green(objectName + " passed test " + test + ". " + (++passed).toString() + " of " + count + " passed.") else colors.red(objectName + " failed test " + test + ". " + (passed).toString() + " of " + count + " passed!")
            catch e
                s = colors.red(e.toString())
            finally
              console.log(s)
        finalStr = passed + " of " + count + " tests passed for object type: " + objectName
        finalOut = if passed is count then colors.green(finalStr) else if (passed > 0) then colors.cyan(finalStr) else colors.red(finalStr)
        console.log(finalOut)
    )

module.exports = Test


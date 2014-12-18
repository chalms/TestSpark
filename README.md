# TestSpark

A Sparkplug USL server node to auto-generate test cases and test report when given an input sheet. Based off of concepts in: 

- Predicate Testing 
- Mutation Testing
- Domain Partitioning 
- Equivalence Classing
- Defclear Graph Search for path infeasability

### Predicate testing - Example usage 

#### Input 

in test.coffee
```coffeescript
Test = require("./test/test")

Test.tests.ExampleObject = (
  isInstanceOfObject: ((obj) -> return (obj instanceof Object)),
  hasName: ((obj) -> return (!(obj.name is undefined or obj.name is null))),
  nameIsString: ((obj) -> return (typeof obj.name is 'string')),
  functions: (
    addOne: [1, 2]
    add: [3, 3, 6]
    getString: [((obj) -> return (obj is "Apple"))] 
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
```

#### Output 

```sh
$ node test.coffee
> ~Testing Test module on object predicates~
> Tests suite: ExampleObject 
> {"name":"Chalmee"}
> ExampleObject passed test isInstanceOfObject. 1 of 1 passed.
> ExampleObject passed test hasName. 2 of 2 passed.
> ExampleObject passed test nameIsString. 3 of 3 passed.
> ExampleObject under test [addOne] has working function addOne with output 2. 4 of 4 passed!
> ExampleObject under test [add] has working function add with output 6. 5 of 5 passed!
> ExampleObject under test [getString] has working function getString with output Apple. 6 of 6 passed!
> 6 of 6 tests passed for object type: ExampleObject
```

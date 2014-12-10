class Set
  constructor: () ->
    return new Array()

Set::add = (value, values...) ->
  while true
    this.push(value) if this.indexOf(value) is -1
    break if values.length is 0
    value = values.pop()

module.exports = Set
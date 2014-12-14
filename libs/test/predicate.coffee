

P = require "../predicate.js"
expect = require "expect.js"

describe "P", ->

  beforeEach (done) ->
    P.set "and", "&&"
    P.set "or", "||"
    P.set "^"
    done()

  it "should evaluate simple boolean operators", (done) ->

    a = true
    b = false
    r = {}
    r[1] = P.p["or"](a, b)
    r[2] = P.p["and"](a, b)
    r[3] = P.p["^"](a, b)

    expect(r[1]).to.be(true)
    expect(r[2]).to.be(false)

    done()

  it "should evaluate nested boolean operators", (done) ->

    P.set "1", ((a, b, c, d) ->
      return p["^"](p["or"](a, b), p["and"](c, d))
    )

    expect(P.p["1"](true, false, true, false)).to.be(true)

    done()
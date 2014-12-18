# module.exports = class P
#   p: {}

#   @.eval = (a, b, c) ->
#     if typeof c is "string"
#       eval "a " + c + " b"
#     else
#       p[c] a, b

#   @.set = (c, d) ->
#     p[c] = (if d is undefined or d is null then ((a, b) ->
#         pEval a, b, c
#       ) else if d is typeof "string" then ((a, b) ->
#         pEval a, b, d
#       ) else
#         d
#       )


  Array.runloop = (funct) ->
    if @length > 0
      _$ = @
      funct(_$.pop(), _$, ((_$) ->
        () ->
          _$.runloop funct
      )(@))
  Object.runloop = (funct) ->
    Object.keys(@).runloop(funct)
  module.exports = @

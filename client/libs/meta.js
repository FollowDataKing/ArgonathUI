Array.prototype.flatMap = function(mapFunc) {
  var result = []
  for (let item of this) {
    let tokens = mapFunc(item)
    result = result.concat(tokens)
  }
  return result
}

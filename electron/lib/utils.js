exports.isEmpty = function isEmpty(obj) {
  return typeof obj === 'object' && Object.keys(obj).length === 0
}

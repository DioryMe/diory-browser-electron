export function debounce(func, wait, immediate) {
  let timeout
  // eslint-disable-next-line func-names
  return function () {
    const context = this
    const args = arguments
    // eslint-disable-next-line func-names
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

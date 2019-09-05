//节流函数
function throttle(fn, wait, immediate) {
  let timer = null;
  let callNow = immediate;
  return function () {
    let context = this,
      args = arguments;
    if (callNow) {
      fn.apply(context, args);
      callNow = false
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null
      }, wait)
    }
  }
}

export default throttle;

export function throttle(func, immediate = false, duration = 100) {
  let timer = null;

  return function() {
    if(!timer) {
      immediate && func.apply(this, arguments);
      timer = setTimeout(() => {
        !immediate && func.apply(this, arguments);
        clearTimeout(timer);
        timer = null;
      }, duration);
    }
  }
}
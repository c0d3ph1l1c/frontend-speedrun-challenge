export function debounce(cb, immediate = false, delay = 100) {
  const _this = this;
  const args = arguments;

  var timer = null;

  return function() {
    if(immediate && !timer) cb.apply(_this, args);
    clearTimeout(timer);
    timer = null;
    timer = setTimeout(() => {
      if(!immediate) cb.apply(_this, args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  }
}
export default function debounce(cb, immediate = false, delay = 100) {
  const _this = this;
  const args = arguments;

  var timer = null;

  return function() {
    if(immediate && !timer) cb.call(_this, args);
  }
}
export function autoscroll(config) {
  const { el, offset = 0, duration, timingFunction = 'linear'} = config;

  if(typeof el !== 'string') {
    return console.error('[Autoscroll Error]: el must be given and is a valid HTMLElement selector string.');
  }
  if(typeof duration !== 'number' || duration < 0) {
    return console.error('[Autoscroll Error]: duration must be given and is a non-negative number');
  }
  if(typeof offset !== 'number') {
    return console.error('[Autoscroll Error]: offset must be given and is a number.');
  }
  const timingFunctionOption = ['linear', 'ease-out', 'ease-in'];
  if(timingFunctionOption.indexOf(timingFunction) === -1) {
    return console.error(`[Autoscroll Error]: timingFunction must be either ${timingFunctionOption.slice(0, timingFunctionOption.length-1).join(', ')} or ${timingFunctionOption[timingFunctionOption.length-1]}.`);
  }

  const initialScrollTop = window.pageYOffset || 
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;

  const targetEl = document.querySelector(el);
  if(targetEl) {
    const targetScrollTop = targetEl.getBoundingClientRect().top + initialScrollTop + offset;
    const delta = targetScrollTop - initialScrollTop;
    let start;

    function scroll(timestamp) {
      if(start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      let currentScrollTop;

      if(duration === 0 || elapsed > duration) {
        return window.scrollTo(0, targetScrollTop);
      }

      switch(timingFunction) {
        case 'ease-out':
          currentScrollTop = initialScrollTop + delta * (1 - Math.pow(1 - elapsed / duration, 2));
          break;
          
        default: 
          currentScrollTop = initialScrollTop + delta * elapsed / duration;
          break;
      }

      window.scrollTo(0, parseInt(currentScrollTop));
      requestAnimationFrame(scroll);
    }

    requestAnimationFrame(scroll);
  } else {
    return console.error(`[Autoscroll Error]: Element given by selector 'el' is not found.`)
  }
}
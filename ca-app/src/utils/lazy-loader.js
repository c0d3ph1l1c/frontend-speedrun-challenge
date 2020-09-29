 class LazyLoader {
  constructor(props) {
    this.lazyLoadObjs = [];
    this.lazyLoad = this.lazyLoad.bind(this);
    window.addEventListener('scroll', this.lazyLoad);
  }

  lazyLoad() {
    const scrollTop = window.pageYOffset ||
                      document.documentElement.scrollTop ||
                      document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight ||
                         document.body.clientHeight;                         

    this.lazyLoadObjs.forEach(lazyLoadObj => {
      const { elem, srcAttr, loadedClass, thresholdOffsetFactor, callback } = lazyLoadObj;
      const elemTop = elem.getBoundingClientRect().top + scrollTop;
      const elemHeight = elem.getBoundingClientRect().height;

      document.title = `${scrollTop + clientHeight + thresholdOffsetFactor * elemHeight} ${elemTop}`

      // console.log({ bottom: scrollTop + clientHeight + thresholdOffsetFactor * elemHeight, elemTop});

      if(scrollTop + clientHeight + thresholdOffsetFactor * elemHeight > elemTop) {
        const dataSrc = elem.getAttribute(srcAttr);
        if(dataSrc) {
          elem.setAttribute('src', dataSrc);
        }
        elem.classList.add(loadedClass);
        callback && callback.call(elem, scrollTop);
        lazyLoadObj.loaded = true;
      }
    });

    let i = 0; 
    for(; i < this.lazyLoadObjs.length; i++) {
      if(this.lazyLoadObjs[i].loaded) {
        this.lazyLoadObjs.splice(i--, 1);
      }
    }
  }

  add(lazyLoadObj) {
    const { el, srcAttr = 'data-lazy-src', loadedClass = 'lazy-loaded', thresholdOffsetFactor = 0, callback } = lazyLoadObj;

    if(typeof el !== 'string') {
      return console.error('[LazyLoader Error]: el must be given and is a valid HTMLElement selector string.');
    }
    if(typeof srcAttr !== 'string' || !srcAttr.match(/^data-/)) {
      return console.error(`[LazyLoader Error]: srcAttr must be a string and begins with 'data-'.`);
    }
    if(typeof loadedClass !== 'string') {
      return console.error('[LazyLoader Error]: loadedClass must be a string.');
    }
    if(typeof thresholdOffsetFactor !== 'number') {
      return console.error('[LazyLoader Error]: thresholdOffsetFactor must be a number.');
    }
    if(typeof callback !== 'undefined' && typeof callback !== 'function') {
      return console.error('[LazyLoader Error]: callback must be a function.');
    }

    const targetEl = document.querySelector(el);
    if(!targetEl) { 
      return console.error(`[LazyLoader Error]: Element given by selector 'el' is not found.`)
    }

    lazyLoadObj.elem = targetEl;
    lazyLoadObj.srcAttr = srcAttr;
    lazyLoadObj.loadedClass = loadedClass;
    lazyLoadObj.thresholdOffsetFactor = thresholdOffsetFactor;

    this.lazyLoadObjs.push(lazyLoadObj);
    this.lazyLoad();
  }
};

const lazyLoader = new LazyLoader();

export { lazyLoader as LazyLoader };
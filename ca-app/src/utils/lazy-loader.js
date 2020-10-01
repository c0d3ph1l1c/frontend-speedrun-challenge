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
      const { elems, srcAttr, loadedClass, thresholdOffsetFactor, callback } = lazyLoadObj;

      !lazyLoadObj.loaded && (lazyLoadObj.loaded = new Array(lazyLoadObj.elems.length).fill(false));

      Array.prototype.forEach.call(elems, (elem, index) => {
        const elemTop = elem.getBoundingClientRect().top + scrollTop;
        const elemHeight = elem.getBoundingClientRect().height;
        
        if(scrollTop + clientHeight + thresholdOffsetFactor * elemHeight > elemTop && elemTop + elemHeight > scrollTop) {
          const dataSrc = elem.getAttribute(srcAttr);
          if(dataSrc) {
            elem.setAttribute('src', dataSrc);
          }
          elem.classList.add(loadedClass);
          callback && callback.call(elem, scrollTop);
          lazyLoadObj.loaded[index] = true;
        }
      });
    });

    let i = 0; 
    for(; i < this.lazyLoadObjs.length; i++) {
      if(this.lazyLoadObjs[i].loaded && this.lazyLoadObjs[i].loaded.length === this.lazyLoadObjs[i].elems.length && this.lazyLoadObjs[i].loaded.every(flag => flag)) {
        this.lazyLoadObjs.splice(i--, 1);
      }
    }
  }

  add(lazyLoadObj) {
    const { el, srcAttr = 'data-lazy-src', loadedClass = 'lazy-loaded', thresholdOffsetFactor = 0, callback } = lazyLoadObj;

    if(typeof el !== 'string' && 
       !(el && el.nodeType === 1) && 
       !(typeof el[Symbol.iterator] == 'function' && 
         Array.prototype.every.call(el, el => !(el && el.nodeType === 1)))) {
      return console.error('[LazyLoader Error]: el must be given and is either a valid DOM string, element node, or iterable collection of element nodes');
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

    let targetElems;
    if(typeof el === 'string') {
      targetElems = document.querySelectorAll(el);
      if(!targetElems) { 
        return console.error(`[LazyLoader Error]: Element given by selector 'el' is not found.`)
      }
    } else {
      if(!!(el && el.nodeType === 1)) {
        targetElems = [el];
      } else {
        targetElems = el;
      }
    }
    
    lazyLoadObj.elems = targetElems;
    lazyLoadObj.srcAttr = srcAttr;
    lazyLoadObj.loadedClass = loadedClass;
    lazyLoadObj.thresholdOffsetFactor = thresholdOffsetFactor;

    this.lazyLoadObjs.push(lazyLoadObj);
    this.lazyLoad();
  }
};

const lazyLoader = new LazyLoader();

export { lazyLoader as LazyLoader };
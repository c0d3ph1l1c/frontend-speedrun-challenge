import React, { Component } from 'react';
import '../../static/css/components/shared/carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    let { startIndex } = this.props;

    this.carouselRef = React.createRef();

    // Set default values if not specified
    this.activeEnlargeFactor = this.props.activeEnlargeFactor? this.props.activeEnlargeFactor : 1;
    this.itemMargin = this.props.margin? this.props.margin : 30;
    this.interval = this.props.interval? this.props.interval : 3000;
    this.transitionDuration = this.props.transitionDuration? this.props.transitionDuration : 500;
    this.forAdjacentTransition = this.props.forAdjacentTransition !== 'undefined'
                                  ? this.props.forAdjacentTransition 
                                  : false;
    this.numberOfItemsMoved = 1;

    this.itemsArr = this.computeItemArr(this.props);
    this.state = {
      innerWidth: 'auto',
      itemWidth: 'auto',
      activeIndex: this.itemsArr.findIndex(item => item.index === startIndex && !item.clone),
      innerTranslate: 0,
      transition: `transform ${this.transitionDuration}ms ease`,
      cursor: 'auto'
    };
  }

  computeItemArr = props => {
    const { interval, transitionDuration } = this;
    let { items, visibleCount, startIndex } = props;

    if(Math.abs(interval - transitionDuration) < 100) {
      throw new Error(`Carousel Error: interval and transitionDuration has to be at least 100ms apart`);
    }
    if (visibleCount % 2 === 0) {
      throw new Error(`Carousel Error: visibleCount must not odd number`);
    }
    if (visibleCount > items.length) {
      throw new Error(`Carousel Error: visibleCount must not be larger than items.length`);
    }
    if (startIndex < 0 || startIndex >= items.length) {
      throw new Error(`Carousel Error: startIndex must be between 0 and items.length (inclusive)`);
    }

    items = [...items];
    const visibleLeftEndIdx = startIndex - parseInt(visibleCount / 2);
    if (visibleLeftEndIdx < 0) {
      items.unshift(...items.splice(visibleLeftEndIdx));
    } else {
      items.push(...items.splice(0, visibleLeftEndIdx));
    }

    const leftClone = items.slice(-visibleCount).map(item => ({ clone: 'true', ...item }));
    const rightClone = items.slice(0, visibleCount).map(item => ({ clone: 'true', ...item }));
    return [...leftClone, ...items, ...rightClone];
  }

  computeTranslate = index => {
    const { visibleCount } = this.props;
    return (index - parseInt(visibleCount / 2)) * (this.itemWidth + this.itemMargin * 2);
  }

  setCarouselTimer = () => {
    return setInterval(() => {
      // const { activeIndex } = this.state;
      // const newActiveIndex = activeIndex + 1;

      // this.setState(prevState => ({
      //   activeIndex: newActiveIndex,
      //   innerTranslate: this.computeTranslate(newActiveIndex)
      // }));
      const { activeIndex } = this.state;
      const { items, visibleCount } = this.props;
      let newActiveIndex = activeIndex + 1;
      this.afterRollback = false;
      if(newActiveIndex >= visibleCount + items.length) {
        newActiveIndex = activeIndex - items.length;
        this.afterRollback = true;
      }

      this.setState(prevState => ({
        activeIndex: newActiveIndex,
        innerTranslate: this.computeTranslate(newActiveIndex),
        transition: this.afterRollback? 'none' : prevState.transition
      }));
    }, this.interval);
  }

  handleIndicatorClick = e => {
    clearInterval(this.movementTimer);
    clearTimeout(this.transitionTimer);
    this.movementTimer = null;
    const { itemsArr, forAdjacentTransition } = this;
    const { items } = this.props;
    const { activeIndex } = this.state;
    const actualCurrIndex = itemsArr[activeIndex].index;
    const indicatorIndex = parseInt(e.target.dataset.index);
    const offset = indicatorIndex - actualCurrIndex;
    let newActiveIndex = 0;
    if(Math.abs(offset) < Math.abs(offset + (offset >= 0? -items.length : items.length))) {
      newActiveIndex = activeIndex + offset;
    } else {
      newActiveIndex = activeIndex + offset + (offset >= 0? -items.length : items.length);
    }
    if(forAdjacentTransition) {
      this.numberOfItemsMoved = Math.abs(newActiveIndex - activeIndex);
      this.setState(prevState => ({
        activeIndex: newActiveIndex,
        innerTranslate: this.computeTranslate(newActiveIndex),
        transition: `transform ${this.transitionDuration * this.numberOfItemsMoved}ms ease`
      }));
    } else {
      this.setState(prevState => ({
        activeIndex: newActiveIndex,
        innerTranslate: this.computeTranslate(newActiveIndex)
      }));
    }
  }

  handleCarouselMouseDown = () => {
    console.log('mouse down');
    this.setState({
      cursor: 'grab'
    });
  }

  handleCarouselMouseMove = () => {
    console.log('mouse move');
  }

  handleCarouselMouseUp = () => {
    console.log('mouse up');
    this.setState({
      cursor: 'auto'
    });
  }

  componentDidMount() {
    const { activeEnlargeFactor } = this;
    const { visibleCount } = this.props;
    const { activeIndex } = this.state;

    // calculate & set item width
    const carouselWidth = parseInt(getComputedStyle(this.carouselRef.current, null)['width']);
    this.itemWidth = parseInt((carouselWidth - visibleCount * this.itemMargin * 2) / (visibleCount + activeEnlargeFactor - 1));
    const innerWidth = this.itemsArr.length * this.itemWidth;
    const innerTranslate = this.computeTranslate(activeIndex);
    this.setState({
      innerWidth,
      itemWidth: this.itemWidth,
      innerTranslate
    });

    // initiate carousel movement timer
    this.movementTimer = this.setCarouselTimer();
  }

  componentDidUpdate() {   
    const { transitionDuration } = this;
    const { items, visibleCount } = this.props;
    const { activeIndex, transition } = this.state;

    let newActiveIndex = 0,
        isBeyondVisibleRange = false;

    if(this.afterRollback) {
      newActiveIndex = activeIndex + 1;
      setTimeout(() => {
        this.setState({
          activeIndex: newActiveIndex,
          innerTranslate: this.computeTranslate(newActiveIndex),
          transition: `transform ${transitionDuration}ms ease`
        });
      }, 20); 
      this.afterRollback = false;
      return;
    }
        
    if(activeIndex < visibleCount) {
      // set index to visible counterpart
      newActiveIndex = activeIndex + items.length;
      isBeyondVisibleRange = true;
    } else if (activeIndex >= visibleCount + items.length) {
      // set index to visible counterpart
      newActiveIndex = activeIndex - items.length;
      isBeyondVisibleRange = true;
    } else {
      this.numberOfItemsMoved = 1;

      // restore movement timer
      if(!this.movementTimer) {
        this.movementTimer = this.setCarouselTimer();
      }

      // restore transition style
      if(transition !== `transform ${transitionDuration}ms ease`) {
        this.transitionTimer = setTimeout(() => {
          this.setState({
            transition: `transform ${transitionDuration}ms ease`
          });
        }, 20); 
        return;
      }
    }
    
    // if beyond visible range, translate to visible counterpart without transition
    if(isBeyondVisibleRange) {
      this.transitionTimer = setTimeout(() => {
        this.setState({
          activeIndex: newActiveIndex,
          innerTranslate: this.computeTranslate(newActiveIndex),
          transition: 'none'
        });
      }, transitionDuration * this.numberOfItemsMoved); 
    } 
  }

  componentWillUnmount() {
    // clear carousel movement timer
    clearInterval(this.movementTimer);
  }

  render() {
    const { carouselRef, activeEnlargeFactor, itemMargin, itemsArr } = this;
    const { items } = this.props;
    const { innerWidth, itemWidth, activeIndex, innerTranslate, transition, cursor } = this.state;

    console.log(this.state.activeIndex);

    return (
      <div 
        className="carousel" 
        ref={carouselRef}
      >
        <ul 
          className="carousel-inner"
          style={{
            width: innerWidth,
            transform: `translateX(-${innerTranslate}px)`,
            transition,
            cursor
          }}
          onMouseDown={ this.handleCarouselMouseDown }
          onMouseMove={ this.handleCarouselMouseMove }
          onMouseUp={ this.handleCarouselMouseUp }
        >
          { 
            itemsArr.map((item, index) => (
              <li 
                className={`carousel-item${item.clone? ' clone' : ''}${index === activeIndex? ' active' : ''}`}   
                key={index}
                style={{ margin: `0 ${itemMargin}px` }}
              >
                <img 
                  src={item.imgUrl} 
                  style={{ 
                    width: itemWidth === 'auto'
                            ? itemWidth 
                            : index === activeIndex 
                            ? `${activeEnlargeFactor * itemWidth}px` 
                            : `${itemWidth}px`
                  }}
                  alt={item.imgAlt} 
                />
              </li>
            ))
          }
        </ul>
        <ul className="carousel-indicators">
          { 
            items.map((item, index) => (
              <li 
                className={ `carousel-indicator${index === itemsArr[activeIndex].index? ' active' : ''}` }
                key={ index }
                onClick={ this.handleIndicatorClick }
                data-index={ index }
              >
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Carousel;
import React, { Component } from 'react';
import '../../static/css/components/shared/carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    let { startActiveIndex } = this.props;

    this.carouselRef = React.createRef();

    // Set default values if not specified
    this.activeEnlargeFactor = this.props.activeEnlargeFactor? this.props.activeEnlargeFactor : 1;
    this.slideMargin = this.props.margin? this.props.margin : 30;
    this.interval = this.props.interval? this.props.interval : 3000;
    this.transitionDuration = this.props.transitionDuration? this.props.transitionDuration : 500;
    this.singleSlideTransition = this.props.singleSlideTransition !== 'undefined'
                                  ? this.props.singleSlideTransition 
                                  : false;
    this.slidesMoved = 0;

    this.slidesArr = this.computeSlidesArr(this.props);
    this.state = {
      innerWidth: 'auto',
      slideWidth: 'auto',
      activeIndex: this.slidesArr.findIndex(slide => slide.index === startActiveIndex && !slide.clone),
      innerTranslate: 0,
      transition: `transform ${this.transitionDuration}ms ease`,
      cursor: 'auto'
    };
  }

  computeSlidesArr = props => {
    const { interval, transitionDuration } = this;
    let { slides, slidesPerView, startActiveIndex } = props;

    if(Math.abs(interval - transitionDuration) < 100) {
      throw new Error(`Carousel Error: interval and transitionDuration has to be at least 100ms apart`);
    }
    if (slidesPerView % 2 === 0) {
      throw new Error(`Carousel Error: slidesPerView must not odd number`);
    }
    if (slidesPerView > slides.length) {
      throw new Error(`Carousel Error: slidesPerView must not be larger than slides.length`);
    }
    if (startActiveIndex < 0 || startActiveIndex >= slides.length) {
      throw new Error(`Carousel Error: startActiveIndex must be between 0 and slides.length (inclusive)`);
    }

    slides = [...slides];
    const visibleLeftEndIdx = startActiveIndex - parseInt(slidesPerView / 2);
    if (visibleLeftEndIdx < 0) {
      slides.unshift(...slides.splice(visibleLeftEndIdx));
    } else {
      slides.push(...slides.splice(0, visibleLeftEndIdx));
    }

    const leftClone = slides.slice(-slidesPerView).map(slide => ({ clone: 'true', ...slide }));
    const rightClone = slides.slice(0, slidesPerView).map(slide => ({ clone: 'true', ...slide }));
    return [...leftClone, ...slides, ...rightClone];
  }

  computeTranslate = activeIndex => {
    const { slidesPerView } = this.props;
    return (activeIndex - parseInt(slidesPerView / 2)) * (this.slideWidth + this.slideMargin * 2);
  }

  computeOppositeOffset = offset => {
    const { slides } = this.props;
    return offset + (offset >= 0? -slides.length : slides.length);
  }

  setAutoplayTimer = () => {
    return setInterval(() => {
      const { computeTranslate } = this;
      const { activeIndex } = this.state;
      const { slides, slidesPerView } = this.props;

      let newActiveIndex = activeIndex + 1,
          isRollingBack =  false;
      // abrupt rollback first if new slides lies beyond visible range
      if(newActiveIndex >= slidesPerView + slides.length) {
        newActiveIndex = activeIndex - slides.length;
        isRollingBack = true;
        this.slidesMoved = 1;
      }

      this.setState(prevState => ({
        activeIndex: newActiveIndex,
        innerTranslate: computeTranslate(newActiveIndex),
        transition: isRollingBack? 'none' : prevState.transition
      }));
    }, this.interval);
  }

  handlePaginationClick = e => {
    const { slidesArr, singleSlideTransition, transitionDuration, computeTranslate, computeOppositeOffset } = this;
    const { slides, slidesPerView } = this.props;
    const { activeIndex } = this.state;
    const paginationIndex = parseInt(e.target.dataset.index);
    const currIndex = slidesArr[activeIndex].index;

    // do nothing if same index
    const offset = paginationIndex - currIndex;
    if(!offset) return;

    // clear all timer
    clearInterval(this.autoplayTimer);
    clearTimeout(this.transitionTimer);
    this.autoplayTimer = null;

    // Pick direction with the least offset
    let newActiveIndex = 0,
        oppositeOffset = computeOppositeOffset(offset);
    if(Math.abs(offset) <= Math.abs(oppositeOffset)) {
      newActiveIndex = activeIndex + offset;
      this.slidesMoved = offset;
    } else {
      newActiveIndex = activeIndex + oppositeOffset;
      this.slidesMoved = oppositeOffset;
    }

    // abrupt rollback first if new slides lies beyond visible range
    let isRollingBack = false;
    if(newActiveIndex < slidesPerView) {
      newActiveIndex = activeIndex + slides.length;
      isRollingBack = true;
    } else if(newActiveIndex > slidesPerView + slides.length) {
      newActiveIndex = activeIndex - slides.length;
      isRollingBack = true;
    }

    this.setState(prevState => ({
      activeIndex: newActiveIndex,
      innerTranslate: computeTranslate(newActiveIndex),
      transition: isRollingBack
                  ? 'none' 
                  : singleSlideTransition
                  ? `transform ${transitionDuration * Math.abs(this.slidesMoved)}ms ease` 
                  : prevState.transition
    }));
  }

  handleSlidesMouseDown = () => {
    console.log('mouse down');
    this.setState({
      cursor: 'grab'
    });
  }

  handleSlidesMouseMove = () => {
    console.log('mouse move');
  }

  handleSlidesMouseUp = () => {
    console.log('mouse up');
    this.setState({
      cursor: 'auto'
    });
  }

  componentDidMount() {
    const { slidesArr, slideMargin, activeEnlargeFactor } = this;
    const { slidesPerView } = this.props;
    const { activeIndex } = this.state;

    // calculate & set slide width
    const carouselWidth = parseInt(getComputedStyle(this.carouselRef.current, null)['width']);
    this.slideWidth = parseInt((carouselWidth - slidesPerView * slideMargin * 2) / (slidesPerView + activeEnlargeFactor - 1));
    const innerWidth = (slidesArr.length - 1) * (this.slideWidth + 2 * slideMargin) + parseInt(this.slideWidth * activeEnlargeFactor) + 2 * slideMargin;
    const innerTranslate = this.computeTranslate(activeIndex);
    this.setState({
      innerWidth,
      slideWidth: this.slideWidth,
      innerTranslate
    });

    // initiate carousel movement timer
    this.autoplayTimer = this.setAutoplayTimer();
  }

  componentDidUpdate() {   
    const { transitionDuration, computeTranslate, slidesMoved } = this;
    const { activeIndex, transition } = this.state;

    if(transition === 'none') {
      // move slides after abrupt rollback
      let newActiveIndex = activeIndex + slidesMoved;
      this.transitionTimer = setTimeout(() => {
        this.setState({
          activeIndex: newActiveIndex,
          innerTranslate: computeTranslate(newActiveIndex),
          transition: `transform ${transitionDuration * Math.abs(slidesMoved)}ms ease`
        });
      }, 20); 
      return;
    }
    
    if(slidesMoved) {
      this.transitionTimer = setTimeout(() => {
        // restore autoplay timer
        if(!this.autoplayTimer) {
          this.autoplayTimer = this.setAutoplayTimer();
        }
        
        // restore transition style
        if(transition !== `transform ${transitionDuration}ms ease`) {
          this.setState({
            transition: `transform ${transitionDuration}ms ease`
          });
        }
        
        // reset slidesMoved
        this.slidesMoved = 0;
      }, transitionDuration * Math.abs(slidesMoved)); 
    }
  }

  componentWillUnmount() {
    // clear carousel autoplay timer
    clearInterval(this.autoplayTimer);
  }

  render() {
    const { carouselRef, activeEnlargeFactor, slideMargin, slidesArr } = this;
    const { slides } = this.props;
    const { innerWidth, slideWidth, activeIndex, innerTranslate, transition, cursor } = this.state;

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
          onMouseDown={ this.handleSlidesMouseDown }
          onMouseMove={ this.handleSlidesMouseMove }
          onMouseUp={ this.handleSlidesMouseUp }
        >
          { 
            slidesArr.map((slide, index) => (
              <li 
                className={`carousel-slide${slide.clone? ' clone' : ''}${index === activeIndex? ' active' : ''}`}   
                key={index}
                style={{ margin: `0 ${slideMargin}px` }}
              >
                <img 
                  src={slide.imgUrl} 
                  style={{ 
                    width: slideWidth === 'auto'
                            ? slideWidth 
                            : index === activeIndex 
                            ? `${parseInt(activeEnlargeFactor * slideWidth)}px` 
                            : `${slideWidth}px`
                  }}
                  alt={slide.imgAlt} 
                />
              </li>
            ))
          }
        </ul>
        <ul className="carousel-paginations">
          { 
            slides.map((slide, index) => (
              <li 
                className={ `carousel-pagination${index === slidesArr[activeIndex].index? ' active' : ''}` }
                key={ index }
                onClick={ this.handlePaginationClick }
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
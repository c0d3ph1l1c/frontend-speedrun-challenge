import React, { Component } from 'react';
import '../../static/css/components/shared/carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    let { startActiveIndex, transitionDuration } = this.props;

    this.carouselRef = React.createRef();

    this.slidesArr = this.computeSlidesArr(this.props);
    this.state = {
      innerWidth: 'auto',
      slideWidth: 'auto',
      activeIndex: this.slidesArr.findIndex(slide => slide.index === startActiveIndex && !slide.clone),
      innerTranslate: 0,
      transition: `transform ${transitionDuration}ms ease`,
      cursor: 'auto'
    };
  }

  computeSlidesArr = props => {
    let { interval, slides, slidesPerView, startActiveIndex, transitionDuration } = props;

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

  computeTranslate = (activeIndex, slideWidth) => {
    const { spaceBetween, slidesPerView } = this.props;
    return (activeIndex - parseInt(slidesPerView / 2)) * (slideWidth + spaceBetween * 2);
  }

  computeOppositeOffset = offset => {
    const { slides } = this.props;
    return offset + (offset >= 0? -slides.length : slides.length);
  }

  setSlideWidth = () => {
    const { computeTranslate, slidesArr } = this;
    const { activeEnlargeFactor, spaceBetween, slidesPerView } = this.props;
    const { activeIndex } = this.state;

    console.log(slidesPerView);

    // calculate & set slide width
    const carouselWidth = parseInt(
      getComputedStyle(this.carouselRef.current, null)["width"]
    );
    const slideWidth = parseInt(
      (carouselWidth - slidesPerView * spaceBetween * 2) /
        (slidesPerView + activeEnlargeFactor - 1)
    );
    const innerWidth =
      (slidesArr.length - 1) * (slideWidth + 2 * spaceBetween) +
      parseInt(slideWidth * activeEnlargeFactor) +
      2 * spaceBetween;
    const innerTranslate = computeTranslate(activeIndex, slideWidth);
    this.setState({
      innerWidth,
      slideWidth,
      innerTranslate,
    });
  }

  go = offset => {
    const { computeTranslate } = this;
    const { slides, slidesPerView, transitionDuration } = this.props;
    const { activeIndex, slideWidth } = this.state;

    let newActiveIndex = activeIndex + offset,
        isRollingBack =  false;
    // abrupt rollback first if new active slides lies beyond visible range
    if(newActiveIndex < slidesPerView) {
      newActiveIndex = activeIndex + slides.length;
      isRollingBack = true;
    } else if(newActiveIndex >= slidesPerView + slides.length) {
      newActiveIndex = activeIndex - slides.length;
      isRollingBack = true;
    }
    this.slidesMoved = offset;

    this.setState(prevState => ({
      activeIndex: newActiveIndex,
      innerTranslate: computeTranslate(newActiveIndex, slideWidth),
      transition: isRollingBack? 'none' : `transform ${transitionDuration}ms ease`
    }));
  }

  navigate = offset => {
    const { go } = this;
    const _this = this;
    const { transitionDuration } = this.props;
    let locked = false;

    return function() {
      if(!locked) {
        locked = true;
        clearInterval(_this.autoplayTimer);
        _this.autoplayTimer = null;
        go(offset);
        setTimeout(() => {
          locked = false;
        }, transitionDuration * Math.abs(offset));
      }
    }
  }

  prevSlide = this.navigate(-1);
  nextSlide = this.navigate(1);

  setAutoplayTimer = () => {
    const { go } = this;
    const { interval } = this.props;
    
    return setInterval(() => go(1), interval);
  }

  handlePaginationClick = e => {
    const { computeOppositeOffset, computeTranslate, slidesArr } = this;
    const { singleSlideTransition, slides, slidesPerView, transitionDuration } = this.props;
    const { activeIndex, slideWidth } = this.state;
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
    } else if(newActiveIndex >= slidesPerView + slides.length) {
      newActiveIndex = activeIndex - slides.length;
      isRollingBack = true;
    }

    this.setState(prevState => ({
      activeIndex: newActiveIndex,
      innerTranslate: computeTranslate(newActiveIndex, slideWidth),
      transition: isRollingBack
                    ? 'none' 
                    : singleSlideTransition
                    ? `transform ${transitionDuration * Math.abs(this.slidesMoved)}ms ease` 
                    : prevState.transition
    }));
  }

  handleSlidesMouseDown = e => {
    clearInterval(this.autoplayTimer);
    this.autoplayTimer = null;
    this.mouseDown = true;
    this.lastMousePosX = e.clientX;
    this.setState({
      cursor: 'grab'
    });
  }

  handleSlidesMouseMove = e => {
    if(this.mouseDown) {
      const { activeEnlargeFactor, slides, spaceBetween, slidesPerView } = this.props;
      let { activeIndex, innerTranslate, slideWidth } = this.state;
      this.offsetX = this.lastMousePosX - e.clientX;

      const visibleLimit = {
        left: activeIndex < slidesPerView
                ? spaceBetween * 2 * slidesPerView + slideWidth * (slidesPerView + activeEnlargeFactor - 1)
                : (spaceBetween * 2 + slideWidth) * slidesPerView,
        right: activeIndex > slidesPerView + slides.length
                ? spaceBetween * 2 * (slidesPerView + slides.length) + slideWidth * (slidesPerView + slides.length + activeEnlargeFactor - 1)
                : (spaceBetween * 2 + slideWidth) * (slidesPerView + slides.length)
      };

      innerTranslate += this.offsetX;
      if(innerTranslate < visibleLimit.left) {
        innerTranslate += visibleLimit.right - visibleLimit.left;
      } else if(innerTranslate > visibleLimit.right) {
        innerTranslate -= visibleLimit.right - visibleLimit.left;
      }
      
      this.setState(prevState => ({
        innerTranslate,
        transition: 'none'
      }));
      this.lastMousePosX = e.clientX;
    }
  }

  handleSlidesMouseUp = () => {
    if(this.mouseDown) {
      const { autoplayTimer, computeTranslate, setAutoplayTimer } = this;
      const { spaceBetween, slidesPerView, pickAdjacentAfterDrag, transitionDuration } = this.props;
      const { innerTranslate, slideWidth } = this.state;

      let activeIndex = 0;
      if(pickAdjacentAfterDrag) {
        activeIndex = parseInt(innerTranslate / (slideWidth + 2 * spaceBetween)) + parseInt(slidesPerView / 2) + (this.offsetX > 0? 1 : 0);
      } else {
        const r = innerTranslate / (slideWidth + 2 * spaceBetween);
        activeIndex = (r % 1 > 0.5? parseInt(r) + 1 : parseInt(r)) + parseInt(slidesPerView / 2);
      }

      this.setState({
        activeIndex,
        innerTranslate: computeTranslate(activeIndex, slideWidth),
        transition: `transform ${transitionDuration}ms ease`,
        cursor: 'auto'
      });

      if(!autoplayTimer) {
        this.autoplayTimer = setAutoplayTimer();
      }
      this.mouseDown = false;
    }
  }

  componentDidMount() {
    const { setAutoplayTimer, setSlideWidth } = this;

    setSlideWidth();

    window.addEventListener('resize', setSlideWidth);

    // initiate carousel movement timer
    this.autoplayTimer = setAutoplayTimer();
  }

  componentDidUpdate() {   
    const { computeTranslate, slidesArr, slidesMoved, setAutoplayTimer } = this;
    const { transitionDuration, onSlideChange } = this.props;
    const { activeIndex, slideWidth, transition } = this.state;

    if(transition === 'none' && slidesMoved) {
      // move slides after abrupt rollback
      let newActiveIndex = activeIndex + slidesMoved;
      this.transitionTimer = setTimeout(() => {
        this.setState({
          activeIndex: newActiveIndex,
          innerTranslate: computeTranslate(newActiveIndex, slideWidth),
          transition: `transform ${transitionDuration * Math.abs(slidesMoved)}ms ease`
        });
      }, 20); 
      return;
    }
    
    if(slidesMoved) {
      this.transitionTimer = setTimeout(() => {
        // restore autoplay timer
        if(!this.autoplayTimer) {
          this.autoplayTimer = setAutoplayTimer();
        }
        
        // reset slidesMoved
        this.slidesMoved = 0;
      }, transitionDuration * Math.abs(slidesMoved)); 
    }

    onSlideChange && onSlideChange(slidesArr[activeIndex].index);
  }

  componentWillUnmount() {
    // clear carousel autoplay timer
    clearInterval(this.autoplayTimer);
  }

  render() {
    const { carouselRef, nextSlide, prevSlide, slidesArr } = this;
    const { activeEnlargeFactor, slides, spaceBetween, navigation: { prev, next, prevClass, nextClass} } = this.props;
    const { innerWidth, slideWidth, activeIndex, innerTranslate, transition, cursor } = this.state;

    return (
      <div className="carousel" ref={ carouselRef }>
        <div className="carousel-upper-container">
          {
            prev && (
              <span
                className={`swiper-prev-btn${' ' + prevClass}`}
                onClick={ prevSlide }
              >
                { !prevClass && '<' }
              </span>
            )
          }
          <div className="carousel-inner-wrapper">
            <ul
              className="carousel-inner"
              style={{
                width: innerWidth,
                transform: `translateX(-${innerTranslate}px)`,
                transition,
                cursor,
              }}
              onMouseDown={this.handleSlidesMouseDown}
              onMouseMove={this.handleSlidesMouseMove}
              onMouseUp={this.handleSlidesMouseUp}
            >
              {slidesArr.map((slide, index) => (
                <li
                  className={`carousel-slide${slide.clone ? " clone" : ""}${
                    index === activeIndex ? " active" : ""
                  }`}
                  key={index}
                  style={{ margin: `0 ${spaceBetween}px` }}
                >
                  <img
                    src={slide.imgUrl}
                    style={{
                      width:
                        slideWidth === "auto"
                          ? slideWidth
                          : index === activeIndex
                          ? `${parseInt(activeEnlargeFactor * slideWidth)}px`
                          : `${slideWidth}px`,
                    }}
                    alt={slide.imgAlt}
                  />
                </li>
              ))}
            </ul>
          </div>
          {
            next && (
              <span
                className={`swiper-next-btn${' ' + nextClass}`}
                onClick={ nextSlide }
              >
                {!nextClass && '>'}
              </span>
            )
          }
        </div>
        <ul className="carousel-paginations">
          {slides.map((slide, index) => (
            <li
              className={`carousel-pagination${
                index === slidesArr[activeIndex].index ? " active" : ""
              }`}
              key={index}
              onClick={this.handlePaginationClick}
              data-index={index}
            ></li>
          ))}
        </ul>
      </div>
    );
  }
}

Carousel.defaultProps = {
  slidesPerView: 1,
  startActiveIndex: 0,
  activeEnlargeFactor: 1,
  spaceBetween: 30,
  interval: 3000,
  transitionDuration: 500,
  singleSlideTransition: false,
  pickAdjacentAfterDrag: false,
  navigation: {}
};

export default Carousel;
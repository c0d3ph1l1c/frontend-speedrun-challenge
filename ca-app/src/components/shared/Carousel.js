import React, { Component } from 'react';
import '../../static/css/components/shared/carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    let { startIndex } = this.props;

    this.carouselRef = React.createRef();
    this.itemMargin = this.props.margin ? this.props.margin : 30;
    this.items = this.computeItemArr(this.props);
    this.state = {
      itemWidth: 'auto',
      activeIndex: this.items.findIndex(item => item.index === startIndex && !item.clone),
      innerTranslate: 0
    };
  }

  computeItemArr = props => {
    let { items, visibleCount, startIndex } = props;

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

  componentDidMount() {
    const { visibleCount, activeEnlargeFactor = 1 } = this.props;
    const { activeIndex } = this.state;

    const carouselWidth = parseInt(getComputedStyle(this.carouselRef.current, null)['width']);
    const itemWidth = parseInt((carouselWidth - visibleCount * this.itemMargin * 2) / (visibleCount + activeEnlargeFactor - 1));
    const innerTranslate = (activeIndex - parseInt(visibleCount / 2)) * (itemWidth + this.itemMargin * 2);
    this.setState({
      itemWidth,
      innerTranslate
    });
  }

  render() {
    const { itemWidth, activeIndex, innerTranslate, carouselPadding } = this.state;

    return (
      <div 
        className="carousel" 
        ref={this.carouselRef}
      >
        <ul 
          className="carousel-inner"
          style={{
            transform: `translateX(-${innerTranslate}px)`
          }}
        >
          { this.items.map((item, index) => (
            <li 
              className={`carousel-item${item.clone? ' clone' : ''}${index === activeIndex? ' active' : ''}`}   
              key={index}
              style={{
                margin: `0 ${this.itemMargin}px`
              }}
            >
              <img 
                src={item.imgUrl} 
                style={{ 
                  width: itemWidth === 'auto'
                          ? itemWidth 
                          : index === activeIndex 
                          ? `${1.2 * itemWidth}px` 
                          : `${itemWidth}px`
                }}
                alt={item.imgAlt} 
              />
            </li>
          ))}
        </ul>
        <ul className="carousel-indicators">
          
        </ul>
      </div>
    );
  }
}

export default Carousel;
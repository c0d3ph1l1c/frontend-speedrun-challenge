import React, { Component } from 'react';
import '../../static/css/components/shared/carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    
    const { items, visibleCount, startIndex } = this.props;

    if(visibleCount % 2 === 0) {
      throw new Error(`Carousel Error: visibleCount must not odd number`);
    }
    if(visibleCount > items.length) {
      throw new Error(`Carousel Error: visibleCount must not be larger than items.length`);
    }
    if(startIndex < 0 || startIndex >= items.length) {
      throw new Error(`Carousel Error: startIndex must be between 0 and items.length (inclusive)`);
    }

    this.items = [...items];
    const visibleLeftEndIdx = startIndex - parseInt(visibleCount/2);
    if(visibleLeftEndIdx < 0) {
      this.items.unshift(...this.items.splice(visibleLeftEndIdx));
    } else {
      this.items.push(...this.items.splice(0, visibleLeftEndIdx));
    }

    const leftClone = this.items.slice(-visibleCount).map(item => ({ clone: 'true', ...item }));
    const rightClone = this.items.slice(0, visibleCount).map(item => ({ clone: 'true', ...item }));
    this.items = [...leftClone, ...this.items, ...rightClone];
    console.log(this.items);
  }

  render() {
    const { startIndex } = this.props;

    return (
      <div className="carousel">
        <ul className="carousel-inner">
          { this.items.map((item, index) => (
            <li 
              className={`carousel-item${item.clone? ' clone' : ''}${item.index === startIndex && !item.clone? ' active' : ''}`}   
              key={index}
            >
              <img src={item.imgUrl} alt={item.imgAlt} />
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
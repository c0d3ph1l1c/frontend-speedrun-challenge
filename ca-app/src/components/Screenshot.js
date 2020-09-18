import React, { Component } from 'react';
import Carousel from './shared/Carousel';
import '../static/css/components/screenshot.scss';
import App1Img from '../static/images/app-1.jpg';
import App2Img from '../static/images/app-2.jpg';
import App3Img from '../static/images/app-3.jpg';
import App4Img from '../static/images/app-4.jpg';
import App5Img from '../static/images/app-5.jpg';

const appArr = [
  { id: 0, imgUrl: App1Img, imgAlt: 'App 1' },
  { id: 1, imgUrl: App2Img, imgAlt: 'App 2' },
  { id: 2, imgUrl: App3Img, imgAlt: 'App 3' },
  { id: 3, imgUrl: App4Img, imgAlt: 'App 4' },
  { id: 4, imgUrl: App5Img, imgAlt: 'App 5' },
  { id: 5, imgUrl: App3Img, imgAlt: 'App 6' }
];

class Screenshot extends Component {
  constructor(props) {
    super(props);
    let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let slidePerView = clientWidth >= 992 ? 5 : clientWidth >= 480 ? 3 : 1;
    let spaceBetween = clientWidth >= 1200 ? 30 : 22;

    this.state = {
      slidePerView,
      spaceBetween
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
        let slidePerView = clientWidth >= 992 ? 5 : (clientWidth >= 480 ? 3 : 1);
        let spaceBetween = clientWidth >= 1200 ? 30 : 25;

      this.setState({
        slidePerView,
        spaceBetween
      });
    });
  }

  render() {
    const { slidePerView, spaceBetween } = this.state;

    return (
      <div className="screenshot">
        <h3>App Screenshots</h3>
        <Carousel 
          slides={ appArr } 
          slidesPerView={ slidePerView } 
          spaceBetween={ spaceBetween }
          initialCenterSlideId={ 0 }
          activeEnlargeFactor={ 1.2 }
          interval={ 5000 }
          transitionDuration={ 1000 }
          singleSlideTransition={ true }
          pickAdjacentAfterDrag={ true }
        />
      </div>
    );
  }
}

export default Screenshot;
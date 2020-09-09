import React, { Component } from 'react';
import Carousel from './shared/Carousel';
import '../static/css/components/screenshot.scss';
import App1Img from '../static/images/app-1.jpg';
import App2Img from '../static/images/app-2.jpg';
import App3Img from '../static/images/app-3.jpg';
import App4Img from '../static/images/app-4.jpg';
import App5Img from '../static/images/app-5.jpg';

const appArr = [
  { index: 0, imgUrl: App1Img, imgAlt: 'App 1' },
  { index: 1, imgUrl: App2Img, imgAlt: 'App 2'  },
  { index: 2, imgUrl: App3Img, imgAlt: 'App 3'  },
  { index: 3, imgUrl: App4Img, imgAlt: 'App 4'  },
  { index: 4, imgUrl: App5Img, imgAlt: 'App 5'  },
  { index: 5, imgUrl: App3Img, imgAlt: 'App 6'  }
];

class Screenshot extends Component {
  render() {
    return (
      <div className="screenshot">
        <h3>App Screenshots</h3>
        <Carousel 
          items={appArr} 
          visibleCount={5} 
          startIndex={0}
          activeEnlargeFactor={1.2}
        />
      </div>
    );
  }
}

export default Screenshot;
import React, { Component } from 'react';
import { LazyLoader } from '../utils/index';
import '../static/css/components/banner.scss';
import BannerImg from '../static/images/welcome-img.png';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    const img = this.imgRef.current;
    if(img.complete && img.naturalHeight !== 0) {
      LazyLoader.add({
        el: img,
      });
    } else {
      img.onload = function() {
        LazyLoader.add({
          el: img,
        });
      }
    }
  }

  render() {
    return (
      <div className="banner">
        <div className="container">
          <div className="row h-100 align-items-center">
            <div>
              <div className="banner-heading">
                <h2>Colorlib app</h2>
                <p>Everything You Need. To Start Selling Online Beautifully</p>
              </div>
              <form action="#" method="POST">
                <input type="text" placeholder="name@company.com"/>
                <input type="submit" value="Get Started" />
              </form>
            </div>
          </div>
        </div>
        <img className="banner-img" src={ BannerImg } alt="" ref={ this.imgRef } />
      </div>
    );
  }
}

export default Banner;
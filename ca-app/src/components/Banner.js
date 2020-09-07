import React, { Component } from 'react';
import '../static/css/components/banner.scss';
import BannerImg from '../static/images/welcome-img.png';

class Banner extends Component {
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
        <img src={BannerImg} alt=""/>
      </div>
    );
  }
}

export default Banner;
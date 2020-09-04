import React, { Component } from 'react';
import '../static/css/components/about.scss';
import '../static/css/vendor/themify-icons/themify-icons.css';

class About extends Component {
  render() {
    return (
      <div className="about container">
        <h3>Why Is It Special</h3>
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-md-3">
              <div className="ti-mobile"></div>
              <h4>Easy to use</h4>
              <p>We build pretty complex tools and this allows us to take designs and turn them into functional quickly and easily</p>
            </div>
            <div className="col-md-3">
              <div className="ti-ruler-pencil"></div>
              <h4>Powerful Design</h4>
              <p>We build pretty complex tools and this allows us to take designs and turn them into functional quickly and easily</p>
            </div>
            <div className="col-md-3">
              <div className="ti-settings"></div>
              <h4>Cutomizability</h4>
              <p>We build pretty complex tools and this allows us to take designs and turn them into functional quickly and easily</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
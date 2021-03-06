import React, { Component } from 'react';
import Propositions from './Propositions';
import { LazyLoader } from '../utils/index';
import '../static/css/components/about.scss';

class About extends Component {
  componentDidMount() {
    LazyLoader.add({
      el: '.about-item'
    });
  }

  render() {
    return (
      <div className="about">
        <div className="container">
          <h3>Why Is It Special</h3>
          <div className="container-fluid">
            <div className="row justify-content-between">
              <div className="about-item first">
                <div className="ti-mobile"></div>
                <h4>Easy to use</h4>
                <p>We build pretty complex tools and this allows us to take designs and turn them into functional quickly and easily</p>
              </div>
              <div className="about-item second">
                <div className="ti-ruler-pencil"></div>
                <h4>Powerful Design</h4>
                <p>We build pretty complex tools and this allows us to take designs and turn them into functional quickly and easily</p>
              </div>
              <div className="about-item third">
                <div className="ti-settings"></div>
                <h4>Cutomizability</h4>
                <p>We build pretty complex tools and this allows us to take designs and turn them into functional quickly and easily</p>
              </div>
            </div>
          </div>
        </div>
        <Propositions />
      </div>
    );
  }
}

export default About;
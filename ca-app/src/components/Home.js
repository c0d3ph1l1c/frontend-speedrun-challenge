import React, { Component } from 'react';
import { autoscroll } from '../utils/index';
import '../static/css/components/home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    };
  }

  backToHome = () => {
    autoscroll({
      el: '.banner',
      duration: 2000,
      timingFunction: 'linear'
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || 
                        document.documentElement.scrollTop ||
                        document.body.scrollTop;

      this.setState({
        display: scrollTop > 300? 'block' : 'none'
      });            
    })
  }

  render() {
    const { display } = this.state;

    return (
      <div className="home" style={{ display }} onClick={ this.backToHome }>
        <i className="ti-angle-up"></i>
      </div>
    )
  }
};

export default Home;
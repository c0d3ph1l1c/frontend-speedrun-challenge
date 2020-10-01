import React, { Component } from 'react';
import { LazyLoader } from '../utils/index';
import '../static/css/components/propositions.scss';
import PropositionsImg from '../static/images/special.png';

class Propositions extends Component {
  componentDidMount() {
    LazyLoader.add({
      el: '.propositions button'
    });
  }

  render() {
    return (
      <div className="propositions">
        <div className="container">
          <div className="row justify-content-between">
            <div className="image col-lg-6">
              <img src={ PropositionsImg } alt="Propositions"/>
            </div>
            <div className="col-lg-6 col-xl-5">
              <div className="description">
                <h3>Our Best Propositions for You!</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                <div className="btn-group">
                  <button>
                    <div className="btn-content-wrapper justify-content-center align-items-center">
                      <i className="ti-android"></i>
                      <div className="platform">
                        <span>available on</span>
                        <span className="store">Google Store</span>
                      </div>
                    </div>
                  </button>
                  <button>
                    <div className="btn-content-wrapper justify-content-center align-items-center">
                      <i className="fa fa-apple"></i>
                      <div className="platform">
                        <span>available on</span>
                        <span className="store">Apple Store</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Propositions;
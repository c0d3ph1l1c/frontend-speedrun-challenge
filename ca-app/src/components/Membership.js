import React, { Component } from  'react';
import { LazyLoader } from  '../utils/index';
import '../static/css/components/membership.scss';

class Membership extends Component {
  componentDidMount() {
    const clientWidth = document.documentElement.clientWidth ||
                        document.body.clientWidth;

    if(clientWidth >= 768) {
      LazyLoader.add({
        el: '.membership button',
      });
    }
  }

  render() {
    return (
      <div className="membership">
        <div className="container">
          <div className="row">
            <div className="col-left col-md-8">
              <h3>Join our Monthly Membership</h3>
              <p>Fint the perfect plan for you - 100% satisfaction guaranteed.</p>
            </div>
            <div className="col-right col-md-4">
              <button>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Membership;
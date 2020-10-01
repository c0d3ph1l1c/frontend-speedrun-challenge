import React, { Component } from 'react';
import '../static/css/components/pricing.scss';

class Pricing extends Component {
  render() {
    return (
      <div className="pricing">
        <h3>Pricing Plan</h3>
        <div className="plans container">
          <div className="row">
            <div className="plan col-md-6 col-lg-3">
              <div className="head">
                <h4>Starter Plan</h4>
                <div className="price">
                  $<span className="price-figure">29</span>
                </div>
              </div>
              <div className="plan-feature">Up to 10 users monthly</div>
              <div className="plan-feature">Unlimited updates</div>
              <div className="plan-feature">Free host & domain</div>
              <div className="plan-feature">24/7 Support</div>
              <div className="plan-feature">10 Unique Users</div>
              <div className="select-plan">Select Plan</div>
            </div>
            <div className="plan col-md-6 col-lg-3">
              <div className="head">
                <h4>Basic Plan</h4>
                <div className="price">
                  $<span className="price-figure">49</span>
                </div>
              </div>
              <div className="plan-feature">Up to 10 users monthly</div>
              <div className="plan-feature">Unlimited updates</div>
              <div className="plan-feature">Free host & domain</div>
              <div className="plan-feature">24/7 Support</div>
              <div className="plan-feature">10 Unique Users</div>
              <div className="select-plan">Select Plan</div>
            </div>
            <div className="plan favourite col-md-6 col-lg-3">
              <div className="head">
                <h4>Advanced Plan</h4>
                <div className="price">
                  $<span className="price-figure">69</span>
                </div>
              </div>
              <div className="plan-feature">Up to 10 users monthly</div>
              <div className="plan-feature">Unlimited updates</div>
              <div className="plan-feature">Free host & domain</div>
              <div className="plan-feature">24/7 Support</div>
              <div className="plan-feature">10 Unique Users</div>
              <div className="select-plan">Select Plan</div>
            </div>
            <div className="plan col-md-6 col-lg-3">
              <div className="head">
                <h4>Community Plan</h4>
                <div className="price">
                  $<span className="price-figure">99</span>
                </div>
              </div>
              <div className="plan-feature">Up to 10 users monthly</div>
              <div className="plan-feature">Unlimited updates</div>
              <div className="plan-feature">Free host & domain</div>
              <div className="plan-feature">24/7 Support</div>
              <div className="plan-feature">10 Unique Users</div>
              <div className="select-plan">Select Plan</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pricing;
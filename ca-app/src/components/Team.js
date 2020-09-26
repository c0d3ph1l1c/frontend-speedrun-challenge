import React, { Component } from 'react';
import '../static/css/components/team.scss';
import Member1 from '../static/images/team-1.jpg';
import Member2 from '../static/images/team-2.jpg';
import Member3 from '../static/images/team-3.jpg';
import Member4 from '../static/images/team-4.jpg';

class Team extends Component {
  render() {
    return (
      <div className="team">
        <div className="container">
          <h3>Our Team</h3>
          <ul className="team-members row">
            <li className="team-member col-md-6 col-lg-3">
              <div className="img-wrapper">
                <img src={ Member1 } alt="Jackson Nash"/>
                <div className="social-media-overlay">
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
              <h4 className="name">Jackson Nash</h4>
              <p className="position">Tax Advice</p>
              
            </li>
            <li className="team-member col-md-6 col-lg-3">
              <div className="img-wrapper">
                <img src={ Member2 } alt="Jackson Nash"/>
                <div className="social-media-overlay">
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
              <h4 className="name">Alex Manning</h4>
              <p className="position">CEO-Founder</p>
            </li>
            <li className="team-member col-md-6 col-lg-3">
              <div className="img-wrapper">
                <img src={ Member3 } alt="Jackson Nash"/>
                <div className="social-media-overlay">
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
              <h4 className="name">Ollie Schneider</h4>
              <p className="position">Business Planner</p>
            </li>
            <li className="team-member col-md-6 col-lg-3">
              <div className="img-wrapper">
                <img src={ Member4 } alt="Jackson Nash"/>
                <div className="social-media-overlay">
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                  <a className="logo-wrapper" href="/#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
              <h4 className="name">Roger West</h4>
              <p className="position">Financer</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Team;
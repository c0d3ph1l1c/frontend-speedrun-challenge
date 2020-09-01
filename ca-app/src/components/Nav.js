import React, { Component } from 'react';
import '../static/css/components/nav.scss';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="row">
            <h1 className="navbar-brand col-lg-2">
              <a href="#">Ca.</a>
            </h1>
            <div className="navbar-toggle">
              <div className="bar"></div>
            </div>
            <div className="navbar-collapse col-lg-10">
              <div className="container-fluid"> 
                <div className="row">
                  <ul className="navbar-nav col-lg-9 ml-auto">
                    <li className="nav-item">
                      <a href="#" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">About</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">Features</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">Screenshot</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">Pricing</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">Testimonials</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">Team</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">Contact</a>
                    </li>
                  </ul>
                  <div className="btn-wrapper">
                    <a className="btn-signup" href="#">Sign Up Free</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
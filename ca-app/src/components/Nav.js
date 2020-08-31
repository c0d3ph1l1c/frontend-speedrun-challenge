import React, { Component } from 'react';
import '../static/css/components/nav.scss'

class Nav extends Component {
  render() {
    return (
      <nav class="navbar">
        <h1 className="navbar-brand">
          <a href="#">Ca.</a>
        </h1>
        <div className="navbar-toggle">
          <div className="bar"></div>
        </div>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Feature</a>
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
          <a className="btn-signup" href="#">Sign Up Free</a>
        </div>
      </nav>
    );
  }
}

export default Nav;
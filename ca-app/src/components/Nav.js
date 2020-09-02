import React, { Component } from 'react';
import '../static/css/components/Nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded: false,
      navHeight: 'auto'
    };
    this.navRef = React.createRef();
  }

  toggleNav = () => {
    this.setState(prevState => ({ navExpanded: !prevState.navExpanded }));
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-11 col-lg-2 ml-auto mr-auto">
              <div className="row h-100 mt-auto mb-auto">
                <h1 className="navbar-brand mr-auto">
                  <a href="#">Ca.</a>
                </h1>
                <button 
                  className="navbar-toggle d-block d-lg-none" 
                  onClick={this.toggleNav}
                >
                  <div className="center"></div>
                </button>
              </div>
            </div>
            <div 
              ref={this.navRef} 
              className={`navbar-collapse ml-auto mr-auto col-11 col-lg-10 ${this.state.navExpanded && 'show'}`}
              style={{ height: this.state.navHeight }}
            >
              <div className="container-fluid nav-wrapper"> 
                <div className="row">
                  <ul className="navbar-nav col-12 col-lg-9 ml-auto">
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
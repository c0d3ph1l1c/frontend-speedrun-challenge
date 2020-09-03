import React, { Component } from 'react';
import { throttle } from '../utils';
import '../static/css/components/nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navHeight: 'auto',
      navClass: 'collapsed',
      navbarClass: 'navbar-absolute'
    };
    this.fullNavHeight = 0;
    this.toggleNavDone = true;
    this.navTransitionBegin = false;
    this.navRef = React.createRef();
    this.navbarRef = React.createRef();
  }

  toggleNav = () => {
    if(this.toggleNavDone) {
      const { navClass } = this.state;
      this.fullNavHeight = this.navRef.current.offsetHeight;

      const newState = navClass === 'collapsed' ? 
        ({
          navHeight: '0px',
          navClass: 'expanding'
        }):
        ({
          navHeight: this.navRef.current.offsetHeight + 'px',
          navClass: 'collapsing'
        });
      this.toggleNavDone = false;
      this.setState(newState);
    }
  }

  resetLock = () => {
    setTimeout(() => {
      this.toggleNavDone = true;
      this.navTransitionBegin = false;
    }, 50);
  }

  scrollHandler = throttle(() => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    const { navbarClass } = this.state;
    const thresholdScroll = this.navbarRef.current.offsetHeight - 25;

    if(scrollY > thresholdScroll &&
       navbarClass === 'navbar-absolute') {
      this.setState({ navbarClass: 'navbar-fixed'});
    } else if(scrollY <= thresholdScroll &&
              navbarClass === 'navbar-fixed') {
      this.setState({ navbarClass: 'navbar-absolute'});
    }
  }, true, 50);

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentDidUpdate() {
    if (!this.navTransitionBegin) {
      switch(this.state.navClass) {
        case 'expanding': 
          setTimeout(() => {
            this.setState({ 
              navHeight: `${this.fullNavHeight}px`
            });
          }, 0);
          setTimeout(() => {
            this.setState({ 
              navHeight: 'auto', 
              navClass: 'expanded' 
            }, this.resetLock);
          }, 300);
          this.navTransitionBegin = true;
          break;
        
        case 'collapsing':
          setTimeout(() => {
            this.setState({ 
              navHeight: '0px' 
            });
          }, 0);
          setTimeout(() => {
            this.setState({ 
              navHeight: 'auto', 
              navClass: 'collapsed' 
            }, this.resetLock);
          }, 300);
          this.navTransitionBegin = true;
          break;  
          
        default:
          break;
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  render() {
    const { navHeight, navClass, navbarClass } = this.state;

    return (
      <nav className={`navbar ${navbarClass}`}>
        <div className="container-fluid">
          <div className="row">
            <div 
              ref={this.navbarRef}
              className="heading-bar col-lg-2"
            >
              <div className="row h-100">
                <div className="col-11 col-96p ml-auto mr-auto">
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
              </div>
            </div>
            <div 
              ref={this.navRef} 
              className={`navbar-collapse ml-auto mr-auto col-11 col-96p col-lg-10 ${navClass}`}
              style={{ height: navHeight }}
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
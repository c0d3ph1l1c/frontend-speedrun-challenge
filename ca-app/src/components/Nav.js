import React, { Component } from 'react';
import { throttle, autoscroll } from '../utils';
import '../static/css/components/nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navHeight: '0px',
      navClass: 'collapsed',
      navbarClass: 'navbar-absolute'
    };
    this.fullNavHeight = 0;
    this.toggleNavDone = true;
    this.navTransitionOngoing = false;
    this.navRef = React.createRef();
    this.navBrandRef = React.createRef();
    this.headingBarRef = React.createRef();
  }

  toggleNav = () => {
    if(this.toggleNavDone) {
      const { navClass } = this.state;

      const newState = navClass === 'collapsed' ? 
        ({
          navHeight: 'auto',
          navClass: 'beginExpand'
        }):
        ({
          navHeight: this.navRef.current.offsetHeight + 'px',
          navClass: 'beginCollapse'
        });
      this.toggleNavDone = false;
      this.setState(newState);
    }
  }

  resetLock = () => {
    setTimeout(() => {
      this.toggleNavDone = true;
      this.navTransitionOngoing = false;
    }, 50);
  }

  scrollHandler = throttle(() => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    
    const { navbarClass } = this.state;
    const { offsetTop, offsetHeight } = this.navBrandRef.current;
    const thresholdScroll = offsetTop + offsetHeight;

    if(scrollY > thresholdScroll &&
       navbarClass === 'navbar-absolute') {
      this.setState({ navbarClass: 'navbar-fixed'});
    } else if(scrollY <= thresholdScroll &&
              navbarClass === 'navbar-fixed') {
      this.setState({ navbarClass: 'navbar-absolute'});
    }
  }, true, 30);

  navigate = e => {
    const { navbarClass } = this.state;

    e.preventDefault();
    const link = e.target.href;
    const selector = link.substring(link.lastIndexOf('/')).replace('/', '.');
    const headingBarHeight = parseInt(getComputedStyle(this.headingBarRef.current, null).height);

    const scrollTop = window.pageYOffset ||
                      document.documentElement.scrollTop ||
                      document.body.scrollTop;
    const targetEl = document.querySelector(selector);
    const targetStart = targetEl.getBoundingClientRect().top 
                          + scrollTop - headingBarHeight;
    const targetEnd = targetEl.getBoundingClientRect().top 
                          + scrollTop + targetEl.getBoundingClientRect().height - headingBarHeight;             
    const clientWidth = document.documentElement.clientWidth || 
                          document.body.clientWidth;                                   
    const clientHeight = document.documentElement.clientHeight || 
                         document.body.clientHeight;

    if(scrollTop < targetStart || scrollTop > targetEnd - clientHeight / 2) {
      autoscroll({
        el: selector,
        offset: - headingBarHeight + (navbarClass === 'navbar-absolute' && clientWidth >= 992? 41 : 0),
        duration: 2000,
        timingFunction: 'ease-out'
      });
    }                         
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentDidUpdate() {
    if (!this.navTransitionOngoing) {
      switch(this.state.navClass) {
        case 'beginExpand':
          this.fullNavHeight = this.navRef.current.offsetHeight;
          setTimeout(() => {
            this.setState({
              navHeight: '0px',
              navClass: 'expandBegun'
            });
          }, 10);
          break;
        case 'expandBegun': 
          setTimeout(() => {
            this.setState({
              navHeight: `${this.fullNavHeight}px`,
              navClass: 'expanding'
            });
          }, 10);
          break;
        case 'expanding': 
          setTimeout(() => {
            this.setState({ 
              navHeight: 'auto', 
              navClass: 'expanded' 
            }, this.resetLock);
          }, 300);
          this.navTransitionOngoing = true;
          break;
        
        case 'beginCollapse':
          setTimeout(() => {
            this.setState({
              navHeight: '0px',
              navClass: 'collapsing' 
            });
          }, 0);
          break;
        case 'collapsing':
          setTimeout(() => {
            this.setState({ 
              navHeight: '0px', 
              navClass: 'collapsed' 
            }, this.resetLock);
          }, 300);
          this.navTransitionOngoing = true;
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
              className="heading-bar col-lg-2"
              ref={ this.headingBarRef }
            >
              <div className="row h-100">
                <div className="col-11 col-96p ml-auto mr-auto">
                  <div className="row h-100 mt-auto mb-auto">
                    <h1 className="navbar-brand mr-auto">
                      <a ref={this.navBrandRef} href="/">Ca.</a>
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
                  <ul className="navbar-nav col-12 col-lg-9 ml-auto" onClick={ this.navigate }>
                    <li className="nav-item">
                      <a href="/banner" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                      <a href="/about" className="nav-link">About</a>
                    </li>
                    <li className="nav-item">
                      <a href="/features" className="nav-link">Features</a>
                    </li>
                    <li className="nav-item">
                      <a href="/screenshot" className="nav-link">Screenshot</a>
                    </li>
                    <li className="nav-item">
                      <a href="/pricing" className="nav-link">Pricing</a>
                    </li>
                    <li className="nav-item">
                      <a href="/testimonials" className="nav-link">Testimonials</a>
                    </li>
                    <li className="nav-item">
                      <a href="/team" className="nav-link">Team</a>
                    </li>
                    <li className="nav-item">
                      <a href="/contact" className="nav-link">Contact</a>
                    </li>
                  </ul>
                  <div className="btn-wrapper">
                    <a className="btn-signup" href="/">Sign Up Free</a>
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
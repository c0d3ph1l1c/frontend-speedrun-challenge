import React, { Component } from 'react';
import '../static/css/components/footer.scss';

class Footer extends Component {
  render() {
    const { forwardedRef } = this.props;

    return (
      <footer ref={ forwardedRef }>
        <h3>Ca.</h3>
        <div className="social-media">
          <a className="logo-wrapper" href="/#">
            <i className="fa fa-facebook-f"></i>
          </a>
          <a className="logo-wrapper favourite" href="/#">
            <i className="fa fa-twitter"></i>
          </a>
          <a className="logo-wrapper" href="/#">
            <i className="fa fa-instagram"></i>
          </a>
          <a className="logo-wrapper" href="/#">
            <i className="fa fa-google-plus"></i>
          </a>
        </div>
        <ul>
          <li>
            <a href="/#">About</a>
          </li>
          <li>
            <a href="/#">Terms & Conditions</a>
          </li>
          <li>
            <a href="/#">Privacy Policy</a>
          </li>
          <li>
            <a href="/#">Contact</a>
          </li>
        </ul>
        <p>Copyright ©2017 Ca. Designed by <a href="/#">Colorlib</a></p>
      </footer>
    );
  }
}

export default Footer;
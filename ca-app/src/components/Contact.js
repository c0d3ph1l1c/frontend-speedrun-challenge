import React, { Component } from 'react';
import '../static/css/components/contact.scss';

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="contact-details col-md-6">
              <h3>Get in touch with us!</h3>
              <p>We'll send you epic weekly blogs, whitepapers and things to make your app startup thrive, all FREE!</p>
              <div className="details">
                <p>
                  <span className="detail">Address:</span> 40 Baria Sreet 133/2 NewYork City, US
                </p>
                <p>
                  <span className="detail">Phone:</span> +11-225-888-888-66
                </p>
                <p>
                  <span className="detail">Email:</span> info.deercreative@gmail.com
                </p>
              </div>
            </div>
            <div className="contact-form col-md-6">
              <form action="/">
                <input className="form-control" type="text" name="name" id="name" placeholder="Your Name" required={ true } />
                <input className="form-control" type="email" name="email" id="email" placeholder="Your E-mail" required={ true } />
                <textarea className="form-control" name="message" id="message" placeholder="Your Message *" required={ true } />
                <input type="submit" value="Send Now"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
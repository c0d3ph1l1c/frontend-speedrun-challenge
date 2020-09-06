import React, { Component } from 'react';
import '../static/css/components/features.scss';

class Features extends Component {
  render() {
    return (
      <div className="features container">
        <h3>Awesome Features</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="heading">
                Awesome Experience
              </div>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="col-lg-4">
              <div className="heading">
                Fast and Simple
              </div>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="col-lg-4">
              <div className="heading">
                Clean Code
              </div>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="col-lg-4">
              <div className="heading">
                Perfect Design
              </div>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="col-lg-4">
              <div className="heading">
                Best Industry Leader
              </div>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="col-lg-4">
              <div className="heading">
                24/7 Online Support
              </div>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>        
      </div>
    );
  }
}

export default Features;
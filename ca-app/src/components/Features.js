import React, { Component } from 'react';
import { LazyLoader } from '../utils/index';
import Modal from './shared/Modal';
import '../static/css/components/features.scss';
import VideoImg from '../static/images/video.jpg';

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
    };
    this.videoTop = 0;
    this.videoWrapperRef = React.createRef();
  }

  toggleVideo = e => {
    e.preventDefault();
    this.setState(prevState => ({
      showVideo: !prevState.showVideo,
    }));
  }

  adjustVideoTop = () => {
    if (this.state.showVideo) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const videoHeight = this.videoWrapperRef.current.offsetHeight;
      let offset = (clientHeight - videoHeight) / 2;
      offset = Math.max(0, offset);
      this.videoWrapperRef.current.style.top = `${scrollTop + offset}px`;
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.adjustVideoTop);
    LazyLoader.add({
      el: '.stat',
      callback: function() {
        const figureEl = this.querySelector('.figure');
        const max = parseInt(figureEl.getAttribute('max'));
        let start, duration = 4000;

        function increment(timestamp) {
          if(start === undefined) {
            start = timestamp;
          }
          const elapsed = timestamp - start;
          const currValue = parseInt(figureEl.innerHTML);
          const newValue = parseInt(elapsed / duration * max);
          if(currValue < newValue) {
            figureEl.innerHTML = Math.min(newValue, max);
          }
          if(newValue < max) {
            requestAnimationFrame(increment);
          }
        }

        requestAnimationFrame(increment);
      }
    });
  }

  componentDidUpdate() {
    this.adjustVideoTop();
  }

  render() {
    return (
      <div className="features">
        <div className="container">
          <h3>Awesome Features</h3>
          <div className="container-fluid">
            <div className="row">
              <div className="feature col-sm-6 col-lg-4">
                <div className="heading">
                  <i className="ti-user"></i>
                  <h4>Awesome Experience</h4>
                </div>
                <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <div className="feature col-sm-6 col-lg-4">
                <div className="heading">
                  <i className="ti-pulse"></i>
                  <h4>Fast and Simple</h4>
                </div>
                <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <div className="feature col-sm-6 col-lg-4">
                <div className="heading">
                  <i className="ti-dashboard"></i>
                  <h4>Clean Code</h4>
                </div>
                <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <div className="feature col-sm-6 col-lg-4">
                <div className="heading">
                  <i className="ti-palette"></i>
                  <h4>Perfect Design</h4>
                </div>
                <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <div className="feature col-sm-6 col-lg-4">
                <div className="heading">
                  <i className="ti-crown"></i>
                  <h4>Best Industry Leader</h4>
                </div>
                <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <div className="feature col-sm-6 col-lg-4">
                <div className="heading">
                  <i className="ti-headphone"></i>
                  <h4>24/7 Online Support</h4>
                </div>
                <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
          </div>    
          <div className="video-container">
            <img src={VideoImg} alt="Video"/>
            <a 
              onClick={this.toggleVideo} 
              href="https://www.youtube.com/watch?v=f5BBJ4ySgpo"
            > </a>
            <Modal show={this.state.showVideo}>
              <div className="modal-child" onClick={this.toggleVideo}>
                <div 
                  className="video-wrapper" 
                  ref={this.videoWrapperRef}
                >
                  <div className="close">
                    <i className="ti-close"></i>
                  </div>
                  <iframe 
                    src="https://www.youtube.com/embed/f5BBJ4ySgpo" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen={true}
                    title="Video"
                  >
                  </iframe>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="stats">
          <div className="container">
            <div className="row">
              <div className="col-md-3 stat stat-1">
                <div className="placeholder">
                  <span>90</span>
                  <div className="figure" max="90">0</div>
                </div>
                <div className="description">
                  <i className="ion-arrow-down-a"></i>
                  <p>APP</p>
                  <p>DOWNLOADS</p>
                </div>
              </div>
              <div className="col-md-3 stat stat-2">
                <div className="placeholder">
                  <span>120</span>
                  <div className="figure" max="120">0</div>
                </div>
                <div className="description">
                  <i className="ion-happy-outline"></i>
                  <p>HAPPY</p>
                  <p>CLIENTS</p>  
                </div>
              </div>
              <div className="col-md-3 stat stat-3">
                <div className="placeholder">
                  <span>40</span>
                  <div className="figure" max="40">0</div>
                </div>
                <div className="description">
                  <i className="ion-person"></i>
                  <p>ACTIVE</p>
                  <p>ACCOUNTS</p> 
                </div>
              </div>
              <div className="col-md-3 stat stat-4">
                <div className="placeholder">
                  <span>10</span>
                  <div className="figure" max="10">0</div>
                </div>
                <div className="description">
                  <i className="ion-ios-star-outline"></i>
                  <p>TOTAL</p>
                  <p>APP RATES</p>                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Features;
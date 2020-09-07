import React, { Component } from 'react';
import Modal from './Modal';
import '../static/css/components/features.scss';
import VideoImg from '../static/images/video.jpg';

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false
    };
    this.videoWrapperRef = React.createRef();
  }

  toggleVideo = e => {
    e.preventDefault();
    this.setState(prevState => ({
      showVideo: !prevState.showVideo
    }), () => {
      if(this.state.showVideo) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.videoWrapperRef.current.style.top = `${scrollTop}px`;
      }
    });
  }

  render() {
    return (
      <>
        <div className="features container">
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
            />
            <Modal show={this.state.showVideo}>
              <div className="modal-child" onClick={this.toggleVideo}>
                <div ref={this.videoWrapperRef} className="video-wrapper">
                  <div className="close">
                    <i class="ti-close"></i>
                  </div>
                  <iframe src="https://www.youtube.com/embed/f5BBJ4ySgpo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                  </iframe>
                </div>
              </div>
            </Modal>
          </div>    
        </div>
      </>
    );
  }
}

export default Features;
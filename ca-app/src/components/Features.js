import React, { Component } from 'react';
import Modal from './Modal';
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
    this.videoTop = 0;
    this.scrollTop = 0;
  }

  adjustVideoTop = () => {
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const videoHeight = this.videoWrapperRef.current.offsetHeight;
      let offset = (clientHeight - videoHeight) / 2;
      offset = Math.max(0, offset);
      this.videoWrapperRef.current.style.top = `${this.scrollTop + offset}px`;
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      const { showVideo } = this.state;
      if (showVideo) {
        this.adjustVideoTop();
      }
    });
  }

  componentDidUpdate() {
    const { showVideo, videoTop } = this.state;
    if (showVideo && !videoTop) {
      this.scrollTop = window.pageYOffset || document.documentElement.clientHeight || document.body.clientHeight;
      this.adjustVideoTop();
    }
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
                  >
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
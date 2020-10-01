import React, { Component } from 'react';
import '../static/css/components/loading.scss';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      display: 'block'
    };
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      console.log('load');
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidUpdate() {
    const { isLoading, display } = this.state;
    if(!isLoading && display === 'block') {
      setTimeout(() => {
        this.setState({
          display: 'none'
        });
      }, 1000);
    }
  }

  render() {
    const { isLoading, display } = this.state;

    return (
      <div className="loading" style={{ opacity: isLoading? 1 : 0, display }}>
      </div>
    )
  }
}

export default Loading;
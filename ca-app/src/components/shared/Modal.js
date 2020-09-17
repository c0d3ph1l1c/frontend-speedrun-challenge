import { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../static/css/components/shared/modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = 'modal';
    this.modal = document.getElementById('modal');
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      if(this.props.show) {
        this.modal.style.height = `${document.body.offsetHeight}px`;
      }
    });
  }

  componentDidUpdate() {
    if(this.props.show) {
      this.modal.style.height = `${document.body.offsetHeight}px`;
      this.modal.appendChild(this.el);
      return;
    } 
    if(this.modal.children.length) {
      this.modal.style.height = 0;
      this.modal.removeChild(this.el);
    }
  }

  componentWillUnmount() {
    this.modal.children.length && this.modal.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

export default Modal;
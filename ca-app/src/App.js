import React, { Component } from 'react';
import Nav from './components/Nav';
import './static/css/components/header.css';

class App extends Component {
  render() {
    return (
      <header>
        <Nav />
      </header>
    );
  }
}

export default App;
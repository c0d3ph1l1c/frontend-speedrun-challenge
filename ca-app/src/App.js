import React, { Component } from 'react';
import Nav from './components/Nav';
import Banner from './components/Banner';
import About from './components/About';

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Banner />
        <About />
      </>
    );
  }
}

export default App;
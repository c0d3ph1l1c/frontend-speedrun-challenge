import React, { Component } from 'react';
import Nav from './components/Nav';
import Banner from './components/Banner';
import About from './components/About';
import Propositions from './components/Propositions';
import Features from './components/Features';
import Screenshot from './components/Screenshot';

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Banner />
        <About />
        <Propositions />
        <Features />
        <Screenshot />
      </>
    );
  }
}

export default App;
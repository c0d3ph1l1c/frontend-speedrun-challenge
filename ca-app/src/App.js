import React, { Component } from 'react';
import Nav from './components/Nav';
import Banner from './components/Banner';
import About from './components/About';
import Features from './components/Features';
import Propositions from './components/Propositions';

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Banner />
        <About />
        <Propositions />
        <Features />
      </>
    );
  }
}

export default App;
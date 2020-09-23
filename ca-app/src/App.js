import React, { Component } from 'react';
import Nav from './components/Nav';
import Banner from './components/Banner';
import About from './components/About';
import Propositions from './components/Propositions';
import Features from './components/Features';
import Screenshot from './components/Screenshot';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Membership from './components/Membership';
import Team from './components/Team';

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
        <Pricing />
        <Testimonials />
        <Membership />
        <Team />
      </>
    );
  }
}

export default App;
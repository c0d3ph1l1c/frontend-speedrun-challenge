import React, { Component } from 'react';
import Nav from './components/Nav';
import Banner from './components/Banner';

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Banner />
      </>
    );
  }
}

export default App;
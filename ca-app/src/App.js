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
import Contact from './components/Contact';
import Footer from './components/Footer';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.footerRef = React.createRef();
    this.state = {
      mainMarginBottom: 0
    }
  }

  setMainMarginBottom = () => {
    const { footerRef } = this;
    this.setState({
      mainMarginBottom: parseInt(getComputedStyle(footerRef.current, null).height)
    })
  }

  componentDidMount() {
    const { setMainMarginBottom } = this;

    setMainMarginBottom();

    window.addEventListener('resize', setMainMarginBottom);
  }

  render() {
    const { footerRef } = this;
    const { mainMarginBottom } = this.state;

    return (
      <div className="page-wrapper">
        <Nav />
        <main style={{ marginBottom: `${mainMarginBottom}px` }}>
          <Banner />
          <About />
          <Propositions />
          <Features />
          <Screenshot />
          <Pricing />
          <Testimonials />
          <Membership />
          <Team />
          <Contact />
        </main>
        <Footer forwardedRef={footerRef} />
        <Home />
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import Carousel from './shared/Carousel';
import '../static/css/components/testimonials.scss';
import ClientImg1 from '../static/images/client-1.jpg';
import ClientImg2 from '../static/images/client-2.jpg';
import ClientImg3 from '../static/images/client-3.jpg';

const slides = [
  {
    id: 0,
    imgUrl: ClientImg3,
    imgAlt: "Aigars Silkalns",
    testimonial: {
      name: "Aigars Silkalns",
      position: "Ceo Colorlib",
      rating: 5,
      quote: `I have been using it for a number of years. I use Colorlib for usability testing. It's great for taking images and making clickable image prototypes that do the job and save me the coding time and just the general hassle of hosting.`,
    },
  },
  {
    id: 1,
    imgUrl: ClientImg2,
    imgAlt: "Jennifers",
    testimonial: {
      name: "Jennifers",
      position: "Developer",
      rating: 5,
      quote: `I have been using it for a number of years. I use Colorlib for usability testing. It's great for taking images and making clickable image prototypes that do the job and save me the coding time and just the general hassle of hosting.`,
    },
  },
  {
    id: 2,
    imgUrl: ClientImg1,
    imgAlt: "Helen",
    testimonial: {
      name: "Helens",
      position: "Marketer",
      rating: 5,
      quote: `I use Colorlib for usability testing. It's great for taking images and making clickable image prototypes that do the job and save me the coding time and just the general hassle of hosting.`,
    },
  },
  {
    id: 3,
    imgUrl: ClientImg2,
    imgAlt: "Henry Smith",
    testimonial: {
      name: "Henry Smith",
      position: "Developer",
      rating: 5,
      quote: `I have been using it for a number of years. I use Colorlib for usability testing. It's great for taking images and making clickable image prototypes that do the job and save me the coding time and just the general hassle of hosting.`,
    },
  },
];

class Testimonials extends Component {
  constructor(props) {
    super(props);
    const clientWidth =
      document.documentElement.clientWidth || document.body.clientWidth;

    const spaceBetween =
      clientWidth >= 1200
        ? 30
        : clientWidth >= 992
        ? 15
        : clientWidth >= 768
        ? 7
        : clientWidth >= 576
        ? 40
        : (0.8 * clientWidth - 70 * 3) / 6 > 0
        ? (0.8 * clientWidth - 70 * 3) / 6
        : 0.05 * clientWidth;
    const activeEnlargeFactor = 
      clientWidth >= 1200
        ? 1.3 
        : clientWidth >= 992 
        ? 1.2 
        : 1.15;

    this.state = {
      toggleFlag: 0,
      spaceBetween,
      activeEnlargeFactor,
    };
  }

  switchTestimonial = index => {
    console.log(index);
    this.setState(prevState => ({
      toggleFlag: (prevState.toggleFlag + 1) % 2
    }));
  }

  componentDidMount() {
    window.addEventListener('resize', e => {
      const clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;

      const spaceBetween =
        clientWidth >= 1200
          ? 30
          : clientWidth >= 992
          ? 15
          : clientWidth >= 768
          ? 7
          : clientWidth >= 576
          ? 40
          : (0.8 * clientWidth - 70 * 3)/6 > 0
          ? (0.8 * clientWidth - 70 * 3)/6
          : 0.05 * clientWidth;
      const activeEnlargeFactor =
        clientWidth >= 1200 
          ? 1.3 
          : clientWidth >= 992 
          ? 1.2 
          : 1.15;
                  
      this.setState({
        spaceBetween,
        activeEnlargeFactor
      });
    })
  }

  render() {
    const { switchTestimonial } = this;
    const { activeEnlargeFactor, spaceBetween } = this.state;

    return (
      <div className="testimonials">
        <div className="container">
          <div className="testimonial">
            <div className="first">
              <i className="fa fa-quote-left"></i>
              <div className="client-quote">
                “&nbsp;
                <span className="quote">
                  I have been using it for a number of years. I use Colorlib for
                  usability testing. It's great for taking images and making
                  clickable image prototypes that do the job and save me the
                  coding time and just the general hassle of hosting.
                </span>
                &nbsp;”
              </div>
              <div className="rating">
                <i className="ion-android-star"></i>
              </div>
              <div className="name">Aigars Silkalns</div>
              <div className="position">Ceo Colorlib</div>
            </div>
            <div className="second hide">
              <i className="fa fa-quote-left"></i>
              <div className="client-quote">
                “&nbsp;
                <span className="quote"></span>
                &nbsp;”
              </div>
              <div className="rating">
                <i className="ion-android-star"></i>
              </div>
              <div className="name"></div>
              <div className="position"></div>
            </div>
          </div>
          <Carousel
            slides={slides}
            slidesPerView={3}
            spaceBetween={spaceBetween}
            activeEnlargeFactor={activeEnlargeFactor}
            initialCenterSlideId={0}
            navigation={{
              prev: true,
              next: true,
              prevClass: "ti-angle-left",
              nextClass: "ti-angle-right",
            }}
            onSlideChange={ switchTestimonial }
          />
        </div>
      </div>
    );
  }
}

export default Testimonials;
import Carousel from 'react-bootstrap/Carousel';
import './Carousels.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function CarouselReady() {
  return (
    <>
      <div style={{ maxWidth: "1000vh" }}>
        <Carousel data-bs-theme="light" fade slide={false} controls={false}>
          <Carousel.Item>
            <div style={{ height: "570px", minHeight: "100%" }}>
              <img
                className="w-100 img-phone"
                style={{ objectFit: "cover" }}
                src={require("../img/law3_enhanced.jpg")}
                alt="First slide"
              />
              <Carousel.Caption>
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px' }}>
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h4 className="text-white text-uppercase mb-4" style={{ letterSpacing: "3px" }}>Best Law Agency</h4>
                    <h3 className="display-2 text-capitalize text-white mb-4">Our fighting Is for your justice</h3>
                    <Link className="btn  py-3 px-5 mt-2" to="/contact" style={{backgroundColor:'gold'}}>Get An Appointment</Link>
                  </div>
                </div>
              </Carousel.Caption>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div style={{ height: "570px", minHeight: "100%" }}>
              <img
                className="w-100 img-phone"
                style={{ objectFit: "cover" }}
                src={require("../img/law3_enhanced.jpg")}
                alt="Second slide"
              />
              <Carousel.Caption>
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px' }}>
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h4 className="text-white text-uppercase mb-4" style={{ letterSpacing: "3px" }}>Results You Deserve</h4>
                    <h3 className="display-2 text-capitalize text-white mb-4">We prepared to oppose for you</h3>
                    <Link className="btn  py-3 px-5 mt-2" to="/contact" style={{backgroundColor:'gold'}}>Get An Appointment</Link>                  </div>
                </div>
              </Carousel.Caption>
            </div>
          </Carousel.Item>

          {/* Third Slide */}
          <Carousel.Item>
            <div style={{ height: "570px", minHeight: "100%" }}>
              <img
                className="w-100 img-phone"
                style={{ objectFit: "cover" }}
                src={require("../img/law3_enhanced.jpg")}
                alt="Third slide"
              />
              <Carousel.Caption>
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px' }}>
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h4 className="text-white text-uppercase mb-4" style={{ letterSpacing: "3px" }}>Legal Excellence</h4>
                    <h3 className="display-2 text-capitalize text-white mb-4">Your Trusted Legal Partners in India.</h3>
                    <Link className="btn  py-3 px-5 mt-2" to="/contact" style={{backgroundColor:'gold',fontWeight:1000}}>Get An Appointment</Link></div>
                </div>
              </Carousel.Caption>
            </div>
          </Carousel.Item>

        </Carousel>
      </div>
    </>
  );
}

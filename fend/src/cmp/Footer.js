import React from 'react';
const email = 'rushi.lukka.14@gmail.com';
const phoneNumber = '9428669848';
 const handleOpenGmail = () => {
      window.location.href = `mailto:${email}`;
   
  };
 const makePhoneCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
export default function Footer() {
  return (
    <>
    <div class="container-fluid bg-secondary text-white pt-5 px-sm-3 px-md-5" style={{marginTop: "90px"}}>
        <div class="row mt-5">
            <div class="col-lg-4">
                <div class="d-flex justify-content-lg-center p-4" style={{background: "rgba(256, 256, 256, .05)"}}>
                    <i class="fa fa-2x fa-map-marker-alt text-primary"></i>
                    <div class="ml-3">
                        <h5 class="text-white">Our Office</h5>
                        <p class="m-0">SG Hignway, Ahmedabad, Gujarat</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="d-flex justify-content-lg-center p-4" style={{background: "rgba(256, 256, 256, .05)"}}>
                <p class="m-0" onClick={handleOpenGmail}>
                    <i class="fa fa-2x fa-envelope-open text-primary">
                    </i>
                </p>
                    <div class="ml-3">
                        <h5 class="text-white">Email Us</h5>
                        <p class="m-0" onClick={handleOpenGmail}>
                            info@example.com
                            </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="d-flex justify-content-lg-center p-4" style={{background: "rgba(256, 256, 256, .05)"}}>
                <p class="m-0"onClick={makePhoneCall}>
                 <i class="fa fa-2x fa-phone fa-flip-horizontal text-primary"></i>
                            </p>
                    <div class="ml-3">
                        <h5 class="text-white">Call Us</h5>
                        <p class="m-0"onClick={makePhoneCall}>
                            +91 94286 69848
                            </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row pt-5">
            <div class="col-lg-6 col-md-6 mb-5">
                <a href="/" class="navbar-brand">
                    <h1 class="m-0 mt-n2 display-4 text-primary text-uppercase">Advocate</h1>
                </a>
                <p>
                Justice Through Law, Your Trusted Legal Partners in India
                    
                    </p>
                <div class="d-flex justify-content-start mt-4">
                    <a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="#"><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a class="btn btn-lg btn-outline-light btn-lg-square" href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
                <h4 class="font-weight-semi-bold text-primary mb-4">Popular Links</h4>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Home</a>
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>About</a>
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Services</a>
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Attorney</a>
                    <a class="text-white" href="#"><i class="fa fa-angle-right mr-2"></i>Contact</a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
                <h4 class="font-weight-semi-bold text-primary mb-4">Quick Links</h4>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>FAQs</a>
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Help</a>
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Terms</a>
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Privacy</a>
                     </div>
            </div>
        </div>
        <div class="row p-4 mt-5 mx-0" style={{background: "rgba(256, 256, 256, .05)"}}>
            <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                <p class="m-0 text-white">&copy; <a class="font-weight-bold" href="/">Law Firm</a>. All Rights Reserved.</p>
            </div>
            
        </div>
    </div>
   </>);
}
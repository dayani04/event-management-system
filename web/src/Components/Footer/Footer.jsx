import React from "react";
import "./Footer.css"; // Create a separate CSS file for styles
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <div className="footer-container my-5">
      <footer className="text-center text-lg-start text-white" style={{ backgroundColor: "#7472ee" }}>
        <div className="container p-4 pb-0">
          <section>
            <div className="row">
             

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">EventsPhere</h6>
                <p><a href="AboutUs" className="text-white">About Us</a></p>
                <p><a href="#!" className="text-white">Privacy Policy</a></p>
                <p><a href="ContactUs" className="text-white">Contact Details</a></p>
                <p><a href="VillageOfficerDashBoard" className="text-white">Help</a></p>
              </div>

           
              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
              </div>
            </div>
          </section>

          <hr className="my-3" />

          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                <div className="p-3">
                  © 2024 Copyright
                </div>
              </div>

            
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

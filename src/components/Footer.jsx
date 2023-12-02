import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-tertiary" style={{ padding: "50px 0" }}>
      <div className="container">
        <div className="row justify-content-between ">
          <div className="col-lg-2 col-md-4 w-auto col-6 mb-4">
            <div className="footer-widget">
              <Link to="/">
                <img
                  loading="prelaod"
                  decoding="async"
                  className="img-fluid"
                  width="160"
                  src={require("../images/logo.png")}
                  alt="Bunker Production"
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Link>
            </div>
            <ul
              className="list-unstyled list-inline mb-0 social-icons mt-lg-3"
              style={{ width: 200 }}
            >
              <li className="list-inline-item me-3">
                <Link
                  title="Explorer Facebook Profile"
                  className="text-black"
                  to="https://facebook.com/"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li className="list-inline-item me-3">
                <Link
                  title="Explorer Twitter Profile"
                  className="text-black"
                  to="https://twitter.com/"
                >
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li className="list-inline-item me-3">
                <Link
                  title="Explorer Instagram Profile"
                  className="text-black"
                  to="https://instagram.com/"
                >
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <div className="footer-widget">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="mb-2">
                  <Link to="/about">About</Link>
                </li>
                <li className="mb-2">
                  <Link to="/blog">Blog</Link>
                </li>
                <li className="mb-2">
                  <Link to="/how">How it works</Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-lg-2 col-md-4 w-auto col-6 mb-4"
            // style={{ width: "auto" }}
          >
            <div className="footer-widget">
              <ul
                className="list-unstyled list-inline mb-0 text-lg-center"
                style={{ width: 200 }}
              >
                <li className="list-inline-item me-4">
                  <Link className="text-black" to="privacy-policy.html">
                    Privacy Policy
                  </Link>
                </li>
                <li className="list-inline-item me-4">
                  <Link className="text-black" to="terms.html">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="col-lg-2 col-md-4 col-6 mb-4">
            <div className="footer-widget">
              <h5 className="mb-4 text-primary font-secondary">Help</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="contact.html">Contact Us</Link>
                </li>
                <li className="mb-2">
                  <Link to="faq.html">FAQs</Link>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
        {/* <div className="row align-items-center mt-5 text-center text-md-start">
        
          <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
            <ul className="list-unstyled list-inline mb-0 text-lg-center">
              <li className="list-inline-item me-4">
                <Link className="text-black" to="privacy-policy.html">
                  Privacy Policy
                </Link>
              </li>
              <li className="list-inline-item me-4">
                <Link className="text-black" to="terms.html">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 text-md-end mt-4 mt-md-0">
            <ul className="list-unstyled list-inline mb-0 social-icons">
              <li className="list-inline-item me-3">
                <Link
                  title="Explorer Facebook Profile"
                  className="text-black"
                  to="https://facebook.com/"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li className="list-inline-item me-3">
                <Link
                  title="Explorer Twitter Profile"
                  className="text-black"
                  to="https://twitter.com/"
                >
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li className="list-inline-item me-3">
                <Link
                  title="Explorer Instagram Profile"
                  className="text-black"
                  to="https://instagram.com/"
                >
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;

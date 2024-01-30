import React from "react";
import { Link } from "react-router-dom";

import { Switch, useDarkreader } from "react-darkreader";

function Navbar() {
  const [isDark, { toggle }] = useDarkreader(true);

  return (
    <header className="navigation bg-tertiary">
      <nav className="navbar navbar-expand-xl navbar-light text-center py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              loading="prelaod"
              decoding="async"
              className="img-fluid"
              width="150"
              src={isDark ? require("../images/logo_dark.svg").default : require("../images/logo.svg").default}
              alt="Bunker Production"
              style={{
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {" "}
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/how">
                  How It Works
                </Link>
              </li>
              {/* <li className="nav-item ">
                <a className="nav-link" href="services.html">
                  Services
                </a>
              </li> */}
              <li className="nav-item ">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>

              <li className="nav-item ">
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                > */}
                <Link className="nav-link" to={"#"}>
                  <Switch
                    checked={isDark}
                    onChange={toggle}
                    styling="docusaurus"
                  />
                </Link>
                {/* </div> */}
              </li>

              {/* <li className="nav-item dropdown">
                {" "}
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pages
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item " href="blog.html">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="blog-details.html">
                      Blog Details
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="service-details.html">
                      Service Details
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="faq.html">
                      FAQ&#39;s
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="legal.html">
                      Legal
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="terms.html">
                      Terms &amp; Condition
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="privacy-policy.html">
                      Privacy &amp; Policy
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
            {/* <a href="#!" className="btn btn-outline-primary">
              Log In
            </a>
            <a href="#!" className="btn btn-primary ms-2 ms-lg-3">
              Sign Up
            </a> */}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

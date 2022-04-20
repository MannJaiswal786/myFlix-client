import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
export const Navbar = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light">
      <div className="d-flex align-items-center">
        <a class="navbar-brand" href="#">
          Downtown Cinema
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
                Movies <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link" to="/profile">
                Profile <span class="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <button
        class="nav-link"
        onClick={() => {
          props.onLoggedOut();
        }}
      >
        Logout <span class="sr-only">(current)</span>
      </button>
    </nav>
  );
};

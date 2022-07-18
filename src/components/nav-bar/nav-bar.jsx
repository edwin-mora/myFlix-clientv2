import React from "react";
import { Link } from "react-router-dom";

// styling
import { Navbar, Nav, Button } from "react-bootstrap";
import "./nav-bar.scss";
// export NavView class function
export class NavView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  // function to log out
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  render() {
    const { user } = this.props;
    const pathMovies = `/`;
    const pathProfile = `/users/${user}`;

    if (!user) return null;

    return (
      <Navbar collapseOnSelect expand="lg" sticky="top" id="nav-main">
        <Navbar.Brand id="navbar-logo" href="/">
          myFlix
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" id="nav-link" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav id="nav">
            <Nav.Link
              id="nav-link"
              as={Link}
              to={pathMovies}
              className="link-text"
            >
              Movies
            </Nav.Link>

            <Nav.Link
              id="nav-link"
              as={Link}
              to={pathProfile}
              className="link-text"
            >
              Profile
            </Nav.Link>

            <Nav.Link id="nav-link" to={"/"} onClick={this.onLoggedOut}>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

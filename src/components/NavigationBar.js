import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

class NavigationBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand style={{ color: "orange" }}>
            Feature Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href={"/qib"} style={{ color: "white" }}>
                QIB
              </Nav.Link>
              <Nav.Link href={"/database"} style={{ color: "white" }}>
                Database
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>{" "}
      </React.Fragment>
    );
  }
}

export default NavigationBar;

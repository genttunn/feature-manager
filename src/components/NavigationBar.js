import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class NavigationBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar  expand="lg" style={{backgroundColor: '#3B4252'}}>
          <Navbar.Brand style={{ color: "#8FBCBB" }}>
            Feature Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href={"/grid"} style={{ color: "#ECEFF4" }}>
                Grid
              </Nav.Link>
              <Nav.Link href={"/plot"} style={{ color: "#ECEFF4" }}>
                Plot
              </Nav.Link>
              <Nav.Link href={"/database"} style={{ color: "#ECEFF4" }}>
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

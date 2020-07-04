import React, { Component, useContext,useState,useEffect } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import {themeLight, themeDark} from "../styles/globalStyles";
import { DarkmodeContext } from "../shared/DarkmodeContext";
export default function NavigationBar() {
  const { darkmode, setDarkmode } = useContext(DarkmodeContext);
  const [globalTheme, setGlobalTheme] = useState(themeLight);
  useEffect(() => {
    if (darkmode === true) {
      setGlobalTheme(themeDark);
    } else if (darkmode === false) {
      setGlobalTheme(themeLight);
    }
  }, [darkmode]);
  return (
    <React.Fragment>
      <Navbar expand="lg" style={globalTheme.navigationBar}>
        <Navbar.Brand style={globalTheme.logo}>Feature Manager</Navbar.Brand>
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
          <Image
            src={require(darkmode === false
              ? "../assets/moon-color.png"
              : "../assets/sun-color.png")}
            style={{ width: 25, height: 25 }}
            onClick={() => setDarkmode(!darkmode)}
          />
        </Navbar.Collapse>
      </Navbar>{" "}
    </React.Fragment>
  );
}

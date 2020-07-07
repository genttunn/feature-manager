import React, { Component, useContext, useState, useEffect } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { themeLight, themeDark } from "../styles/globalStyles";
import { DarkmodeContext } from "../shared/DarkmodeContext";
export default function NavigationBar() {
  const { darkmode, setDarkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;

  let changeTheme = (state) => {
    state === true
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
    setDarkmode(state);
  };

  return (
    <React.Fragment>
      <Navbar expand="lg" style={theme.navigationBar}>
        <Navbar.Brand style={theme.logo}>Feature Manager</Navbar.Brand>
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
            onClick={() => changeTheme(!darkmode)}
          />
        </Navbar.Collapse>
      </Navbar>{" "}
    </React.Fragment>
  );
}

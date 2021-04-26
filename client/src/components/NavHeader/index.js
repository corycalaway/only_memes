import React from "react";
import Auth from "../../utils/auth";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function NavHeader() {
  const tabs = [];

  let Logged = () => {
    if (Auth.loggedIn()) {
      return (
        <>
          <Nav.Link href="/" onClick={() => Auth.logout()}>
            Logout
          </Nav.Link>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/community">Community</Nav.Link>
          <Nav.Link href="/aboutus">About Us</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </>
      );
    }
  };

  let Profile = () => {
    if (Auth.loggedIn()) {
      return (
        <>
          <Nav.Link>My Memes</Nav.Link>
        </>
      );
    } else {
      return;
    }
  };

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#Home">OnlyMemes!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {tabs.map((tab) => (
            <Nav.Link
              key={tab}
              href={"#" + tab.toLowerCase()}
              //onClick={() => props.handlePageChange(tab)}
            >
              {tab}
            </Nav.Link>
          ))}
          {Profile()}
        </Nav>
        <NavDropdown.Divider />
        <Nav>{Logged()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavHeader;

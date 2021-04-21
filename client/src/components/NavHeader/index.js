import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NavHeader() {
  const tabs = ["Home", "My Memes", "Community", 'About Us', "SignIn/SignOut"];
  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>OnlyMemes!</Navbar.Brand>
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavHeader;

import React from "react";
import Auth from "../../utils/auth";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME } from "../../utils/queries";

function NavHeader() {
  let Credit = () => {
    let { data } = useQuery(QUERY_ME);
    let credit;

    if (data) {
      credit = data.me.credit;
      return (
        <>
          <NavDropdown.Divider />
          <Button href="/store" variant="outline-light">
            {credit} credits <i className="fas fa-money-bill"></i>
          </Button>
        </>
      );
    }
  };

  let Logged = () => {
    if (Auth.loggedIn()) {
      return (
        <>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/store">Store</Nav.Link>
          <Nav.Link href="/profile">My Memes</Nav.Link>
          <Nav.Link href="/community">Community</Nav.Link>
          <Nav.Link href="/aboutus">About Us</Nav.Link>
          <Nav.Link href="/" onClick={() => Auth.logout()}>
            Logout
          </Nav.Link>
          {Credit()}
        </>
      );
    } else {
      return (
        <>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/aboutus">About Us</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </>
      );
    }
  };

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">🦾 OnlyMemes!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <NavDropdown.Divider />
        <Nav>{Logged()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavHeader;

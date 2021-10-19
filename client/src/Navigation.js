import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => {
    return(
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">GiftCards</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Buy Giftcards</Nav.Link>
        <Nav.Link href="/SellGiftcard">Sell Giftcards</Nav.Link>
      </Nav>
    </Container>
  </Navbar>);
}

export default Navigation;
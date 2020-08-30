import React from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";

function MinionNavBar() {
    return (

        <Container className="nav-bar">
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Minion Seller</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Início</Nav.Link>
                    <Nav.Link href="/#features">Recursos</Nav.Link>
                    <Nav.Link href="/#reviews">Avaliações</Nav.Link>
                    <Nav.Link href="/reservation">Reservas</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default MinionNavBar;
import React from "react";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

export const HeaderNav = () => {
    return(
        <Navbar sticky="top" className="blackback navbar-dark navbar-custom" expand="lg md">
        <Container fluid>
        <Navbar.Brand href="/" className = 'greycliff' style={{fontSize: '30px', padding:'0px 8px'}}>
        <img src="/Assets/2D/HGL512.png" width="35" height="35" style={{marginRight:'5px'}}/>Hakgyun Lee
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end" style={{fontSize: '15px', padding:'0px 8px'}}>
                <Nav>
                <Nav.Link href="/2D" className = "navbar-custom-item">2D</Nav.Link>
                <Nav.Link href="/3D" className = "navbar-custom-item">3D</Nav.Link>
                <Nav.Link href="/Game" className = "navbar-custom-item">Game</Nav.Link>
                <Nav.Link href="/Posts" className = "navbar-custom-item">All Posts</Nav.Link>
                <Nav.Link href="/Contact" className = "navbar-custom-item">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )   
}
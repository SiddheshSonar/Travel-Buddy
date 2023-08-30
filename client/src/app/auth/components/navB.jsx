"use client"
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/TB-logo.png'
import Image from 'next/image'

const NavB = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href="#home">
                    {/* <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '} */}
                    <Image src={Logo} roundedCircle width="50"
                        height="50" className="d-inline-block align-top"
                    />
                    Travel Buddy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#features">Home</Nav.Link>
                        <Nav.Link href="#pricing">Chat</Nav.Link>
                        <Nav.Link href="#pricing">Friends</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavB;
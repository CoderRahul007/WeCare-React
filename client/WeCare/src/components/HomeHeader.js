import { Navbar, Container } from "react-bootstrap";
import React from 'react';

export default function HomeHeader(){
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">WeCare</Navbar.Brand>
                <ul className="navbar-nav mr-auto"></ul>
                <ul className="navbar-nav">
                    <li className="nav-item"> 
                        <span className="nav-link text-light">Call us: 080 2233447</span>
                    </li>
                </ul>
      </Navbar>
  );
};
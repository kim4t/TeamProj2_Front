import React from "react";
import {Navbar, Container,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends React.Component {

    clearStorage(){
       /* localStorage.setItem("user", "");
        localStorage.setItem("status", "");
        localStorage.setItem("token", ""); */
        localStorage.clear();
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" expand="lg">
                    <Container >
                        <Navbar.Brand href="/summary" style={{color:'white'}}>TimeSheets</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link style={{color:'white'}} href="/summary">Summary</Nav.Link>
                                <Nav.Link style={{color:'white'}} href="/timeSheet">TimeSheet</Nav.Link>
                                <Nav.Link style={{color:'white'}} href="/profile">Profile</Nav.Link>
                                <Nav.Link style={{color:'white'}} href="/login" onClick = {this.clearStorage}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;
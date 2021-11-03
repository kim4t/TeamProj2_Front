import React from "react";
import {Navbar, Container,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/summary">TimeSheets</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/summary">Summary</Nav.Link>
                                <Nav.Link href="/timeSheet">TimeSheet</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/localStoregService';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { access_token } = getToken();

    const handleLogout = () => {
        dispatch(unSetUserToken({ access_token: null }));
        removeToken();
        navigate('/login');
    };

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
            <Container>
                <Link to="/">
                    <Navbar.Brand>Ecom-Frontend</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </Nav>
                    <Nav>
                        {access_token ? (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        ) : (
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;

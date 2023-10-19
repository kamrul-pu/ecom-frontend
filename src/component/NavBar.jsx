import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { unSetUserToken } from '../features/authSlice'
import { getToken, removeToken } from '../services/localStoregService'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { access_token } = getToken()

    const handleLogout = () => {
        dispatch(unSetUserToken({ access_token: null }))
        removeToken()
        navigate('/login')
    }
    return (
        <Navbar collapseOnSelect expand="lg" variant='dark' bg='dark'>
            <Container>
                <Navbar.Brand href="/">Ecom-Frontend</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {access_token ?
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            :
                            <Nav.Link href="/login">Login</Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
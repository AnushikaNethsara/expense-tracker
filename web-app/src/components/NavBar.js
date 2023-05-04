import React, { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        navigate('/')
    }, [user])

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <Navbar bg="dark" variant="dark" expand="md" className="justify-content-between">
            <Container>
                <Navbar.Brand as={Link} to="/dashboard">
                    <FontAwesomeIcon icon={faMoneyBillAlt} className="mx-1" color='#7cac93'/>
                    Expense-Tracker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ml-auto w-100 justify-content-end">
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOut} className="mx-1" />
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;

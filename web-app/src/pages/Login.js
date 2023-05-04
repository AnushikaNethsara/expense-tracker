import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import img1 from "../assets/login.svg";
import { toast } from 'react-toastify';
import * as formValidator from "../shared/validator";
import "../App.css"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/dashboard')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        if (formValidator.stringIsNullEmptyOrWhiteSpace(email))
            return toast.error("Please enter email")
        else if (formValidator.isInvalidEmail(email))
            return toast.error("Invalid email!")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(password))
            return toast.error("Please enter password")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(password))
            return toast.error("Please enter password")


        const userData = {
            email,
            password,
        }
        console.log(userData);
        dispatch(login(userData))

    }

    return (
        <Container fluid>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card className='card-custom'>
                        <Card.Body className='p-5'>
                            <Row className="justify-content-center align-items-center mt-3">
                                <Col md={6}>
                                    <img
                                        src={img1}
                                        alt="placeholder"
                                        className="img-fluid"
                                    />
                                </Col>
                                <Col md={6}>
                                    <h2 className="mb-4 text-uppercase">Login</h2>
                                    <Form onSubmit={onSubmit}>
                                        <Form.Group>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="email"
                                                name="email"
                                                onChange={onChange}
                                                placeholder="Enter email"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                id="password"
                                                name="password"
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <p className="mt-3">
                                                Don't have an account yet?{" "}
                                                <Link className="font-weight-bold" to="/register">
                                                    {" "}
                                                    Register
                                                </Link>
                                            </p>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Login
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom';
import img1 from "../assets/signup.svg";
import * as formValidator from "../shared/validator";
import Loading from '../components/Loading';
import "../App.css";
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',

        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',

        password: '',
        confirmPassword: ''
    });
    const { firstName, lastName, dob, email, addressLine1, addressLine2, city, country, password, confirmPassword } = formData;
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        console.log(isError);
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/dashboard')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()

        if (formValidator.stringIsNullEmptyOrWhiteSpace(firstName))
            return toast.error("Please enter first name")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(lastName))
            return toast.error("Please enter last name")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(email))
            return toast.error("Please enter email")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(dob))
            return toast.error("Please enter date of birth")

        else if (formValidator.stringIsNullEmptyOrWhiteSpace(addressLine1))
            return toast.error("Please enter Address Line 1")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(city))
            return toast.error("Please enter City")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(country))
            return toast.error("Please enter Country")

        else if (formValidator.stringIsNullEmptyOrWhiteSpace(password))
            return toast.error("Please enter password")
        else if (formValidator.isNonEqualStrings(password, confirmPassword))
            return toast.error("Passwords do not match")


        const userData = {
            firstName,
            lastName,
            dateOfBirth: dob,
            email,
            addressLine1,
            addressLine2,
            city,
            country,
            password,
            confirmPassword
        }
        dispatch(register(userData))
        console.log(userData);

    }

    if (isLoading)
        <Loading />

    return (
        <Container fluid>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card className='card-custom'>
                        <Card.Body className='p-5'>
                            <Form onSubmit={onSubmit}>
                                <Row className="justify-content-center">
                                    <img
                                        src={img1}
                                        style={{ width: "50%", height: "70%" }}
                                        alt="placeholder"
                                        className="img-fluid mx-auto"
                                    />
                                </Row>
                                <h2 className="mb-4 text-center text-uppercase" >Register</h2>
                                <Row className="justify-content-center mt-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                onChange={onChange}
                                                placeholder="First Name"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="email"
                                                name="email"
                                                onChange={onChange}
                                                placeholder="email"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Address Line 1</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Address Line 1"
                                                id="addressLine1"
                                                name="addressLine1"
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="City"
                                                id="city"
                                                name="city"
                                                onChange={onChange}
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
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                onChange={onChange}
                                                placeholder="Last Name"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Date of Birth</Form.Label>
                                            <Form.Control
                                                type="date"
                                                id="dob"
                                                name="dob"
                                                onChange={onChange}
                                                placeholder="Select Date of Birth"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Address Line 2</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Address Line 2"
                                                id="addressLine2"
                                                name="addressLine2"
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Country"
                                                id="country"
                                                name="country"
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirm Password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <p className="text-center mt-3">
                                        Already have an account?{" "}
                                        <Link className="font-weight-bold" to="/">
                                            {" "}
                                            Login
                                        </Link>
                                    </p>
                                </Form.Group>
                                <Row className="justify-content-center align-items-center mt-2">
                                    <Button variant="primary" type="submit" className='mt-2' style={{ width: '200px' }}>
                                        Register
                                    </Button>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
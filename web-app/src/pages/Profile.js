import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import img1 from "../assets/signup.svg";
import * as formValidator from "../shared/validator";
import Loading from '../components/Loading';
import "../App.css";
import { toast } from 'react-toastify';
import { getUserById, editProfile } from '../features/user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import avatar from "../assets/avatar.png";


const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(
        (state) => state.auth
    )
    const { profile, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.user
    )
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        photo: ''
    });
    const [profilePhoto, setProfilePhoto] = useState("")

    const { firstName, lastName, dob, email, addressLine1, addressLine2, city, country, photo } = formData;

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/')
        }
        dispatch(getUserById())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData({
                firstName: profile.firstName,
                lastName: profile.lastName,
                dob: profile.dateOfBirth?.split("T")[0] || '',
                email: profile.email,
                addressLine1: profile.addressLine1,
                addressLine2: profile.addressLine2,
                city: profile.city,
                country: profile.country,
                photo: profile.photo
            });
        }
    }, [profile]);

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


        const userData = {
            firstName,
            lastName,
            dateOfBirth: dob,
            addressLine1,
            addressLine2,
            city,
            country
        }
        const formData = new FormData();
        if (profilePhoto)
            formData.append('photo', profilePhoto);
        formData.append('userData', JSON.stringify(userData));
        dispatch(editProfile(formData))
    }

    return (
        <Container fluid>
            <h1 className='text-center text-uppercase my-3'>Profile</h1>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className='card-custom'>
                        <Card.Body className='p-5'>
                            <div className='text-center mb-5'>
                                <Image
                                    src={photo ? process.env.REACT_APP_API_URL + "public/" + photo : avatar}
                                    alt='Profile Picture'
                                    width='100px'
                                    height='100px%'
                                    className='rounded-circle'
                                />
                            </div>
                            <Form onSubmit={onSubmit}>
                                <Row className="justify-content-center mt-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={firstName}
                                                onChange={onChange}
                                                placeholder="First Name"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="email"
                                                readOnly={true}
                                                value={email}
                                                name="email"
                                                onChange={onChange}
                                                placeholder="email"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Address Line 1</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={addressLine1}
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
                                                value={city}
                                                placeholder="City"
                                                id="city"
                                                name="city"
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Profile Photo</Form.Label>
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="photo"
                                                    name="photo"
                                                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                                                />
                                                <label className="custom-file-label" htmlFor="photo">
                                                    <FontAwesomeIcon icon={faUpload} className='mx-1' />
                                                    {photo ? "Upload New Profile Picture" : "Upload Profile Picture"}
                                                </label>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={lastName}
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
                                                value={dob}
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
                                                value={addressLine2}
                                                name="addressLine2"
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Country"
                                                value={country}
                                                id="country"
                                                name="country"
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br />
                                <Row className="justify-content-center align-items-center mt-3">
                                    <Button variant="success" type="submit" className='mt-2' style={{ width: '150px' }}>
                                        <FontAwesomeIcon icon={faSave} className='mx-1' />
                                        Save
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

export default Profile;
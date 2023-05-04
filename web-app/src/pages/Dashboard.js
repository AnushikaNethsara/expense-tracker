import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import DashboardCard from '../components/DasboardCard';
import Expenses from '../components/Expenses';
import { getSalary, reset } from '../features/salary/salarySlice'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddSalaryModal from '../components/AddSalaryModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showSalaryModal, setSalaryEditModal] = useState(false);

    const { user } = useSelector((state) => state.auth)
    const { salary, isLoading, isError, message } = useSelector(
        (state) => state.salary
    )

    const { totalExpenses } = useSelector((state) => state.expenses)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/')
        }
        dispatch(getSalary())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch]);

    const handleSalaryModalClose = () => setSalaryEditModal(false);
    const handleSalaryModalShow = () => setSalaryEditModal(true);

    const addExpence = () => {
        navigate('/addexpense')
    }

    return (
        <Container >
            <h1 className='text-center text-uppercase my-3'>Dashboard</h1>
            <Row>
                <Col md={4}>
                    <DashboardCard color="success" heading="Total Salary" text={salary} cardfunction={handleSalaryModalShow} icon={salary == 0 ? faPlusCircle : faEdit} />
                </Col>
                <Col md={4}>
                    <DashboardCard color="info" heading="Expenses " text={totalExpenses} />
                </Col>
                <Col md={4}>
                    <DashboardCard color="secondary" heading="Total Leftover " text={salary - totalExpenses} />
                </Col>
            </Row>
            <AddSalaryModal show={showSalaryModal} handleClose={handleSalaryModalClose} handleShow={handleSalaryModalShow} />
            <div className="d-flex justify-content-end mb-2 mt-4">
                <Button variant="primary" onClick={addExpence}>
                    Add Expence
                    <FontAwesomeIcon icon={faPlus} className='mx-1' />
                </Button>
            </div>
            <Expenses />
        </Container>
    );
}

export default Dashboard;
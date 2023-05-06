import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import DashboardCard from '../components/DasboardCard';
import Expenses from '../components/Expenses';
import { getSalary, reset } from '../features/salary/salarySlice'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddSalaryModal from '../components/AddSalaryModal';
import ReportsModal from '../components/ReportsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlusCircle, faEdit, faBurger, faCab, faFilm, faLightbulb, faHome, faFile, faArchive } from '@fortawesome/free-solid-svg-icons';
import DasboardCategoryCard from '../components/DasboardCategoryCard';
import { getExpenses, deleteExpense } from '../features/expenses/expenseSlice'
import constants from '../constants/constants';

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showSalaryModal, setSalaryEditModal] = useState(false);
    const [showReportModal, setReportEditModal] = useState(false);

    const { user } = useSelector((state) => state.auth)
    const { salary, isLoading, isError, message } = useSelector(
        (state) => state.salary
    )
    const { expenses, isLoadingExpenses, isErrorExpenses, messageExpenses } = useSelector(
        (state) => state.expenses
    )

    const { totalExpenses } = useSelector((state) => state.expenses)

    const categoryTotals = expenses.reduce((totals, expense) => {
        const category = expense.category;
        const amount = expense.totalAmount;
        if (!totals[category]) {
            totals[category] = amount;
        } else {
            totals[category] += amount;
        }
        return totals;
    }, {});
    
    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/')
        }
        dispatch(getSalary())
        dispatch(getExpenses())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch, isErrorExpenses, messageExpenses]);

    const handleSalaryModalClose = () => setSalaryEditModal(false);
    const handleSalaryModalShow = () => setSalaryEditModal(true);

    const handleReportModalClose = () => setReportEditModal(false);
    const handleReportModalShow = () => setReportEditModal(true);

    const addExpence = () => {
        navigate('/addexpense')
    }

    const addArchive = () => {
        navigate('/archived')
    }

    return (
        <Container >
            <h1 className='text-center text-uppercase my-3'>Dashboard</h1>
            <Row>
                <Col md={4}>
                    <DashboardCard color="#1F3F49" heading="Total Salary" text={salary} cardfunction={handleSalaryModalShow} icon={salary == 0 ? faPlusCircle : faEdit} />
                </Col>
                <Col md={4}>
                    <DashboardCard color="#1C4E80" heading="Expenses " text={totalExpenses} />
                </Col>
                <Col md={4}>
                    <DashboardCard color="#488A99" heading="Total Leftover " text={salary - totalExpenses} />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <DasboardCategoryCard color="#F2B880" heading="Food" text={categoryTotals.Food} icon={faBurger} />
                </Col>
                <Col>
                    <DasboardCategoryCard color="#CED2CC" heading="Transportation" text={categoryTotals.Transportation} icon={faCab} />
                </Col>
                <Col>
                    <DasboardCategoryCard color="#E3D3E4" heading="Entertainment" text={categoryTotals.Entertainment} icon={faFilm} />
                </Col>
                <Col>
                    <DasboardCategoryCard color="#E6E6FA" heading="Utilities" text={categoryTotals.Utilities} icon={faLightbulb} />
                </Col>
                <Col>
                    <DasboardCategoryCard color="#A0CED9" heading="Rent" text={categoryTotals.Rent} icon={faHome} />
                </Col>
            </Row>
            <AddSalaryModal show={showSalaryModal} handleClose={handleSalaryModalClose} handleShow={handleSalaryModalShow} />
            <ReportsModal show={showReportModal} handleClose={handleReportModalClose} handleShow={handleReportModalShow} categoryTotals={categoryTotals} />
            <div className="d-flex justify-content-end mb-2 mt-4">
                <Button variant="primary" onClick={addExpence} className=' mx-2'>
                    Add Expence
                    <FontAwesomeIcon icon={faPlus} className='mx-1' />
                </Button>
                <Button variant="secondary" onClick={addArchive} className=' mx-2'>
                    Archived
                    <FontAwesomeIcon icon={faArchive} className='mx-1' />
                </Button>
                <Button variant="success" onClick={handleReportModalShow} >
                    Reports
                    <FontAwesomeIcon icon={faFile} className='mx-1' />
                </Button>
            </div>
            <Expenses expenses={expenses} type={constants.DisplayTypes.DASHBOARD} />
        </Container>
    );
}

export default Dashboard;
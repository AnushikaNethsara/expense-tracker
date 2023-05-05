import React, { useRef, useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Button, Modal, Form, Container, Row, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { getExpenses, reset } from '../features/expenses/expenseSlice'
import constants from '../constants/constants';
import Expenses from '../components/Expenses';
import DoughnutChart from '../components/DoughnutChart';
import "../App.css"

const CategoryWiseReportContent = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { expenses } = useSelector((state) => state.expenses)
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const selectedExpenses = expenses.filter(expense => {
        const category = expense.category.toLowerCase();
        return location.state.selectedTypes[category];
    });
    useEffect(() => {

        dispatch(getExpenses())

        return () => {
            dispatch(reset())
        }
    }, [navigate, dispatch]);

    return (
        <Container >
            <h2 className='text-center text-uppercase text-decoration-underline mt-3'>
                Category Report
            </h2>
            <h4 className='text-center text-uppercase text-muted'>
                (
                {Object.keys(location.state.selectedTypes)
                    .filter(type => location.state.selectedTypes[type])
                    .join(", ")} )
            </h4>
            <div className="chart-container my-5">
                <DoughnutChart chartData={location.state.categoryTotals}/>
            </div>
            <Expenses
                expenses={selectedExpenses}
                type={constants.DisplayTypes.REPORT} />
        </Container>
    );
};

const CategoryWiseReport = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, dispatch]);


    return (
        <div>
            <Container >
                <div>
                    <PrintButton componentRef={componentRef} />
                </div>
            </Container>
            <div ref={componentRef}>
                <CategoryWiseReportContent />
            </div>
        </div>

    );
};

export default CategoryWiseReport;

const PrintButton = ({ componentRef }) => (
    <div className="d-flex justify-content-end mb-2 mt-4">
        <ReactToPrint
            trigger={() => (
                <Button variant="success" >
                    Print
                    <FontAwesomeIcon icon={faPrint} className='mx-1' />
                </Button>
            )}
            content={() => componentRef.current}
        />
    </div>

);

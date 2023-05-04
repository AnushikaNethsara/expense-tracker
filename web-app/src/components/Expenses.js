import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getExpenses, reset, deleteExpense } from '../features/expenses/expenseSlice'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Expenses = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { expenses, isLoading, isError, message } = useSelector(
        (state) => state.expenses
    )

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/')
        }
        dispatch(getExpenses())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch]);

    const editExpense = (expense) => {
        navigate('/addexpense', { state: { expense: expense } });
    }

    return (
        <Card className='card-custom'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Expense name</th>
                        <th>Date</th>
                        <th>Total amount(LKR)</th>
                        <th>Notes</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses && expenses.length != 0 ? expenses.map((item) => {
                            const date = new Date(item.date);
                            return (
                                <tr key={item._id}>
                                    <td>{item.expenseName}</td>
                                    <td>{item.date ? new Date(item.date).toISOString().slice(0, 10) : ''}</td>
                                    <td>{item.totalAmount.toLocaleString()}</td>
                                    <td>{item.notes}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button variant="danger"
                                                onClick={() => dispatch(deleteExpense(item._id))}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                            <Button variant="primary" onClick={() => editExpense(item)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <p className='p-5 text-center'>No Data to Display</p>
                        )
                    }
                </tbody>
            </Table>
        </Card>
    );
}

export default Expenses;
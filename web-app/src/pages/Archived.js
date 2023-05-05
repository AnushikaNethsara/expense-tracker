import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getArchivedExpenses, reset, unArchiveExpense } from '../features/expenses/expenseSlice'
import { faTrash, faEdit, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Archived = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { archivedExpenses, isLoadingExpenses, isErrorExpenses, messageExpenses } = useSelector(
        (state) => state.expenses
    )

    useEffect(() => {
        if (isErrorExpenses) {
            console.log(messageExpenses)
        }

        if (!user) {
            navigate('/')
        }
        console.log("message")
        dispatch(getArchivedExpenses())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isErrorExpenses, messageExpenses, dispatch]);

    const handleUnArchiveExpense = (expense) => {
        const updatedExpense = {
            _id: expense._id,
            archived: false
        }
        dispatch(unArchiveExpense(updatedExpense))
    }

    return (
        <Container >
            <h1 className='text-center text-uppercase'>Archived Expense</h1>
            <Card className='card-custom p-5'>
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
                            archivedExpenses && archivedExpenses.length != 0 ? archivedExpenses.map((item) => {
                                const date = new Date(item.date);
                                return (
                                    <tr key={item._id}>
                                        <td>{item.expenseName}</td>
                                        <td>{item.date ? new Date(item.date).toISOString().slice(0, 10) : ''}</td>
                                        <td>{item.totalAmount.toLocaleString()}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.category}</td>
                                        {
                                            <td>
                                                <ButtonGroup>
                                                    <Button variant="secondary" onClick={() => handleUnArchiveExpense(item)}>
                                                        <FontAwesomeIcon icon={faFolderOpen} />
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        }
                                    </tr>
                                )
                            }) : (
                                <td className='p-5 text-center'>No Data to Display</td>
                            )
                        }
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}

export default Archived;
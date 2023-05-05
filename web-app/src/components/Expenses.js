import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getExpenses, reset, deleteExpense, archiveExpense } from '../features/expenses/expenseSlice'
import { faTrash, faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Expenses = ({ expenses, type }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)


    const editExpense = (expense) => {
        navigate('/addexpense', { state: { expense: expense } });
    }

    const handleArchiveExpense = (expense) => {
        console.log(expense);
        const updatedExpense = {
            _id: expense._id,
            archived: true
        }
        dispatch(archiveExpense(updatedExpense))
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
                        {
                            type == 1 ? <th>Action</th> : null
                        }

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
                                    {
                                        type == 1 ? (
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
                                                    <Button variant="secondary" onClick={() => handleArchiveExpense(item)}>
                                                        <FontAwesomeIcon icon={faArchive} />
                                                    </Button>
                                                </ButtonGroup>
                                            </td>

                                        ) : null
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
    );
}

export default Expenses;
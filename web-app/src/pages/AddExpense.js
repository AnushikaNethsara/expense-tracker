import { useState, useEffect } from 'react';
import { Button, Modal, Form, Container, Row, Card } from 'react-bootstrap';
import * as formValidator from "../shared/validator";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { createExpense, updateExpense } from '../features/expenses/expenseSlice'
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave,faCancel } from '@fortawesome/free-solid-svg-icons';


const AddExpense = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();

    const { user } = useSelector((state) => state.auth)
    const { expense, isLoading, isError, message } = useSelector(
        (state) => state.expenses
    )

    const [formData, setFormData] = useState({
        expenseName: location.state?.expense?.expenseName ? location.state?.expense?.expenseName : '',
        date: location.state?.expense?.date ? location.state?.expense?.date : '',
        totalAmount: location.state?.expense?.totalAmount ? location.state?.expense?.totalAmount : '',
        notes: location.state?.expense?.notes ? location.state?.expense?.notes : '',
        category: location.state?.expense?.category ? location.state?.expense?.category : null,
    });
    const { expenseName, date, totalAmount, notes, category } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const clearFields = () => {
        setFormData({
            expenseName: '',
            date: '',
            totalAmount: '',
            notes: '',
            category: '',
        });
    }

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/')
        }
    }, [user, navigate, isError, message, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault()
        if (formValidator.stringIsNullEmptyOrWhiteSpace(expenseName))
            return toast.error("Please enter Expense Name")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(date))
            return toast.error("Please enter Expense Date")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(totalAmount.toString()))
            return toast.error("Please enter Total Amount")
        else if (totalAmount < 0)
            return toast.error("Please enter a valid Total Amount")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(notes))
            return toast.error("Please enter Note")
        else if (formValidator.stringIsNullEmptyOrWhiteSpace(category))
            return toast.error("Please enter a valid Category")

        const expenseData = {
            id: location.state?.expense?._id ? location.state?.expense?._id : null,
            expenseName,
            date,
            totalAmount,
            notes,
            category,
        }

        if (location.state?.expense?._id)
            dispatch(updateExpense(expenseData))

        else
            dispatch(createExpense(expenseData))
        clearFields();
        navigate('/dashboard');
    }

    const onCancel = () => {
        navigate('/dashboard');
    }

    return (
        <Container >
            <h1 className='text-center text-uppercase'>Add Expense</h1>
            <Card className='card-custom p-5'>
                <Form>
                    <Form.Group>
                        <Form.Label>Expense Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="expenseName"
                            name="expenseName"
                            onChange={onChange}
                            value={expenseName}
                            placeholder="Enter expense name"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            id="date"
                            name="date"
                            value={
                                date.split("T")[0]
                            }
                            onChange={onChange}
                            placeholder="Enter date"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Total Amount</Form.Label>
                        <Form.Control
                            type="number"
                            id="totalAmount"
                            name="totalAmount"
                            value={totalAmount}
                            min={0}
                            onChange={onChange}
                            placeholder="Enter total amount"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="notes"
                            value={notes}
                            name="notes"
                            onChange={onChange}
                            placeholder="Enter notes"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            id="category"
                            name="category"
                            onChange={onChange}
                            value={category}
                            defaultValue="default"
                        >
                            <option value="default" disabled>Select category</option>
                            <option value="Food">Food</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Rent">Rent</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <div className="row d-flex justify-content-end">
                    <Button variant="secondary" className='mt-2' style={{ width: '150px' }} onClick={onCancel}>
                        <FontAwesomeIcon icon={faCancel} className='mx-1' />
                        Cancel
                    </Button>
                    <Button variant="success" className='mt-2 mx-2' style={{ width: '150px' }} onClick={onSubmit}>
                        <FontAwesomeIcon icon={faSave} className='mx-1' />
                        Save
                    </Button>
                </div>
            </Card>

        </Container>
    );
}

export default AddExpense;
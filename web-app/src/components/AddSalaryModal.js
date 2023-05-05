import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Container, Row, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getSalary, createSalary, reset } from '../features/salary/salarySlice'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';


const AddSalaryModal = ({ show, handleClose, handleShow }) => {
    const dispatch = useDispatch()
    const { salary, isLoading, isError, message } = useSelector(
        (state) => state.salary
    )
    const [newSalary, setNewSalary] = useState(salary);

    useEffect(() => {

        dispatch(getSalary())
        setNewSalary(salary);
        return () => {
            dispatch(reset())
        }
    }, [isError, message, dispatch]);

    const addSalary = () => {
        if (newSalary <= 0)
            return toast.error("Please enter a valid salary")
        dispatch(createSalary({ salary: newSalary }))
        handleClose();
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{salary == 0 ? "Add Salary" : "Edit Salary"}{salary}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Total Salary</Form.Label>
                            <Form.Control
                                type="number"
                                id="salary"
                                name="salary"
                                min={0}
                                onChange={(e) => setNewSalary(e.target.value)}
                                value={newSalary ? newSalary : salary}
                                placeholder="Enter salary"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <FontAwesomeIcon icon={faCancel} className='mx-1' />
                        Close
                    </Button>
                    <Button variant="success" onClick={addSalary}>
                        <FontAwesomeIcon icon={faSave} className='mx-1' />
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSalaryModal;
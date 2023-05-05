import { useState, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faEye } from '@fortawesome/free-solid-svg-icons';
import CategoryWiseReport from '../reports/CategoryWiseReport';
import { useNavigate } from 'react-router-dom';


const GenerateReportModal = ({ show, handleClose, categoryTotals }) => {
    const componentRef = useRef();
    const navigate = useNavigate()
    const [selectedTypes, setSelectedTypes] = useState({
        transportation: false,
        rent: false,
        food: false,
        utilities: false,
        entertainment: false,
    })

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target
        setSelectedTypes((prevSelectedTypes) => ({
            ...prevSelectedTypes,
            [name]: checked,
        }))
    }

    const handleViewReport = () => {
        console.log(selectedTypes);
        navigate('/report', { state: { selectedTypes: selectedTypes, categoryTotals: categoryTotals } })
    };

    return (
        <Modal show={show} onHide={handleClose} centered keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Generate Reports</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Transportation"
                        name="transportation"
                        checked={selectedTypes.transportation}
                        onChange={handleCheckboxChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Rent"
                        name="rent"
                        checked={selectedTypes.rent}
                        onChange={handleCheckboxChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Food"
                        name="food"
                        checked={selectedTypes.food}
                        onChange={handleCheckboxChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Utilities"
                        name="utilities"
                        checked={selectedTypes.utilities}
                        onChange={handleCheckboxChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Entertainment"
                        name="entertainment"
                        checked={selectedTypes.entertainment}
                        onChange={handleCheckboxChange}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    <FontAwesomeIcon icon={faCancel} className="mx-1" />
                    Close
                </Button>
                <Button variant="success" onClick={handleViewReport}>
                    <FontAwesomeIcon icon={faEye} className="mx-1" />
                    View Report
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GenerateReportModal;

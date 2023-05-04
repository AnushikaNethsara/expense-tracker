import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';



const DasboardCategoryCard = ({ color, heading, text, icon }) => {
    return (
        <Card className='card-custom mt-2 text-uppercase' style={{ backgroundColor: color, cursor: "pointer" }} text="dark">
            <Card.Body>
                <div className="d-flex align-items-center">
                    <Card.Subtitle className="flex-grow-1">{heading}</Card.Subtitle>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <Card.Text>
                    {text ? text.toLocaleString() : 0}{" LKR"}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default DasboardCategoryCard;
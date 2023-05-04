import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';



const DashboardCard = ({ color, heading, text, cardfunction, icon }) => {
    return (
        <Card className='card-custom' bg={color} text="white">
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{heading}</Card.Title>
                    </Col>
                    {
                        cardfunction ? (
                            <Col xs="auto" >
                                <FontAwesomeIcon icon={icon} onClick={cardfunction} style={{ cursor: "pointer" }} />
                            </Col>
                        ) : (<></>)
                    }
                </Row>
                <Card.Text>
                    {text.toLocaleString()}{" LKR"}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default DashboardCard;
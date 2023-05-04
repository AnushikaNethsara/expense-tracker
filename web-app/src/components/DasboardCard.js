import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';



const DashboardCard = ({ color, heading, text, cardfunction, icon }) => {
    return (
        <Card className='card-custom mt-2 text-uppercase font-weight-bold' style={{ backgroundColor: color }} text="white">
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
                <hr />
                <Card.Text>
                    {text ? text.toLocaleString() : 0}{" LKR"}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default DashboardCard;
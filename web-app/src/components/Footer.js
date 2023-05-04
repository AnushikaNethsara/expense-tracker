import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../App.css"

const Footer = () => {
    return (
        <div style={{ marginTop: "5%" }}>
            <footer className="footer mt-auto py-3" >
                <Container>
                    <Row>
                        <Col md={6}>
                            <p>&copy; 2023 Expense-Tracker</p>
                        </Col>
                        <Col md={6}>
                            <ul className="list-inline text-md-right">
                                <li className="list-inline-item">
                                    <a href="#">Privacy Policy</a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">Terms of Use</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default Footer;







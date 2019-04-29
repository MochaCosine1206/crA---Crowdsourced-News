import React from "react";
import { Col, Row, Container } from "../components/Grid";
import { Link } from "react-router-dom";


function NoMatch() {
    return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <div className="jumbotron">
                        <h1>404 Page Not Found</h1>
                        <h1>
                            <span role="img" aria-label="Face With Rolling Eyes Emoji">
                                🙄
                        </span>
                        </h1>
                        <Link to="/post/all">If you aren't sure, you could always go here.</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default NoMatch;

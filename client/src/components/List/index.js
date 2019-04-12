import React from "react";
import "./style.css";
import { Container, Row, Col } from "../Grid";
import UserContainer from "../UserContainer"



// This file exports both the List and ListItem components

export function List({ children }) {
    return (
        <div className="list-overflow-container">
            <ul className="list-group">{children}</ul>
        </div>
    );
}

export function ListItem(props) {
    let span;

        if (props.sentiment < 0) {
            span =  <span 
            className="badge badge-pill badge-danger m-3">
            Negative
            </span>
        } else if (props.sentiment > 0) {
            span = <span
            className="badge badge-pill badge-success m-3">
            Positive
            </span>
        } else {
            span = <span
            className="badge badge-pill badge-warning m-3">
            Neutral
            </span>
        }

    console.log(props)
    return (
        <li className="list-group-item">
            <Container>
                <Row>
                    <Col size="xs-9">
                        {props.user_record.map(user => (
                            <UserContainer
                            key={user._id}
                            userName={user.fullName}
                            picture={user.picture}
                            ></UserContainer>
                        ))}
                        </Col>
                        <Col size="xs-3">
                        <p>{span}</p>
                        </Col>
                </Row>
                <hr />
                <Row>
                    <Col size="xs-12">
                        <p>{props.text}</p>
                    </Col>
                </Row>
            </Container>
        </li>
    );
}
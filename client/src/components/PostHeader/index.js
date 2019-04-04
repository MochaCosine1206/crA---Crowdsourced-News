import React from "react";
import "./style.css";
import { Row, Col } from "../Grid";


export function PostHeader(props) {
    return (
        <div id="headerDiv">
            <Row>
                <Col size="md-12">
                <div className="shadow-sm border" id="HeaderText">
                <img id="HeaderLogo" src={props.altLogo} alt="..." />
                {"       "}{props.site}</div>
                </Col>
            </Row>
        </div>

    );
}


export default PostHeader
import React from "react";
import "./style.css";
import { Row, Col } from "../Grid";


export function PostHeader(props) {
    let logoPic;
    if (props.altLogo) {
        logoPic = <img id="HeaderLogo" src={props.altLogo} alt="..." />
    } 
    return (
        <div id="headerDiv">
            <Row>
                <Col size="md-12">
                <div className="shadow-sm rounded bg-white" id="headerText">
                {logoPic}
                {"       "}{props.site}</div>
                </Col>
            </Row>
        </div>

    );
}


export default PostHeader
import React from "react"
import "./style.css";
import { Row } from "../Grid";


export function UserContainer(props) {
    return (
        <div>
            <Row>
            <img src={props.picture} alt="..." />
            <h5>{props.userName}</h5>
            </Row>
        </div>

    );
}


export default UserContainer
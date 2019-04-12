import React from "react";
import "./style.css";


export function CommentContainer(props) {
    return (
        <div id="CommentContainer">
        <p>{props.text}</p>
        </div>

    );
}


export default CommentContainer
import React from "react";
import "./style.css";


export function PostTitle(props) {
    return (
        <div id="PostTitle">
            <h5>{props.title}</h5>
        </div>

    );
}


export default PostTitle
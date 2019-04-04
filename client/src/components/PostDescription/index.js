import React from "react";
import "./style.css";


export function PostDescription(props) {
    return (
        <div id="PostDescription" className="shadow p-1">
            <p>{props.description}</p>
        </div>

    );
}


export default PostDescription
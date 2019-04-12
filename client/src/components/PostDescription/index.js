import React from "react";
import "./style.css";


export function PostDescription(props) {
    return (
        <div id="PostDescription">
            <p className="font-italic text-muted">{props.description}</p>
        </div>

    );
}


export default PostDescription
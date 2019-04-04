import React from "react";
import "./style.css";


export function PostFullText(props) {
    return (
        <div id="PostFullText">
            <p className="display-linebreak">{props.text}</p>
        </div>

    );
}


export default PostFullText
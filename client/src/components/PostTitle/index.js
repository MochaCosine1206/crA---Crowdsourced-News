import React from "react";
import "./style.css";


export function PostTitle(props) {
    return (
        <div id="PostTitle">
            <p>{props.title}</p>
        </div>

    );
}


export default PostTitle
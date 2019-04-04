import React from "react";
import "./style.css";


export function PostAuthor(props) {
    return (
        <div id="PostAuthor">
            <p>{props.author}</p>
        </div>

    );
}


export default PostAuthor
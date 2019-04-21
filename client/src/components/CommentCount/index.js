import React from "react";
import "./style.css";


export function CommentCount(props) {
    return (
        <div id="CommentCount">
        <div className="row">
            <p>{props.comments.length} comments</p>
            </div>
        </div>

    );
}


export default CommentCount
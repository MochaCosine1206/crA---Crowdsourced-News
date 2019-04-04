import React from "react";
import "./style.css";


export function PostImage(props) {
    return (   
        <img id="postImage" src={props.image || "https://via.placeholder.com/150"} className="img-fluid shadow" alt="..." />

    );
}


export default PostImage
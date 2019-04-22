import React from "react";
import "./style.css";


export function PostTableData(props) {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.title}</td>
            <td>{props.author}</td>
            <td>{props.description}</td>
            <td>{props.commentsCount}</td>
            <td><button type="button" class="btn btn-outline-danger">Delete Post</button></td>
            </tr>

    );
}


export default PostTableData
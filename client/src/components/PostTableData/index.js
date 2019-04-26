import React from "react";
import "./style.css";
import { Link } from "react-router-dom";


export function PostTableData(props) {
    return (
        <tr>
            <th scope="row"><Link to={"/post/all/" + props.id}>{props.id}</Link> </th>
            <td>{props.title}</td>
            <td>{props.author}</td>
            <td>{props.commentsCount}</td>
            <td><button onClick={e => props.deletePost(props.id)} type="button" class="btn btn-outline-danger">Delete Post</button></td>
            </tr>

    );
}


export default PostTableData
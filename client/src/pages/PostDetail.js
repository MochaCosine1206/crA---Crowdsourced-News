import React, { Component } from "react";
import Navbar from "../components/Navbar";
import PostDetailPage from "../components/PostDetailPage";


class PostDetail extends Component {


render() {
    return (
        <div>
        <Navbar />
        <PostDetailPage />
        </div>
    );
}
}

export default PostDetail;
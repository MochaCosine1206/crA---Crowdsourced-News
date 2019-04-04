import React, { Component } from "react";
import Navbar from "../components/Navbar";
import PostPage from "../components/PostPage";


class Post extends Component {


render() {
    return (
        <div>
        <Navbar />
        <PostPage />
        </div>
    );
}
}

export default Post;
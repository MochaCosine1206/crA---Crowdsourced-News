import React, { Component } from "react";
import Navbar from "../components/Navbar";
import PostPage from "../components/PostPage";
import API from "../utils/API";


class Post extends Component {

    state = {
        user: []
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        API.getLoggedInUser()
        .then(res => {
            if (!res.data) {
                this.props.history.push("/")
            } else {
                this.setState({user: res.data})
            }
            
        })
    }

render() {
    return (
        <div>
        <Navbar userImage={this.state.user.picture}/>
        <PostPage />
        </div>
    );
}
}

export default Post;
import React, { Component } from "react";
import Navbar from "../components/Navbar";
import PostDetailPage from "../components/PostDetailPage";
import API from "../utils/API";


class PostDetail extends Component {

    state = {
        user: []
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        API.getLoggedInUser()
        .then(res => {
            console.log(res.data)
            if (!res.data) {
                this.props.history.push("/")
            } else {
                this.setState({user: res.data})
            }
            
        })
    }

render() {
    console.log(this.state.user)
    return (
        <div>
        <Navbar userImage={this.state.user.picture}/>
        <PostDetailPage user={this.state.user}/>
        </div>
    );
}
}

export default PostDetail;
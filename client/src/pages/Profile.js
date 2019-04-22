import React, { Component } from "react";
import Navbar from "../components/Navbar";
import ProfileContainer from "../components/ProfileContainer";
import ProfileTabs from "../components/ProfileTabs";
import API from "../utils/API";




class Profile extends Component {

    state = {
        user: [],
        userPosts: []
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        API.getLoggedInUser()
        .then(res => {
            console.log("user info: " + JSON.stringify(res.data))
            if (!res.data) {
                this.props.history.push("/")
            } else {
                this.setState({user: res.data})
                this.getUserPosts(this.state.user._id)
            }
            
        })

    
    }

    getUserPosts(id){
        API.getUserPosts(id)
        .then(res => {
            // console.log(JSON.stringify(res.data[0].user_posts))
            this.setState({userPosts: res.data[0].user_posts})
        })
    }


render() {
    console.log("This is user posts:" + JSON.stringify(this.state.userPosts))
    return (
        <div>
            <Navbar userImage={this.state.user.picture}/>
            <div className="container">
            <ProfileTabs 
            userName = {this.state.user.fullName}
            userImage = {this.state.user.picture}
            email = {this.state.user.email}
            postData = {this.state.userPosts}
            />
            </div>
        </div>
    );
}
}

export default Profile;
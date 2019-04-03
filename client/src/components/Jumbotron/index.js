import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import {Input, FormBtn} from "../PostForm";
import { Row, Container, Col } from "../Grid";


class Jumbotron extends Component {
    state = {
        posts: [],
        post: ""
    };

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        API.getPosts()
        .then(res => {
            this.setState({posts: res.data});
            console.log(this.state.posts)
        }).catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("Submitted URL: " + this.state.post)
        API.submitArticle(this.state.post).then(res => {
            console.log("From submitted post: " + res.data)
            this.getPosts();
        })
    };

render() {
    return (
        <div className="jumbotron jumbotron-fluid">
        <Container>
        <h1 className="display-5">Post Here</h1>
        
        <Row>
            <Col size="xs-9 sm-10">
        <Input
        type="text" 
        value={this.state.post}
        onChange={this.handleInputChange}
        name="post"
        placeholder="Post article URL here (required)"
        />
        </Col>
        <Col size="xs-3 sm-2">
        <FormBtn
        disabled={!this.state.post}
        onClick={this.handleFormSubmit}
        >
            Post
        </FormBtn>
   
        </Col>
        </Row>
        </Container>
        
        </div>
    );
}

}

export default Jumbotron;
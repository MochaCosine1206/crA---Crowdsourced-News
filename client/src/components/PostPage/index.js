import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import {Input, FormBtn} from "../PostForm";
import { Row, Container, Col } from "../Grid";
import CardPostContainer from "../CardPostContainer";


class PostPage extends Component {
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

    postDetail = (id) => {
        console.log(id);
        this.props.history.push("/post/" + id)
    }

render() {
    return (
        <div>
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
        {this.state.posts.map(post => (
            <CardPostContainer
            key={post._id}
            id={post._id}
            title={post.title}
            site={post.publisher}
            favicon={post.favicon}
            publishedDate={post.publishedDate}
            siteUrl={post.url}
            author={post.author}
            description={post.description}
            image={post.image}
            text={post.text}
            keywords={post.keywords}
            tags={post.tags}
            backupKeywords={post.compromiseKeywords}
            avgSentiment={post.avgSentiment}
            sentimentScore={post.sentimentScore}
            objectiveScore={post.objectiveScore}
            negativeScore={post.negativeScore}
            positiveScore={post.positiveScore}
            logo={post.logo}
            altLogo={post.altLogo}
            quotes={post.quotes}
            postDetail={this.postDetail}
            >
            </CardPostContainer>
        ))}
        
        </div>
    );
}

}

export default withRouter(PostPage);
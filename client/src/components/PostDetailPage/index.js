import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
// import { Link } from "react-router-dom";
// import {Input, FormBtn} from "../PostForm";
import { Container } from "../Grid";
import CardSinglePostContainer from "../CardSinglePostContainer";


class PostDetailPage extends Component {
    state = {
        posts: [],
        post: ""
    };

    componentDidMount() {
        console.log(this.props.match.params.id)
        API.getPost(this.props.match.params.id)
        .then(res => 
            this.setState({ posts: res.data }))
        .catch(err => console.log(err));
    }


    // handleInputChange = event => {
    //     const { name, value } = event.target;
    //     this.setState({
    //         [name]: value
    //     });
    // };

    // handleFormSubmit = event => {
    //     event.preventDefault();
    //     console.log("Submitted URL: " + this.state.post)
    //     API.submitArticle(this.state.post).then(res => {
    //         console.log("From submitted post: " + res.data)
    //         this.getPosts();
    //     })
    // };

render() {
    return (
        <div>
            <Container>
        {/* <div className="jumbotron jumbotron-fluid">
        <Container>
        <h1 className="display-5">Post Here</h1>
        
        <Row>
            <Col size="xs-9 sm-10">
        <Input
        type="text" 
        value={this.state.post}
        // onChange={this.handleInputChange}
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
        
        </div> */}
            <CardSinglePostContainer
            key={this.state.posts._id} 
            title={this.state.posts.title}
            site={this.state.posts.publisher}
            favicon={this.state.posts.favicon}
            publishedDate={this.state.posts.publishedDate}
            siteUrl={this.state.posts.url}
            author={this.state.posts.author}
            description={this.state.posts.description}
            image={this.state.posts.image}
            text={this.state.posts.text}
            keywords={this.state.posts.keywords}
            tags={this.state.posts.tags}
            backupKeywords={this.state.posts.compromiseKeywords}
            avgSentiment={this.state.posts.avgSentiment}
            sentimentScore={this.state.posts.sentimentScore}
            objectiveScore={this.state.posts.objectiveScore}
            negativeScore={this.state.posts.negativeScore}
            positiveScore={this.state.posts.positiveScore}
            logo={this.state.posts.logo}
            altLogo={this.state.posts.altLogo}
            quotes={this.state.posts.quotes}
            >
            </CardSinglePostContainer>
            </Container>
        </div>
    );
}

}

export default withRouter(PostDetailPage);
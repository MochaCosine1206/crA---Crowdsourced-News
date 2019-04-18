import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
// import { Link } from "react-router-dom";
// import {Input, FormBtn} from "../PostForm";
// import { Container, Row, Col } from "../Grid";
import CardSinglePostContainer from "../CardSinglePostContainer";


class PostDetailPage extends Component {
    state = {
        posts: [],
        post: ""
    };

    componentDidMount() {
        API.getPost(this.props.match.params.id)
        .then(res => 
            this.setState({ posts: res.data }))
        .catch(err => console.log(err));
    }



render(props) {
    return (
        <div>
            <CardSinglePostContainer
            key={this.state.posts._id} 
            id={this.state.posts._id}
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
            user={this.props.user}
            >
            </CardSinglePostContainer>
        </div>
    );
}

}

export default withRouter(PostDetailPage);
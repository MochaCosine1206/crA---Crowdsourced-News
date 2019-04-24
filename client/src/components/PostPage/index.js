import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import { Input, FormBtn } from "../PostForm";
import TopicsCard from "../TopicsCard"
import { Row, Container, Col } from "../Grid";
import CardPostContainer from "../CardPostContainer";


class PostPage extends Component {
    state = {
        posts: [],
        post: "",
        user: "",
        userId: "",
        dupError: "",
        noTextError: "",
        existingPost: "",
        show: "",
        topics: [],
        places: [],
        people: [],
        topic: this.props.match.params.search,
    };

    componentDidMount() {
        console.log("On Mount: " + this.state.topic)
        this.setState({
            topic: this.props.match.params.search
        })
        if (this.state.topic === "all") {
            this.getPosts();
        } else {
            this.getFilteredPosts(this.state.topic)
        }

        this.getUser();
        this.getTopics();
        this.getPeople();
        this.getPlaces();
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            topic: newProps.match.params.search
        })
        if (newProps.match.params.search === "all") {
            this.getPosts()
        } else {
            console.log("Before Filtering")
            this.getFilteredPosts(newProps.match.params.search)
        }
    }

    getPosts = () => {
        API.getPosts()
            .then(res => {
                this.setState({ posts: res.data, post: "" });
            }).catch(err => console.log(err));
    }

    getFilteredPosts = (keyword) => {
        API.getFilteredPosts(keyword)
            .then(res => {
                this.setState({ posts: res.data })
            })
    }

    getUser = () => {
        API.getLoggedInUser()
            .then(res => {
                if (!res.data) {
                    this.props.history.push("/")
                } else {
                    this.setState({ user: res.data.fullName, userId: res.data._id })
                }

            })
    }

    getTopics = () => {
        API.getTopics()
            .then(res => {
                this.setState({ topics: res.data })

            })
    }

    getPlaces = () => {
        API.getPlaces()
            .then(res => {
                this.setState({ places: res.data })

            })
    }

    getPeople = () => {
        API.getPeople()
            .then(res => {
                this.setState({ people: res.data })

            })
    };

    addPostToUser = (userId, postId) => {
        API.addPostToUser(userId, postId).then(res => {
            console.log("Message from UserPost: " + JSON.stringify(res.data))
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.submitArticle(this.state.post).then(res => {
            console.log("ERROR: " + res.data.name)
            if (res.data.name === "MongoError") {
                this.setState({ dupError: "ERROR: " + JSON.stringify(res.data.errmsg) })
                API.getExistingPost(this.state.post).then(res => {
                    console.log("This is the post that already exists: " + res.data[0]._id)
                    this.setState({ existingPost: res.data[0]._id })
                })
            } else if (res.data.name ===  "ValidationError") {
                this.setState({ noTextError: res.data.errors.title.message })
            } else {
                this.setState({ noTextError: "", dupError: "" })
                console.log("This is the id of the post that was just created: " + res.data._id)
                this.addPostToUser(this.state.userId, res.data._id)
                this.getPosts();
                this.getTopics();
                this.getPeople();
                this.getPlaces();
            }

        })
    };

    postDetail = (id) => {
        this.props.history.push("/post/" + this.state.topic + "/" + id)
    }

    render() {
        let errAlert;
        if (this.state.dupError) {
            errAlert = <div className="alert alert-light alert-dismissible fade show" role="alert">
                Congratulations! Someone else already submitted this link, <Link to={"/post/" + this.state.topic + "/" + this.state.existingPost} class="alert-link">click here</Link> to read or comment.<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        } else if (this.state.noTextError) {
            errAlert = <div className="alert alert-light alert-dismissible fade show" role="alert">
                {this.state.noTextError} <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        }
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <Container>
                        {errAlert}
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
                                <button className="btn btn-outline-secondary" data-toggle="collapse" data-target="#topics">Topics</button>
                            </Col>
                        </Row>
                    </Container>
                    <div id="topics" className="collapse">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-md-4">
                                    <h5>Top Topics</h5>
                                    <ol>
                                        {this.state.topics.map(topic => (
                                            <TopicsCard
                                                key={topic._id}
                                                id={topic._id}
                                                topic={topic._id}

                                            >
                                            </TopicsCard>
                                        ))}
                                    </ol>
                                </div>
                                <div className="col-xs-12 col-md-4">
                                    <h5>Top People</h5>
                                    <ol>
                                        {this.state.people.map(person => (
                                            <TopicsCard
                                                key={person._id}
                                                id={person._id}
                                                topic={person._id}
                                            // filterTopics={this.filterTopics}
                                            >
                                            </TopicsCard>
                                        ))}
                                    </ol>
                                </div>
                                <div className="col-xs-12 col-md-4">
                                    <h5>Top Places</h5>
                                    <ol>
                                        {this.state.places.map(place => (
                                            <TopicsCard
                                                key={place._id}
                                                id={place._id}
                                                topic={place._id}
                                            // filterTopics={this.filterTopics}
                                            >
                                            </TopicsCard>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-columns">
                    {this.state.posts.map(post => (
                        <CardPostContainer
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            site={post.publisher}
                            siteName={post.siteName}
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
                            comments={post.comments}
                            postDetail={this.postDetail}
                            submitDate={post.createDate}
                        >
                        </CardPostContainer>
                    ))}
                </div>
            </div>
        );
    }

}

export default withRouter(PostPage);
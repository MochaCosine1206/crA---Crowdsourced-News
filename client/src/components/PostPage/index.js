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
        search: "",
        user: "",
        userId: "",
        dupError: "",
        noTextError: "",
        existingPost: "",
        show: "",
        loading: false,
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
            this.setState({search: ""});
            this.getFilteredPosts(newProps.match.params.search)
        }
    }

    getPosts = () => {
        this.setState({ loading: true })
        API.getPosts()
            .then(res => {
                this.setState({ posts: res.data, post: "", loading: false });
            }).catch(err => console.log(err));
    }

    getFilteredPosts = (keyword) => {
        this.setState({ loading: true })
        console.log("Search Value: " + keyword)
        API.getFilteredPosts(keyword)
            .then(res => {
                console.log("After filtering data: " + res.data)
                this.setState({ posts: res.data, loading: false })
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

    handleSearchChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        if (value){
            this.getFilteredPosts(value);
        } else if (this.state.topic === "all") {
            this.getPosts();
        } else {
            this.getFilteredPosts(this.state.topic)
        }
        
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        API.submitArticle(this.state.post).then(res => {
            console.log("ERROR: " + JSON.stringify(res.data))
            if (res.data.name === "MongoError") {
                this.setState({ dupError: "ERROR: " + JSON.stringify(res.data.errmsg) })
                API.getExistingPost(this.state.post).then(res => {
                    if (res.data[0]){
                        console.log("This is the post that already exists: " + res.data[0]._id)
                        this.setState({ existingPost: res.data[0]._id, loading: false })
                    }
                    
                })
            } else if (res.data.name ===  "ValidationError") {
                this.setState({ noTextError: res.data.errors.title.message, loading: false })
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
        window.scrollTo(0, 0)
        this.props.history.push("/post/" + this.state.topic + "/" + id)
    }

    render() {
        let loading;
        let errAlert;
        let searchResultsJumbo;
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
        console.log("Posts length: " + this.state.posts)
        if (this.state.posts.length === 0 && this.state.search) {
            searchResultsJumbo = <div id="searchResultsJumbo" className="jumbotron-fluid">
        <h1>Looks like there aren't any results, try searching for a broader topic.</h1>
        </div>
        } else {
            searchResultsJumbo = null
        }
        if (this.state.loading === true) {
            loading = <button class="btn btn-secondary" type="button" disabled>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          
        }
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <Container>
                        {errAlert}
                        <Row>
                        {loading}
                                <Col size="xs-3 sm-4">
                                
                                <Input
                                    type="text"
                                    value={this.state.post}
                                    onChange={this.handleInputChange}
                                    name="post"
                                    placeholder="Post article URL here (required)"
                                />
                            </Col>
                            <Col size="xs-3 sm-4">
                                <Input
                                    type="text"
                                    value={this.state.search}
                                    onChange={this.handleSearchChange}
                                    name="search"
                                    placeholder="Enter search terms here to filter posts"
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
                {searchResultsJumbo}
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
import React, { Component } from "react";
import "./style.css";
import { Row, Col } from "../Grid";
import PostHeader from "../PostHeader"
import PostTitle from "../PostTitle"
import PostFullText from "../PostFullText"
import PostAuthor from "../PostAuthor"
// import CommentContainer from "../CommentContainer"
import API from "../../utils/API";
import { Input, FormBtn } from "../PostForm";
import { List, ListItem } from "../List";
import Palette from "react-palette"


class CardSinglePostContainer extends Component {


    state = {
        comment: "",
        post: "",
        user: "",
        comments: [],
        backgroundPosition: "",
    }


    componentDidMount() {
        this.setState({ user: this.props.user._id, post: this.props.id })
        this.getComments(this.props.id)
    }



    getComments = postId => {
        API.getPostComments(postId)
            .then(res => {
                this.setState({ comments: res.data })
            })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    updatePostComment = (postId, commentId) => {
        API.updatePostComment({postId: postId, commentId: commentId}).then( res => {
            console.log(res.data);
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();

        API.submitComment({ text: this.state.comment, user: this.state.user, post: this.state.post }).then(res => {
            this.setState({ comment: "" })
            console.log(res.data._id)
            this.updatePostComment(this.props.id, res.data._id)
            this.getComments(this.props.id)
        })

        
    };

    render(props) {
        return (
            <div>
                <div
                    id="postJumbo"
                    className="jumbotron jumbotron-fluid"
                    style={{ backgroundAttachment: "fixed", backgroundImage: `url(${this.props.image})`, backgroundSize: "cover", backgroundPosition: "center center" }}
                >
                    <PostHeader
                        logo={this.props.logo}
                        site={this.props.site}
                        altLogo={this.props.altLogo}
                    />
                </div>
                <Row>
                    <div id="contentContainer">
                        <Row>
                            <span dangerouslySetInnerHTML={{ __html: this.props.logo }}></span>
                        </Row>
                        <Row>
                            <PostTitle title={this.props.title} />
                        </Row>
                        <Row>
                            <PostAuthor author={this.props.author} />
                        </Row>
                        <Row>
                            <Palette image={this.props.image}>
                                {palette => (
                                    <div
                                        id="paletteLine"
                                        style={{ backgroundColor: palette.vibrant }}
                                    >

                                    </div>
                                )}

                            </Palette>
                        </Row>
                        <Row>
                            <PostFullText text={this.props.text} />
                        </Row>
                        <Row>
                            <Palette image={this.props.image}>
                                {palette => (
                                    <div
                                        id="paletteLine"
                                        style={{ backgroundColor: palette.vibrant }}
                                    >

                                    </div>
                                )}

                            </Palette>
                        </Row>
                        <p>Comments Go Here</p>
                        <div id="commentForm">
                        <Row>
                            <Col size="xs-9 sm-10">
                            
                                <Input
                                    type="text"
                                    value={this.state.comment}
                                    onChange={this.handleInputChange}
                                    name="comment"
                                    placeholder="Post a comment"
                                />
                            </Col>
                            <Col size="xs-3 sm-2">
                                <FormBtn
                                    disabled={!this.state.comment}
                                    onClick={this.handleFormSubmit}
                                >
                                    Post
                                </FormBtn>
                            </Col>
                        </Row>
                        </div>
                        <List>
                            {this.state.comments.map(comment => (
                                <ListItem
                                    key={comment._id}
                                    text={comment.text}
                                    user_record={comment.user_records}
                                    sentiment={comment.comparative}
                                >
                                </ListItem>
                            ))}
                        </List>
                        
                    </div>
                </Row>

            </div>
        );
    }

}


export default CardSinglePostContainer
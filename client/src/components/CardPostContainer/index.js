import React from "react";
import "./style.css";
import { Row, Container, Col } from "../Grid";
import PostHeader from "../PostHeader"
import PostImage from "../PostImage"
import PostTitle from "../PostTitle"
// import PostFullText from "../PostFullText"
import PostDescription from "../PostDescription"
import PostAuthor from "../PostAuthor"
import PostQuote from "../PostQuote"



export function CardPostContainer(props) {
    return (
        <Container>
        <div 
        className="shadow-sm p-3 mb-5 bg-white rounded border"
        onClick={ e => props.postDetail(props.id)}
        >
        <PostHeader 
        logo={props.logo} 
        site={props.site} 
        altLogo={props.altLogo}
        />
        <Container>
            <Row>
                <PostTitle title={props.title}/>
            </Row>
            <Row>
                <PostAuthor author={props.author} />
            </Row>
            <Row>
                <Col size="md-4">
                <PostImage image={props.image}/>
                </Col>
                <Col size="md-8">
                {/* <PostFullText text={props.text} /> */}
                <PostDescription description={props.description} />
                <PostQuote quotes={props.quotes} />
                </Col>
            </Row>
            
            </Container>
            
        </div>
        </Container>
    );
}


export default CardPostContainer
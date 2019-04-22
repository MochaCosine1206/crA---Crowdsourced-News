import React from "react";
import "./style.css";
import { Row, Container } from "../Grid";
import PostImage from "../PostImage"
import PostTitle from "../PostTitle"
import PostDescription from "../PostDescription"
import PostQuote from "../PostQuote"
import CommentCount from "../CommentCount"
import DateSubmitted from "../DateSubmitted"
import SentimentBadge from "../SentimentBadge"
import Palette from "react-palette"



export function CardPostContainer(props) {

    let siteName;
    let descriptionDiv;
    if (props.site) {
        siteName = props.site
    } else {
        siteName = props.siteName
    }

    if (props.description) {
        descriptionDiv = <PostDescription description={props.description} />
    }

    let logoPic;
    if (props.altLogo) {
        logoPic = <div className="row"><img id="logo" src={props.altLogo} alt="..." />{"       "}<p id="cardHeaderText">{siteName}</p></div>
    } else if (props.logo) {
        logoPic = <span dangerouslySetInnerHTML={{ __html: props.logo }}></span>
    }



    return (
        <div className="card">
                        <Palette image={props.image}>
                            {palette => (
                                <div
                                    className="shadow p-3 rounded border"
                                    style={{ backgroundColor: palette.vibrant }}
                                    onClick={e => props.postDetail(props.id)}
                                >
                                    <PostImage image={props.image} />
                                    <div id="cardText">
                                        <Row>
                                            {logoPic}
                                            <SentimentBadge sentimentScore={props.sentimentScore} avgSentiment={props.avgSentiment} comments={props.comments} />
                                            {/* <CommentCount
                                                comments={props.comments}
                                            /> */}
                                            <DateSubmitted submitDate={props.submitDate} />
                                        </Row>
                                        <Row>
                                            <PostTitle title={props.title} />

                                        </Row>
                                        <Row>
                                            {descriptionDiv}
                                        </Row>
                                        <Row>
                                            <PostQuote quotes={props.quotes} />
                                        </Row>
                                    </div>
                                </div>
                            )}
                        </Palette>
        </div>
    );
}


export default CardPostContainer
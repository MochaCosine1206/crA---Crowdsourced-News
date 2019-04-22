import React from "react";
import "./style.css";
import { Row } from "../Grid";
import CommentCount from "../CommentCount"



// This file exports both the List and ListItem components


export function SentimentBadge(props) {
    let posNegSpan;
    let subjectiveSpan;
        if (props.sentimentScore < 0) {
            posNegSpan =  <span 
            className="badge badge-danger m-1">
            Negative
            </span>
        } else if (props.sentimentScore > 0) {
            posNegSpan = <span
            className="badge badge-success m-1">
            Positive
            </span>
        } else {
            posNegSpan = <span
            className="badge badge-warning m-1">
            Neutral
            </span>
        }

        if((props.avgSentiment >= .1 && props.avgSentiment <= 1) || (props.avgSentiment <= -.1 && props.avgSentiment >=-1 )) {
            subjectiveSpan = <span className="badge badge-dark m-1">
            More Biased <span className="badge badge-light">{props.avgSentiment.toFixed(4)}</span>
          </span>
        } else if ((props.avgSentiment > .01 && props.avgSentiment < .1) || (props.avgSentiment < -.01 && props.avgSentiment >-.1 )) {
            subjectiveSpan = <span className="badge badge badge-dark m-1">
            Slightly Biased <span className="badge badge-light">{props.avgSentiment.toFixed(4)}</span>
          </span>
        } else if ((props.avgSentiment > .001 && props.avgSentiment < .01) || (props.avgSentiment < -.001 && props.avgSentiment > -.01)) {
            subjectiveSpan = <span className="badge badge badge-dark m-1">
            Less Biased <span className="badge badge-light">{props.avgSentiment.toFixed(4)}</span>
          </span>
        }

    return (
        <div id="sentimentBadge">
            <Row>
            {posNegSpan}
            {subjectiveSpan}
            <span className="badge badge badge-info m-1">
            Comments <span className="badge badge-light">{props.comments.length}</span></span>
            </Row>
        </div>
    );
}

export default SentimentBadge
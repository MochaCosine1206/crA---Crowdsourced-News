import React from "react";
import "./style.css";
import { Row } from "../Grid";



// This file exports both the List and ListItem components


export function SentimentBadge(props) {
    let posNegSpan;
    let subjectiveSpan;
        if (props.sentimentScore < 0) {
            posNegSpan =  <span 
            className="badge badge-pill badge-danger m-3">
            Negative
            </span>
        } else if (props.sentimentScore > 0) {
            posNegSpan = <span
            className="badge badge-pill badge-success m-3">
            Positive
            </span>
        } else {
            posNegSpan = <span
            className="badge badge-pill badge-warning m-3">
            Neutral
            </span>
        }

        if((props.avgSentiment >= .1 && props.avgSentiment <= 1) || (props.avgSentiment <= -.1 && props.avgSentiment >=-1 )) {
            subjectiveSpan = <span className="badge badge-pill badge-dark m-3">
            More Biased <span className="badge badge-light">{props.avgSentiment.toFixed(4)}</span>
          </span>
        } else if ((props.avgSentiment > .01 && props.avgSentiment < .1) || (props.avgSentiment < -.01 && props.avgSentiment >-.1 )) {
            subjectiveSpan = <span className="badge badge-pill badge-dark m-3">
            Slightly Biased <span className="badge badge-light">{props.avgSentiment.toFixed(4)}</span>
          </span>
        } else if ((props.avgSentiment > .001 && props.avgSentiment < .01) || (props.avgSentiment < -.001 && props.avgSentiment > -.01)) {
            subjectiveSpan = <span className="badge badge-pill badge-dark m-3">
            Less Biased <span className="badge badge-light">{props.avgSentiment.toFixed(4)}</span>
          </span>
        }

    console.log(props)
    return (
        <div id="sentimentBadge">
            <Row>
            {posNegSpan}
            {subjectiveSpan}
            </Row>
        </div>
    );
}

export default SentimentBadge
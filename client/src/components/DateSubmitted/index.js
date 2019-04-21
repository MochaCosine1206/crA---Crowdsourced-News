import React from "react";
import Moment from "react-moment";
import "./style.css";


export function DateSubmitted(props) {
    
    return (
        <div id="DateSubmitted">
        <div className="row">
            <p>Submitted <Moment fromNow>{props.submitDate}</Moment></p>
            </div>
        </div>

    );
}


export default DateSubmitted
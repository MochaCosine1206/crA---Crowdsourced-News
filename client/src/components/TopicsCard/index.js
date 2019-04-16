import React from "react";
import "./style.css";
import { Link } from "react-router-dom";



export function TopicsCard(props) {
    return (
        <div>
            <div className="container-fluid">
                <li><Link
                onClick={e => {props.filterTopics(props.topic)}}
                >{props.topic}</Link></li>
            </div>
        </div>
    );
}


export default TopicsCard
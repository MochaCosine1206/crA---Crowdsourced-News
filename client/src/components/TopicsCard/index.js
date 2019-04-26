import React from "react";
import "./style.css";
import { Link } from "react-router-dom";



export function TopicsCard(props) {
    return (
        <div>
            <div className="container-fluid">
                <li data-toggle="collapse"
                    data-target="#topics"
                    >
                    <Link
                        to={"/post/" + props.topic}
                    >{props.topic}</Link></li>
            </div>
        </div>
    );
}


export default TopicsCard
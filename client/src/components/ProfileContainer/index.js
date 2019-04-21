import React from "react";
import "./style.css";


export function ProfileContainer(props) {
    return (
        <div id="ProfileContainer">
        <img className="rounded-circle" src={props.userImage} alt="..." />
        <p>{props.userName}</p>
        <p>{props.email}</p>
        </div>

    );
}


export default ProfileContainer
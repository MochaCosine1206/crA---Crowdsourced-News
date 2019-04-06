import React from "react";
import "./style.css";
import GoogleAuth from "../GoogleAuth"


export function LoginCard (props) {
    return (
        <div 
        id="LoginCard"
        className="shadow-sm p-3 mb-5 bg-white rounded border"
        >
        <GoogleAuth />
        </div>

    );
}


export default LoginCard
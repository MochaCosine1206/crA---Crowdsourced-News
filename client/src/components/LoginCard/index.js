import React from "react";
import "./style.css";
import GoogleAuth from "../GoogleAuth"


export function LoginCard(props) {
    return (
        <div id="loginBackground">
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-10">
                <div className="container">
                    <div id="LoginCard" className="shadow-sm p-3 mb-5 border"
                    >
                    <div className="row h-100 align-items-center">
                        <div className="col-xs-12 col-md-6 border-right">
                        <h1 id="loginHeader">crA</h1>
                        <ul id="loginBiline">
                            <li><p>Share any article on the net</p></li>
                            <li><p>comment</p></li>
                        </ul>
                        </div>
                        <div className="col-xs-12 col-md-6">
                        <GoogleAuth />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}


export default LoginCard
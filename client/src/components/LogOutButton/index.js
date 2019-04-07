import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import { Container } from "../Grid";


class LogOutButton extends Component {


    logOut = () => {
        console.log();
        API.logOut()
            .then(res => {
                this.props.history.push("/")
            }).catch(err => console.log(err));
    }



    render() {
        return (
            <div id="buttonDiv">
                <Container>
                    <button onClick={this.logOut} className="btn btn-light rounded-pill">
                    {/* <a href="http://localhost3001/auth/logout" className="button"> */}
                        LogOut
                    {/* </a> */}
                    </button>
                </Container>
            </div>
        );
    }

}

export default withRouter(LogOutButton);
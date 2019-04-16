import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";


class PostDetailPage extends Component {

  getGoogleAuth = (event) => {
    event.preventDefault();
    API.getGoogleAuth()
      .then(res => {
        console.log(res.data)
      })
  }



  render() {
    return (
      <div>
        <a href="http://localhost:3001/auth/google" className="button rounded-pill text-center">
          {/* <button onClick={this.getGoogleAuth} className="button"> */}

          <div >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="..." />
            <span className="button-label">Sign in with Google</span>
          </div>
          {/* </button> */}
        </a>
      </div>
    );
  }

}

export default withRouter(PostDetailPage);
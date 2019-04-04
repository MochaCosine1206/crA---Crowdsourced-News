import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Post from "./pages/Post"
import PostDetail from "./pages/PostDetail"

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Post} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/post/:id" component={PostDetail} />
          </div>
        </Router>

      </div>
    );
  }
}

export default App;

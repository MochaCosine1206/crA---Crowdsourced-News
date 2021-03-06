import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./pages/Post"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import PostDetail from "./pages/PostDetail"
import NoMatch from "./pages/NoMatch";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>

            <Route exact path="/" component={Login} />
            <Route exact path="/post/:search/:id" component={PostDetail} />
            <Route exact path="/post/:search" component={Post} />
            <Route exact path="/profile/" component={Profile} />
            <Route component={NoMatch} />
        </Switch>

      </div>
    );
  }
}

export default App;

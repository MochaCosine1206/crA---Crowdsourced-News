import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home"

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
          <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
          </div>
        </Router>
        
      </div>
    );
  }
}

export default App;

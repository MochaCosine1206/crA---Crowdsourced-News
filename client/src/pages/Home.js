import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";


class Home extends Component {


render() {
    return (
        <div>
        <Navbar />
        <Jumbotron />
        </div>
    );
}
}

export default Home;
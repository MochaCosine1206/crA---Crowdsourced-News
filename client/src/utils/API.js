import axios from "axios";

export default {
    submitArticle: function (url) {
        console.log("In API: " + url)
        return axios.post("/api/post/submitArticle/", { articleSubmition: url })
    },

    getLoggedInUser: function () {
        return axios.get("/api/user/loggedinuser")
    },

    getPosts: function () {
        return axios.get("/api/post");
    },

    getTopics: function () {
        return axios.get("/api/post/topics");
    },

    getPeople: function () {
        return axios.get("/api/post/people");
    },

    getPlaces: function () {
        return axios.get("/api/post/places");
    },

    getPost: function (id) {
        return axios.get("/api/post/" + id);
    },

    submitComment: function(data) {
        return axios.post("/api/comment", data);
    },

    getPostComments: function(postId) {
        return axios.get("/api/comment/" + postId)
    },

    getGoogleAuth: function () {
        console.log("Retriving Google Authentication")
        return axios.get("/auth/google");
    },

    logOut: function () {
        return axios.get("/auth/logout");
    }


};
import axios from "axios";

export default {
    submitArticle: function (url) {
        return axios.post("/api/post/submitArticle/", { articleSubmition: url })
    },

    addPostToUser: function(userId, post) {
        return axios.post("/api/user/updateUser/", { userId: userId, postId: post })
    },

    getUserPosts: function(userId) {
        return axios.get("/api/user/getUserPosts/" + userId)
    },

    getLoggedInUser: function () {
        return axios.get("/api/user/loggedinuser")
    },

    getPosts: function () {
        return axios.get("/api/post");
    },

    getFilteredPosts: function (search) {
        return axios.get("/api/post/search/" + search)
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

    deletePost: function (id) {
        console.log("Inside APi Delete: " + id)
        return axios.delete("/api/post/" + id)
    },

    getExistingPost: function (url) {
        console.log("In getExistingPost " + url)
        return axios.post("/api/post/existingPost/" , { articleSubmition: url });
    },

    submitComment: function(data) {
        return axios.post("/api/comment", data);
    },

    updatePostComment: function(data) {
        return axios.post("/api/post/updatePostComment", data);
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
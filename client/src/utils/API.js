import axios from "axios";

export default {
    submitArticle: function (url) {
        console.log("In API: " + url)
        return axios.post("/api/post/submitArticle/", {articleSubmition: url})
    },

    getLoggedInUser: function() {
        return axios.get("api/post/user/")
    },

    getPosts: function () {
        return axios.get("/api/post");
    },

    getPost: function(id) {
        return axios.get("/api/post/" + id);
      },

    getGoogleAuth: function () {
        console.log("Retriving Google Authentication")
        return axios.get("/auth/google");
    },

    logOut: function () {
        return axios.get("/auth/logout");
    }

    // // Saves a book to the database
    // saveBook: function (bookData) {
    //     return axios.post("/api/post", bookData);
    // },

    // //Get all books from the database
    // getBooks: function () {
    //     return axios.get("/api/post")
    // },

    // deleteBook: function (id) {
    //     return axios.delete("/api/post/" + id)
    // }


};
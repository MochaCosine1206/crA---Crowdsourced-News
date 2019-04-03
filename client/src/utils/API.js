import axios from "axios";

export default {
    submitArticle: function (url) {
        console.log("In API: " + url)
        return axios.post("/api/post/submitArticle/", {articleSubmition: url})
    },

    getPosts: function () {
        return axios.get("/api/post");
    },

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
const db = require("../models");
// const sw = require ('sentiword');
const Sentiment = require('sentiment')
const sentiment = new Sentiment()
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId


module.exports = {

  findAll: function (req, res) {
    console.log("req.body from get comments: ", req.params.postId)
    db.Comments
      .aggregate([
        {
          $match: {
            post: ObjectId(req.params.postId)
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_records"
          }
        }
      ])
      .sort({ createDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Comments
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("Inside create req: " + req.body.text)
    let sentimentResult = sentiment.analyze(req.body.text);
    console.log("From Sentiment: " + JSON.stringify(sentimentResult));

    // let sentimentScore = sw(req.body.text);


    let commentData = {}

    commentData.text = req.body.text;
    commentData.user = req.body.user;
    commentData.post = req.body.post;
    commentData.sentimentScore = sentimentResult.score;
    commentData.comparative = sentimentResult.comparative;




    db.Comments
      .create(commentData)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}


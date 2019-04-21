const db = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

// Defining methods for the booksController
module.exports = {

  user: function (req, res) {
    console.log("This is the user: " + req.user)
    res.json(req.user)
  },

  updateUserPost: function (req, res) {
    console.log("User ID: " + req.body.userId)
    console.log("User post: " + req.body.postId)
    db.User.findOneAndUpdate({"_id": req.body.userId},
      {$push:
        {
          'posts': req.body.postId
        }
      },
      {
        new: true
      }
    )
      .then(dbModel => {res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },

  getUserPosts: function (req, res) {
    console.log("ID in getuserposts: " + req.params.userId)
    db.User
      .aggregate([
        {
          $match: {
            _id: ObjectId(req.params.userId)
          }
        },
        // {
        //   $unwind: "$posts"
        // },
        {
          $lookup: {
            from: "posts",
            localField: "posts",
            foreignField: "_id",
            as: "user_posts"
          }
        },
      ])
      .sort({ createDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

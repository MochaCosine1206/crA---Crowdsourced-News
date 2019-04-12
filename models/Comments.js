const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  text: { type: String, trim: true, required: "You must write something to post a comment!" },
  user:
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    },

  post:
    {
      type: Schema.Types.ObjectId,
      ref: "posts"
    },

  sentimentScore: Number,
  comparative: Number,
  createDate: { type: Date, default: Date.now },
  updateDate: Date,
});

commentsSchema.methods.lastUpdatedDate = () => {
  // Set the current user's `lastUpdated` property to the current date/time
  this.updateDate = Date.now();
  // Return this new date
  return this.updateDate;
};


const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  title: String,
  link: String,
  image: String,
  quote: String,
  text: { type: String, trim: true, required: "You must write something to post a comment!" },
  color: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts"
    }
  ],
  positiveScore: Number,
  negativeScore: Number,
  sentimentScore: Number,
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
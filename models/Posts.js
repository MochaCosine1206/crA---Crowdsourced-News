const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  // siteName: { type: String, required: true},
  // url: { type: String, required: true, unique: true },
  title: { type: String },
  publishedDate: String,
  description: { type: String },
  author: [String],
  publisher: { type: String },
  copyright: { type: String },
  favicon: { type: String },
  image: { type: String },
  text: { type: String, required: true },
  summaryText: { type: String },
  tags: [String],
  keywords: { type: String },
  links: [{}],
  videos: [{}],
  positiveScore: Number,
  negativeScore: Number,
  sentimentScore: Number,
  avgSentiment: Number,
  objectiveScore: Number,
  url: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ],
  logo: String,
  compromiseKeywords: [String],
  createDate: { type: Date, default: Date.now },
  updateDate: Date,
  color: String,
  siteScore: Number,
});

postSchema.methods.lastUpdatedDate = () => {
  // Set the current user's `lastUpdated` property to the current date/time
  this.updateDate = Date.now();
  // Return this new date
  return this.updateDate;
};


const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
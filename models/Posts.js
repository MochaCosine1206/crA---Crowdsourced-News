const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  siteName: { type: String, required: true},
  url: { type: String, required: true, index: { unique: "Congratulations!  This article already exists!" }},
  title: { type: String, required: "Please submit another article, this website is not yet supported." },
  publishedDate: String,
  description: { type: String },
  author: [String],
  publisher: { type: String },
  copyright: { type: String },
  favicon: { type: String },
  image: { type: String },
  text: { type: String, required: "No text was returned from the article" },
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
  quotes: [{}],
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
  altLogo: String,
  compromiseTopics: [String],
  compromisePeople: [String],
  compromisePlaces: [String],
  compromiseOrganizations: [String],
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
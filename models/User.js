const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, match: [/.+@.+\..+/, "Please enter a valid e-mail address"] },
  password: { type: String, trim: true, required: "Password is Required", validate: [(input) => { return input.length >=6;},"passowrd should be longer"] },
  firstName: { type: String, trim: true, required: "first name is required" },
  lastName: { type: String, trim: true, required: "last name is required" },
  userName: { type: String, trim: true, required: "Username is Required" },
  birthDay: Date,
  address: String,
  phone: {type: String, validate: {validator: v => {return /\d{3}-\d{3}-\d{4}/.test(v);},message: props => `${props.value} is not a valid phone number!`},required: [true, 'User phone number required']},
  image: { type: String, required: true },
  psersonality: [String],
  interests: [String],
  fiveHated: [String],
  fiveLoved: [String],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ],
  role: {type: String, required: true, default: "user"},
  createDate: { type: Date, default: Date.now },
  updateDate: Date,
  fullName: String,
  engagementScore: Number,
  globalUserScore: Number
});

userSchema.methods.setFullName = function() {
    // Set the current user's `fullName` to their `firstName` and their `lastName` together
    this.fullName = this.firstName + " " + this.lastName;
    // Return the new `fullName`
    return this.fullName;
  };

  userSchema.methods.lastUpdatedDate = () => {
    // Set the current user's `lastUpdated` property to the current date/time
    this.updateDate = Date.now();
    // Return this new date
    return this.updateDate;
  };

const User = mongoose.model("User", userSchema);

module.exports = User;
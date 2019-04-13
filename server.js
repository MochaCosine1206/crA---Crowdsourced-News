const express = require("express");
const cors = require("cors")
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const routes = require("./routes");
// const keys = require("./config/keys")
const app = express();
const PORT = process.env.PORT || 3001;

//Using this to enable callback on heroku
app.enable('trust proxy', 'loopback')


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.session_cookieKey]
  // keys: [keys.session.cookieKey]
}))


//initialize passport
app.use(passport.initialize());
app.use(passport.session());


// Define API routes here
app.use(routes);
// Send every other request to the React app

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/crADB");


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

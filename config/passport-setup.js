const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
// const keys = require("./keys")
const User = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
    
})

passport.use(
    new GoogleStrategy({
        //options for strategy
        // clientID: keys.google.clientID,
        clientID: process.env.GOOGLE_clientID,
        // clientSecret: keys.google.clientSecret,
        clientSecret: process.env.GOOGLE_clientSecret,
        callbackURL: '/auth/google/callback',
        // callbackURL: 'https://cra-crowdsourced-news.herokuapp.com/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        //check if user already exists
        User.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
                //already have the user
                console.log("current user is: ", currentUser);
                done(null, currentUser)
            } else {
                //if not, create new user
                new User({
                    email: profile._json.email,
                    googleId: profile.id,
                    firstName: profile._json.given_name,
                    lastName: profile._json.family_name,
                    picture: profile._json.picture,
                    fullName: profile._json.name,
                }).save().then((newUser) => {
                    console.log(newUser)
                    done(null, newUser);
                })
            }
        })
        
    })
)

const db = require("../models");
const passport = require("passport")

module.exports = {
    google: function(req, res) {
        res.json("hello")
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })

        
    }
}
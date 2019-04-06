const router = require("express").Router();
// const google = require("./google");
const passport = require("passport");



router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}))


router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log("Does req.user exist: " + req.user)
    if (!req.user) {
        res.redirect("http://localhost:3000")
    } else {
        res.redirect("http://localhost:3000/post")
    }

})

router.get('/logout', (req, res) => {
    req.logout();
    res.send("Logging Out")
})

module.exports = router;
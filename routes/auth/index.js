const router = require("express").Router();
const passport = require("passport");





router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}))


// router.get('/google', (req, res) => {
//     res.send("In Server")
// })

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log("Does req.user exist: " + req.user)
    if (!req.user) {
        res.redirect("/")
    } else {
        res.redirect("http://localhost:3000/post")
        // console.log("Right before post route")
        // res.redirect("/post")
    }

})

// router.get('/google/callback', passport.authenticate('google',{
//     successRedirect: '/post',
//     failureRedirect: '/'
// })
// )

router.get('/logout', (req, res) => {
    req.logout();
    res.send("Logging Out")
})

module.exports = router;
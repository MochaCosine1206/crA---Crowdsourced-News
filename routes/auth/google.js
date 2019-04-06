const router = require("express").Router();
const authController = require("../../controllers/authcontroller");

//Matches with "/auth/google"
router.route("/")
  .get(authController.google)




module.exports = router;
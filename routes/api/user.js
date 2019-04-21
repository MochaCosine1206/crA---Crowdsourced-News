const axios = require("axios");
const router = require("express").Router();
const userController = require("../../controllers/userController");


router.route("/")
  .get(userController.findAll)
  .post(userController.create);

  router.route("/updateUser")
  .post(userController.updateUserPost)
  .get(userController.updateUserPost)

  router.route("/getUserPosts/:userId")
  .get(userController.getUserPosts)
  

  router.route("/loggedinuser")
  .post(userController.user)
  .get(userController.user)

  router.route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
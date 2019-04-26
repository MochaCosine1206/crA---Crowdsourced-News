const router = require("express").Router();
const postController = require("../../controllers/postController");

//Matches with "/api/post/submitArticle"
router.route("/submitArticle")
  .post(postController.submitArticle)
  .get(postController.submitArticle)

router.route("/topics")
  .get(postController.getTopics)

router.route("/people")
  .get(postController.getPeople)

router.route("/places")
  .get(postController.getPlaces)

router.route("/search/:search")
  .get(postController.getFilteredPosts)

router.route("/updatePostComment")
  .post(postController.updatePostComment)

  router.route("/existingPost")
  .post(postController.findByUrl)

  router.route("/existingPost")
  .post(postController.findByUrl)

// Matches with "/api/post"
router.route("/")
  .get(postController.findAll)
  .post(postController.create);

// Matches with "/api/post/:id"
router
  .route("/:id")
  .get(postController.findById)
  .put(postController.update)
  .delete(postController.remove);

module.exports = router;
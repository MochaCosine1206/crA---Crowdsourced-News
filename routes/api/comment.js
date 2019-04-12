const router = require("express").Router();
const commentController = require("../../controllers/commentController");


router.route("/")
// .get(commentController.findAll)
.post(commentController.create);

router.route("/:postId")
.get(commentController.findAll)



module.exports = router;
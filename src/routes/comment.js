const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/CommentController");

router.route("/")
    .get(CommentController.getComment)
    .post(CommentController.createComment)
    .delete(CommentController.deleteCommentById)
router.route("/:id")
    .get(CommentController.getCommentById)
    .patch(CommentController.updateComment)


module.exports = router;
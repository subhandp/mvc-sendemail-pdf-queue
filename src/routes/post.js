const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");

router.route("/")
    .get(PostController.getPost)
    .post(PostController.createPost)
    .delete(PostController.deletePostById)
router.route("/:id")
    .get(PostController.getPostById)
    .patch(PostController.updatePost)


module.exports = router;
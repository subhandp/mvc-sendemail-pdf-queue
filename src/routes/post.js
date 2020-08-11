const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { multerUploads } = require("../controllers/Upload");

router.route("/")
    .get(PostController.getPost)
    .post(multerUploads, PostController.createPost)
    .delete(PostController.deletePostById)
router.route("/:id")
    .get(PostController.getPostById)
    .patch(PostController.updatePost)


module.exports = router;
const express = require("express");
const router = express.Router();

const AuthorController = require("../controllers/AuthorController");

router.route("/")
    .get(AuthorController.getAuthor)
    .post(AuthorController.createAuthor)
    .delete(AuthorController.deleteAuthorById)
router.route("/:id")
    .get(AuthorController.getAuthorById)
    .patch(AuthorController.updateAuthor)


module.exports = router;
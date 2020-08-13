const AuthController = require("../controllers/AuthController");
const express = require('express');
const router = express.Router();

router.post('/login', AuthController.loginAuthor);
router.post('/register', AuthController.createAuthor);

module.exports = router;
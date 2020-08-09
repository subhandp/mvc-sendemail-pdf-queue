const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/', async(req, res, next) => {
    passport.authenticate('login', async(err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error(err.message)
                return next(error.message);
            }
            req.login(user, { session: false }, async(error) => {
                if (error) return next(error.message)
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'bootcamp');
                return res.status(200).json({
                    "status": "OK",
                    "token": token
                });
            });
        } catch (error) {
            return next(error.message);
        }
    })(req, res, next);
});

module.exports = router;
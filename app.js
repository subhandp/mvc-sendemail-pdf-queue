const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const routerAuthor = require("./src/routes/author");
const routerPost = require("./src/routes/post");
const routerComment = require("./src/routes/comment");
const routerAuth = require("./src/routes/auth");

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { Author } = require("./src/models");

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

app.use("/author", passport.authenticate('jwt', { session: false }), routerAuthor);
app.use("/post", passport.authenticate('jwt', { session: false }), routerPost);
app.use("/comment", passport.authenticate('jwt', { session: false }), routerComment);
app.use("/login", routerAuth);


passport.use('login', new localStrategy(
    async(username, password, done) => {
        try {
            const user = await Author.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const validate = user.password === password ? true : false;
            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    }
));

//Menggunakan parameter get untuk menerima token
//{{local}}/author?secret_token=--token--
passport.use(new JWTstrategy({
    secretOrKey: 'bootcamp',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async(token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
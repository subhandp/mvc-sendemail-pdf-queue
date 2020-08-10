require('dotenv').config()
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
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const path = require('path');
const datauri = require('datauri/parser');

const mydatauri = new datauri();
const dataUri = req => mydatauri.format(path.extname(req.file.originalname), req.file.buffer);

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


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
app.post("/upload-image-cloud", multerUploads, (request, response) => {
    console.log('req.file : ', request.file);
    const file = dataUri(request).content;
    console.log(file)
    return cloudinary.uploader.upload(file).then((result) => {
        const image = result.url;
        return res.status(200).json({
            message: 'Your image has been uploded successfully to cloudinary',
            data: {
                image
            }
        });
    }).catch((error) => {
        res.status(400).json({
            messge: 'someting went wrong while processing your request',
            data: {
                err
            }
        });
    });

})



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
    secretOrKey: process.env.PRIVATE_KEY,
    jwtFromRequest: ExtractJWT.fromHeader('authorization')
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
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const routerAuthor = require("./src/routes/author");
const routerPost = require("./src/routes/post");
const routerComment = require("./src/routes/comment");



app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

app.use("/author", routerAuthor);
app.use("/post", routerPost);
app.use("/comment", routerComment);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
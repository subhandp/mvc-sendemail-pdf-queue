const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const routerAuthor = require("./src/routes/author");

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

app.use("/author", routerAuthor);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
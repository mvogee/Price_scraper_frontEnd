require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
//const plattItm = require("./db.js").plattItm;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = process.env.port || 3095;


// connect to database.
// post route for sql query
// post route for filter querys
app.get("/", (req, res) => {
    res.send("server is working");
});

app.post("/sqlQuery", (req, res) => {
    let sql = req.body.sql-input;
});

app.post("/search", (req, res) => {

});

app.listen(port, () => {
    console.log("server is live");
});
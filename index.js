const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env')});
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("./db.js").pool;
const { pool } = require('./db.js');
const { getTable, sqlCheck, createSqlQuery } = require('./helpers.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));
const port = process.env.PORT;

if (process.env.NODE_ENV === "production") {
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
app.get("/", (req, res) => {
    res.send("pong");
});

app.post("/search", (req, res) => {
    const category = req.body.category && req.body.category !== "none" ? req.body.category : null;
    const subCat = req.body.subCat && req.body.subCat !== "none" ? req.body.subCat : null;
    const subCatTwo = req.body.subCatTwo && req.body.subCatTwo !== "none" ? req.body.subCatTwo : null;
    const subCatThree = req.body.subCatThree && req.body.subCatThree !== "none" ? req.body.subCatThree : null;
    const nameSearch = req.body.nameSearch ? "%" + req.body.nameSearch + "%" : null;
    const unpriced = req.body.unpriced;
    const discontinued = req.body.discontinued;
    const resultsPerPage = req.body.resultsPerPage;
    const totalResults = req.body.resultPage * resultsPerPage;
    console.log(req.body);
    
    let sqlObj = createSqlQuery(req.body.vendor, category, subCat, subCatTwo, subCatThree, nameSearch, unpriced, discontinued);
    let testsql = "SELECT * FROM " + getTable(req.body.vendor) + " WHERE category='"+ category +"' AND sub_category_one='"+ subCat+ "' AND sub_category_two='" + subCatTwo + "' AND sub_category_three='" + subCatThree + "' AND (headline LIKE'" + nameSearch + "' OR description LIKE '" + nameSearch + "' OR also_known_as LIKE '" + nameSearch + "');";
    console.log(sqlObj.sql);
    console.log(testsql);
    if (!sqlCheck(testsql)) {
        console.log("sql check did not pass. Illegal variable included in query");
        res.json({error: "The sql included an illegal variable", message: "The request included an illegal request. please try again."});
    }
    mysql.query(sqlObj.sql, sqlObj.params, (err, result) => {
        if (err) {
            console.log(err);
            res.json({error: err, message: "database error"});
        }
        else {
            let responseObj = {numResults: result.length, results: result}
            console.log(result.length);
            if (result.length > resultsPerPage) {
                responseObj.results = result.slice(totalResults - resultsPerPage, totalResults);
                res.send(JSON.stringify(responseObj));
            }
            else {
                res.send(JSON.stringify(responseObj));
            }
        }
        
    });
});

app.post("/vendorSelect", (req, res) => {
    let table = getTable(req.body.selectedVendor);
    let sql = "SELECT DISTINCT category FROM " + table + ";"
    if (!sqlCheck(sql)) {
        console.log("sql check did not pass. Illegal variable included in query");
        res.json({error: "The sql included an illegal variable", message: "The request included an illegal request. please try again."});
        return ;
    }
    mysql.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.json({error: err, message: "database error"});
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});
app.post("/categorySelect", (req, res) => {
    let table = getTable(req.body.selectedVendor);
    let category = req.body.selectedCategory;
    let sql = "SELECT DISTINCT sub_category_one FROM " + table + " WHERE category=?;";
    if (!sqlCheck(sql)) {
        console.log("sql check did not pass. Illegal variable included in query");
        res.json({error: "The sql included an illegal variable", message: "The request included an illegal request. please try again."});
        return ;
    }
    mysql.query(sql, category, (err, result) => {
        if (err) {
            console.log(err);
            res.json({error: err, message: "database error"});
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});
app.post("/subCatSelect", (req, res) => {
    let table = getTable(req.body.selectedVendor);
    let category = req.body.selectedCategory;
    let subCat = req.body.selectedSubCategory;
    let sql = "SELECT DISTINCT sub_category_two FROM " + table + " WHERE category=? AND sub_category_one=?;";
    if (!sqlCheck(sql)) {
        console.log("sql check did not pass. Illegal variable included in query");
        res.json({error: "The sql included an illegal variable", message: "The request included an illegal request. please try again."});
        return ;
    }
    mysql.query(sql, [category, subCat], (err, result) => {
        if (err) {
            console.log(err);
            res.json({error: err, message: "database error"});
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});
app.post("/filterOneSelect", (req, res) => {
    let table = getTable(req.body.selectedVendor);
    let category = req.body.selectedCategory;
    let subCat = req.body.selectedSubCategory;
    let filter = req.body.selectedSubCatTwo;
    let sql = "SELECT DISTINCT sub_category_three FROM " + table + " WHERE category=? AND sub_category_one=? AND sub_category_two=?;";
    if (!sqlCheck(sql)) {
        console.log("sql check did not pass. Illegal variable included in query");
        res.json({error: "The sql included an illegal variable", message: "The request included an illegal request. please try again."});
        return ;
    }
    mysql.query(sql, [category, subCat, filter], (err, result) => {
        if (err) {
            console.log(err);
            res.json({error: err, message: "database error"});
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});

app.listen(port, () => {
    console.log("server is live");
});
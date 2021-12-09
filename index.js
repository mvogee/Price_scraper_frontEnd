require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("./db.js").pool;
const { pool } = require('./db.js');
const { getTable, sqlCheck, createSqlQuery } = require('./helpers.js');
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

app.post("/sqlQuery", async (req, res) => {
    const sql = req.body.sqlInput;
    console.log(sql);
    if (!sqlCheck(sql)) {
        console.log("sql check did not pass. Illegal variable included in query");
        res.json({error: "The sql included an illegal variable", message: "The request included an illegal request. (DELETE, INSERT, CREATE, ALTER, DROP) are not allowed queries. please try again."});
        return ;
    }
    try {
        mysql.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.json({error: err.sqlMessage, message: "sql query error"});
            }
            else {
                let responseObj = {numResults: result.length, results: result}
                console.log(result.length);
                if (result.length > 100) {
                    responseObj.results = result.slice(0, 50);
                    res.send(JSON.stringify(responseObj));
                }
                else {
                    res.send(JSON.stringify(responseObj));
                }
            }
        });
    }
    catch(e) {
        console.log(e);
        res.json({error: e, message: "database query error"});
    }
});



app.post("/search", (req, res) => {
    const category = req.body.category && req.body.category !== "none" ? req.body.category : null;
    const subCat = req.body.subCat && req.body.subCat !== "none" ? req.body.subCat : null;
    const subCatTwo = req.body.subCatTwo && req.body.subCatTwo !== "none" ? req.body.subCatTwo : null;
    const subCatThree = req.body.subCatThree && req.body.subCatThree !== "none" ? req.body.subCatThree : null;
    const nameSearch = req.body.nameSearch ? "%" + req.body.nameSearch + "%" : null;
    let sqlObj = createSqlQuery(req.body.vendor, category, subCat, subCatTwo, subCatThree, nameSearch);
    //"SELECT * FROM " + getTable(req.body.vendor) + " WHERE category=? AND sub_category_one=? AND sub_category_two=? AND sub_category_three=? AND (headline LIKE ? OR description LIKE ? OR also_known_as LIKE ?);";
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
            if (result.length > 100) {
                responseObj.results = result.slice(0, 50);
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
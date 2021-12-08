require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("./db.js").pool;
const { pool } = require('./db.js');
//const plattItm = require("./db.js").plattItm;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = process.env.port || 3095;

function getTable(vendor) {
    let table;
    switch (vendor) {
        case "Platt":
            table = 'platt_products';
            break;
        case "Home Depot":
            table = 'platt_products'; // change this once scraper for home depot is done
            break;
        case "Bell Electric":
            table = 'platt_products'; // change this once scraper for bell is done.
        default:
            table = 'platt_products';
            break;
    }
    return table;
}
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
    //! verify nothing in the query that shouldn't be (DELETE, INSERT, CREATE, ALTER, DROP)
    //! especially check req.body.vendor for mallicious intent.
    const category = req.body.category ? req.body.category : "*";
    const subCat = req.body.subCat ? req.body.subCat : "*";
    const subCatTwo = req.body.subCatTwo ? req.body.subCatTwo : "*";
    const subCatThree = req.body.subCatThree ? req.body.subCatThree : "*";
    const nameSearch = req.body.nameSearch ? "%" + req.body.nameSearch + "%" : "%%";
    let sql = "SELECT * FROM " + getTable(req.body.vendor) + " WHERE category=? AND sub_category_one=? AND sub_category_two=? AND sub_category_three=? AND (headline LIKE ? OR description LIKE ? OR also_known_as LIKE ?);";
    let testsql = "SELECT * FROM " + getTable(req.body.vendor) + " WHERE category='"+ category +"' AND sub_category_one='"+ subCat+ "' AND sub_category_two='" + subCatTwo + "' AND sub_category_three='" + subCatThree + "' AND (headline LIKE'" + nameSearch + "' OR description LIKE '" + nameSearch + "' OR also_known_as LIKE '" + nameSearch + "');";
    console.log(testsql);
    sql;
    mysql.query(sql, [category, subCat, subCatTwo, subCatThree, nameSearch, nameSearch, nameSearch], (err, result) => {
        if (err) {
            console.log(err);
            res.json({error: err, message: "database error"});
        }
        console.log(result.length);
        res.send(JSON.stringify(result));
    });
});

app.post("/vendorSelect", (req, res) => {
    let table = getTable(req.body.selectedVendor);
    let sql = "SELECT DISTINCT category FROM " + table + ";"
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
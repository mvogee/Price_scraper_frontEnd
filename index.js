require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("./db.js").pool;
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
    // take the search queries and build sql query.
    // query database and return result

    const data = [
            {
                headline: "Unistrut P1212     EG Universal Conduit Clamp 3/4 ' ",
                category: 'Fittings',
                subCategorys: [
                    'Strut - Fittings & Support',
                    'Pipe & Conduit Clamps',
                    'Strut Conduit Clamps - Universal'
                ],
                manufacturer: 'Unistrut',
                price: 'Call for Price800-257-5288Email Live Help',
                detailDescription: 'Universal Strut Strap, Diameter: 3/4 in, Material: Steel, Finish: Electro-Galvanized. For Rigid/Thinwall Conduit.   ',
                plattItemId: '0060060',
                date_updated: "2021-11-29T18:36:25.178Z",
                img_link: 'https://rexel-cdn.com/Products/StrutConduitClamps-Universal/Unistrut/P1212EG.jpg?i=D0B84F12-3A57-4914-93B5-4C2A526C1EF3&f=150',
                alsoKnownAs: 'Also known as: 786364121215, UNSP1212EG, Unistrut, P1212     EG, Strut Conduit Clamps - Universal, Pipe & Conduit Clamps, Strut - Fittings & Support, Fittings',
                upc: '786364121215'
            },
            {
                headline: 'Calbrite S60300BC00. ',
                category: null,
                subCategorys: [],
                manufacturer: 'Calbrite',
                price: 'Discontinued',
                detailDescription: 'CLB USE CORRECT ITEM # 898121\n',
                plattItemId: '0060292',
                date_updated: '2021-11-29T19:23:55.848Z',
                img_link: 'https://rexel-cdn.com/Products//Calbrite/S60300BC00-.jpg?i=0EA7A6C5-7DD2-4482-9229-D628D3AFAE9D&f=150',
                alsoKnownAs: 'Also known as: CLBS60300BC00., Calbrite, S60300BC00.',
                upc: null
            }
        ];
    console.log(req.body);
    res.send(JSON.stringify(data));
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
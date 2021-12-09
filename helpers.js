

    function getTable(vendor) {
        let table;
        switch (vendor) {
          case "Platt":
            table = "platt_products";
            break;
          case "Home Depot":
            table = "platt_products"; // change this once scraper for home depot is done
            break;
          case "Bell Electric":
            table = "platt_products"; // change this once scraper for bell is done.
          default:
            table = "platt_products";
            break;
        }
        return table;
      }

    function sqlCheck(sql) {
        let re = /DELETE|INSERT|CREATE|ALTER|DROP/ig;
        if (sql.match(re)) {
            return (false);
        }
        return (true);
    }

    function createSqlQuery(vendor, category, subCat, subCatTwo, subCatThree, nameSearch) {
        let sqlObj = {
            sql: "SELECT * FROM " + getTable(vendor),
            params: []
        }
        // pursue down this tree if category exists only then can the below exist.
        if (category) {
            sqlObj.sql += " WHERE category=?";
            sqlObj.params.push(category);
            if (subCat) {
                sqlObj.sql += " AND sub_category_one=?";
                sqlObj.params.push(subCat);
                if (subCatTwo) {
                    sqlObj.sql += " AND sub_category_two=?";
                    sqlObj.params.push(subCatTwo);
                    if (subCatThree) {
                        sqlObj.sql += " AND sub_category_three=?";
                        sqlObj.params.push(subCatThree);
                        if (nameSearch) {
                            sqlObj.sql +=  " AND (headline LIKE ? OR description LIKE ? OR also_known_as LIKE ?)";
                            sqlObj.params.push(nameSearch, nameSearch, nameSearch);
                        }
                    }
                } 
            }
        }
        // if category was not picked only nameSearch may have been used. check it.
        else if (nameSearch) {
            sqlObj.sql += " WHERE (headline LIKE ? OR description LIKE ? OR also_known_as LIKE ?)";
            sqlObj.params.push(nameSearch, nameSearch, nameSearch);
        }
        sqlObj.sql += ";";
        return sqlObj;
    }

module.exports = {
    getTable,
    sqlCheck,
    createSqlQuery
}
module.exports = {

    getTable(vendor) {
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
    },

    sqlCheck(sql) {
        let re = /DELETE|INSERT|CREATE|ALTER|DROP/ig;
        if (sql.match(re)) {
            return (false);
        }
        return (true);
    }
}
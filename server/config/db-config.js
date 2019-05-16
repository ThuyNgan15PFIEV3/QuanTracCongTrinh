var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user:  "sa",
        password: "123",
        server: "localhost",
        database: "QuanTracCongTrinh"
    }); 
    return conn;
};

module.exports = connect;
var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit: 100,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    port     : process.env.DB_PORT,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

con.getConnection(function (err){   
    if(err) throw err;
    console.log("Database Connected!");
});

module.exports = con;
var mySQL = require('mysql');

var conn = mySQL.createConnection({
    host: "localhost",
    user: "RootUser",
    password: "passwordForRootUser"
});

conn.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected!");
        conn.query("CREATE DATABASE Climate_Edge_Api_Tasks", function(err, result) {
            if (err) {
                throw err;
            } else {
                console.log("Database created");
                conn.end();
            }
        });
    };
});

// conn.connect(function(err) {
//     if (err) {
//         throw err;
//     } else {
//         console.log("Connected!");
//         var sql = "CREATE TABLE API_status (id INT AUTO_INCREMENT PRIMARY KEY,phone VARCHAR(255), message VARCHAR(255), status BOOLEAN)";
//         conn.query(sql, function(err, result) {
//             if (err) {
//                 throw err;
//             } else {
//                 console.log("Table created");
//             }
//         });
//     };
// });
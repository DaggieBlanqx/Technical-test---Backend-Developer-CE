//Code to create a Table with 4columns i.e id, message, phone, status
var mySQL = require('mysql');

var conn = mySQL.createConnection({
  host: 'localhost',
  user: 'RootUser',
  password: 'passwordForRootUser',
  database: 'Climate_Edge_Api_Tasks',
});

var entries_alreadyProcessed = require('./624001-items-of-sample-data.js');

//SQL has a query limit of 1000, for this reason we need to split the entries in multiple queries.
//Split up the array in chunks of 999 so as to be below the 1000 SQL-Query limit.

var limit = 999;
var grouped_entries = [];
while (entries_alreadyProcessed.length) {
  grouped_entries.push(entries_alreadyProcessed.splice(0, limit));
}
console.log({ grouped_entries: grouped_entries.length });

function queryPromise(sql, values) {
  return new Promise((resolve, reject) => {
    // conn.query(query, (err, result) => {
    //     if (err) {
    //         return reject(err);
    //     }
    //     return resolve(result);
    // });

    conn.query(sql, [values], function (err, result) {
      // if (err) throw err;
      // console.log("Number of records inserted: " + result.affectedRows);

      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

conn.connect(async (err) => {
  await Promise.all(
    addreses.map((_, i) => {
      // return queryPromise(
      //     `INSERT INTO maintable (mainaddress, latitude, longitude) VALUES (${addreses[i]}, ${latitude[i]}, ${longitude[i]} )`
      // );
      var sql = 'INSERT INTO API_status (phone, message, status) VALUES ?';
      var values = entries_alreadyProcessed.map((processedEntry) => {
        return Object.values(processedEntry);
      });
      return queryPromise(sql, values);
    })
  );
});
/*
conn.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected!");

        var sql = "INSERT INTO API_status (phone, message, status) VALUES ?";
        console.log({ sql })
        var values = entries_alreadyProcessed.map((processedEntry) => {
            return Object.values(processedEntry);
        })

        // console.log(values);

        // conn.query(sql, [values], function(err, result) {
        //     if (err) throw err;
        //     console.log("Number of records inserted: " + result.affectedRows);
        // });
    };

});
*/

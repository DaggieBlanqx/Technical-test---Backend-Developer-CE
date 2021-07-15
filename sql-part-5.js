// Final Step(3): Storing bulk data in mySQL using the mysql2 library
const mysql = require('mysql2');

// This is basically an Array containing data previously processed by API
var entries_alreadyProcessed = require('./624001-items-of-sample-data.js');

//Using pools to re-use connections in an efficient manner.
const conn = mysql.createPool({
  host: 'localhost',
  user: 'RootUser',
  password: 'passwordForRootUser',
  database: 'Climate_Edge_Api_Tasks',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

var numberOfAllItems = entries_alreadyProcessed.length;

var saveItems = (batchedDataToBeStored) => {
  return new Promise((resolve, reject) => {
    console.log('Pool connected!');

    var sql = 'INSERT INTO API_status (phone, message, status) VALUES ?';

    var values = batchedDataToBeStored.map((dataToBeStored) => {
      return Object.values(dataToBeStored);
    });

    conn.query(sql, [values], function (err, result) {
      if (err) {
        reject(err);
      } else {
        numberOfAllItems = numberOfAllItems - result.affectedRows;
        
        console.log('Number of records inserted: ' + result.affectedRows);

        console.log(`${numberOfAllItems} items remaining..`);
        
        resolve(result);
      }
    });
  });
};

//SQL has a query limit of 1000, for this reason we need to split the entries in multiple queries.
//Split up the array in chunks of 1000 so as to be safely within the SQL-Query limit.
var limit = 1000;

var grouped_entries = [];
while (entries_alreadyProcessed.length) {
  grouped_entries.push(entries_alreadyProcessed.splice(0, limit));
}
 
var batchedDataToBeStored = [];
grouped_entries.map((_grouped_entry, index) => {
  batchedDataToBeStored.push(saveItems(_grouped_entry));
});

//This information can be piped into logging algorithms/software
var data_saved = [];
var data_notSaved = [];

Promise.allSettled(batchedDataToBeStored)
  .then((results) => {
    results.map((result) => {
      if (result.status === 'fulfilled') {
        data_saved.push(result.value);
      } else {
        //for Data not saved, this helps in error logging
        data_notSaved.push(result.reason);
      }
    });
    //close connection since everything has been completed
    conn.end();
  })
  .catch((err) => {
    console.log({ err });
  });

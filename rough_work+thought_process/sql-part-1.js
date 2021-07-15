var conn = mySQL.createConnection({
  host: 'localhost',
  user: 'RootUser',
  password: 'passwordForRootUser',
});

conn.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log('Connected!');
    conn.query(
      'CREATE DATABASE Climate_Edge_Api_Tasks',
      function (err, result) {
        if (err) {
          throw err;
        } else {
          console.log('Database created');
          conn.end();
        }
      }
    );
  }
});

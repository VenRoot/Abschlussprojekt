var mysql = require('mysql');
var connection;

function sql(Befehl) {
  connection.query(Befehl, function (error, results, fields) {
    if (error) throw error;
    console.log(Befehl);
    console.log(results[0]);
    return connection;
  });
}

function connectUno() {
 connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'uno'
  });
  connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM Spieler", function (err, result, fields) {
    if (err) throw err;
    console.log(result[0]);
  });
});
  console.log("Verifizieren...");
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  console.log("Uno: Verbunden...");

}

function connectKniffel() {
 connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'kniffel'
  });
  connection.connect();
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  console.log("Kniffel: Verbunden...");
}




function disconnect() {
  connection.end();
  console.log("Verlassen...");
}

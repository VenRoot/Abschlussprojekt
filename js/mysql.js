let mysql = require("mysql2");

let temp;
let temp2;
async function dat(Befehl) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySQL: Connected to localhost!");
    con.query("USE abschlussprojekt;", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });

  //await Sleep(100);


  con.query(Befehl, function (err, result) {
    if (err) throw err;
    //await Sleep(10);
    temp = result;
  });
  return temp;
  con.close();
}


async function dat_alt() {

  con.connect(function(err) {
    if (err) throw err;
    console.log("MySQL: Connected to localhost!");
    con.query("USE abschlussprojekt;", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });

  //await Sleep(100);


  con.query("UPDATE INUSE SET Server1 = FALSE WHERE INUSE.Server1 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  return temp;

  con.query("UPDATE INUSE SET Server2 = FALSE WHERE INUSE.Server2 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  return temp;

  con.query("UPDATE INUSE SET Server3 = FALSE WHERE INUSE.Server3 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  return temp;

  con.query("UPDATE INUSE SET Server4 = FALSE WHERE INUSE.Server4 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  return temp;

  con.query("UPDATE INUSE SET Server5 = FALSE WHERE INUSE.Server5 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  return temp;

  con.query("UPDATE INUSE SET Server1 = FALSE WHERE INUSE.Server1 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  return temp;
  con.close();
}


async function dat2(Befehl) {

  con.connect(function(err) {
    if (err) throw err;
    console.log("MySQL: Connected to localhost!");
    con.query("USE abschlussprojekt;", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });

  //await Sleep(100);
  con.promise().query(Befehl).then(rows => {
    someRows = rows;
    return con.query(Befehl);
  }).then( rows => {
    otherrows = rows;
    return con.close();
  }).then( () => {
    return result;
  })
}

let hs;
async function loadhighscore()
{
  return await dat('SELECT * FROM highscore;');
}

var con = mysql.createConnection({
  host: "localhost",
 user: "root",
  password: "",
  database: "Abschlussprojekt"
});

let mysql = require("mysql2");

let temp;
let temp2;

let pingtime = 1000;

async function Ping() {
  while (true) {
    ping.promise.probe(con.config.host)
        .then(function (res) {
            document.getElementById("Ping").innerHTML = "Ping: "+Math.round(res.avg)+"ms";
        });
    await Sleep(pingtime);
  }
}

function OfflineModus() {
  alert("Es wird in den Offline Modus gewechselt! Starte den MySQL Server und drücke danach auf OK\n\n\nDu kannst natürlich im lokalen Netz weiterhin Uno hosten, dennoch sind deine Daten vom Online-Server nicht verfügbar");
  con.config.host = "localhost";
  con.config.user = "root";
  con.config.password = "";
  con.config.database = "abschlussprojekt";
}

const con = mysql.createConnection({
  host: "*****",
  user: "ven",
  password: "*****",
  database: "vendb"
});

function connect()
{
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySQL: Connected to prow.li!");
    con.query("USE vendb;", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

async function dat4(Befehl) {
  console.log(Befehl);
  con.query(Befehl, async function (err, result) {
    await Sleep(100);
    if (err) throw err;
    return result;
  });

}

con.connect(function(err) {
  if (err) throw err;
  console.log("MySQL: Connected to prow.li!");
  con.query("USE vendb;", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

async function dat(Befehl) {

  return new Promise((resolve, reject) => {
    con.query(Befehl, async function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  })
}



// async function connect() {
//   return new Promise((resolve, reject) => {
//     con.connect(function(err) {
//       if (err) return reject(err);
//       console.log("MySQL: Connected to localhost!");
//       con.query("USE abschlussprojekt;", function (err, result) {
//         if (err) return reject(err);
//         console.log(result);
//         return resolve();
//       });
//     });
//   })
// }
//
// async function query(Befehl) {
//   return new Promise((resolve, reject) => {
//     con.query(Befehl, function (err, result) {
//       if (err) return reject(err);
//
//       return resolve(result);
//     });
//   })
// }
//
// async function dat(Befehl) {
//   await connect();
//   const result = await query(Befehl);
//   con.close();
//   return result;
// }

async function dat3(Befehl) {

  return new Promise((resolve, reject) => {

    try {

      con.connect(err => {
        // wenn error ist dann REJECT damit der wo awaited weiß es ist was kaputt
        if (err) return reject(err);
        console.log("MySQL: Connected to localhost!");
        con.query(Befehl, (err, result) => {
          // throw nur verwenden wenn du einen tcatch block hast
          if (err) return reject(err);
          return resolve(result);
        });
      })

    } catch (e) {
      console.error("Nope");
      return reject (e);

    } finally {
      // immer im finally sonst gibts konflikte wenn deine query durch ist.
      con.close();
      console.log("Geschlossen");
    }


    });
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
  new Promise((resolve, reject) => {
    con.query("UPDATE INUSE SET Server1 = FALSE WHERE INUSE.Server1 IS NULL;", async function (err, result) {
      if (err) throw err;
      await Sleep(10);
      temp = result;
    });
    return resolve();
    });
  //return temp;

  con.query("UPDATE INUSE SET Server2 = FALSE WHERE INUSE.Server2 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  //return temp;

  con.query("UPDATE INUSE SET Server3 = FALSE WHERE INUSE.Server3 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  //return temp;

  con.query("UPDATE INUSE SET Server4 = FALSE WHERE INUSE.Server4 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  //return temp;

  con.query("UPDATE INUSE SET Server5 = FALSE WHERE INUSE.Server5 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  //return temp;

  con.query("UPDATE INUSE SET Server1 = FALSE WHERE INUSE.Server1 IS NULL;", async function (err, result) {
    if (err) throw err;
    await Sleep(10);
    temp = result;
  });
  con.close();

  return temp;

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


async function me()
{
  const pool = mysql2.createPool({
      host:"localhost",
      user:"root",
      password:"",
      database:"abschlussprojekt"
    });

    const promisePool = pool.promise();

    return await promisePool.query("SELECT * FROM server1;");

}


async function mee() {
  mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: "",
    database: 'abschlussprojekt'
  },
   (err,con) => {
    con.promise().query("SELECT * from spielernamen;")
    .then( ([rows,fields]) => {
     console.log(rows);
    })
    .catch(console.log)
    .then(
      () => con.end()
    );
   });
}

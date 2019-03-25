let Singleplayer = true;
let isUserLoggedIn = false;
let HMScreen = document.getElementById("HMScreen");
let ServerBelegt = [];
let ServerUser = [];
var preuser = -1;


async function prelogin()
{
  preuser = await dat("SELECT * FROM users;"); //Jedes Mal, wenn er diese Funktion ausführt, bekommt preuser wieder die Werte vom falschen Table, deswegen nur einmal
  login(preuser);
}
async function login(user) {
  if (user == -1 ||user[0].Name != undefined) {
    alert("Bitte versuche es erneut");
  }
  for (var i = 0; i < user.length; i++) {
    if (user[i].username == document.getElementById("usernameinput").value) {
      if (user[i].password == await md5(document.getElementById("passwordinput").value)) {
        console.log("SUCCESS");

      }

      else {
        alert("Falsches Passwort");
      }
    }
    else {
      alert("User nicht gefunden");
    }
    console.warn(user[i]);
    console.error();(md5(document.getElementById("passwordinput").value));
    console.error(document.getElementById("usernameinput").value);
  }
  //user = await dat("SELECT * FROM users WHERE username = "+document.getElementById("usernameinput").value+";");
  //user = await dat("SELECT * FROM users WHERE username = "+document.getElementById("usernameinput").value+";");


  // console.log(user);
  // if (user == []) {
  //   alert("Dieser Benutzername ist noch nicht registriert. Bitte registrieren Sie sich");
  // }
  // else if (md5(document.getElementById("passwordinput").value) == user[0].password)
  // {
  //   alert("Erfolgreich eingeloggt");
  // }
  // else {
  //   alert("Passwort falsch");
  //   console.warn(md5(document.getElementById("passwordinput").value));
  //   console.warn(user[0].password);
  // }
}

// async function ServerTable()
// {
//   ServerDaten[1] = await dat("SELECT * FROM INUSE;");
// }

function Switch() {
  let SP  = document.getElementById("SingleplayerButton");
  if (SP.innerHTML == "Singleplayer" ) {
    SP.innerHTML = "Multiplayer";
    Singleplayer = false;
  }
  else {
    SP.innerHTML = "Singleplayer";
    Singleplayer = true;
  }
}


window.onload = function() {
if (window.jQuery) {
  // jQuery is loaded
  console.log("jQuery ist bereit!");
} else {
  // jQuery is not loaded
  console.log("jQuery konnte nicht gestartet werden!");
}
}

async function EditDark()
{
   $('#foo').toggle();
  await $("#Übernehmen").toggle();

  document.getElementById("foo").value = DunklerModusFarbe.substr(1);
  document.getElementById("foo").style.backgroundColor = DunklerModusFarbe;
}

async function isName()
{
  if (document.getElementById("Spieler1NameFeldHM").value == "") {
    var Spieler1Name = "Spieler 1";
  }
  if (document.getElementById("Spieler2NameFeldHM").value == "") {
    var Spieler2Name = "Spieler 2;"
  }
  await Sleep(100);
}

async function UnoStartHM()
{
  //await isName();

  // fs.writeFileSync('./js/SP1Name.txt', document.getElementById("Spieler1NameFeldHM").value, (err) => {
  // if (err) throw err;
  // });
  //
  // fs.writeFileSync('./js/SP2Name.txt', document.getElementById("Spieler2NameFeldHM").value, (err) => {
  // if (err) throw err;
  // });

  //Alternativ: Schreiben in updaterainbow

  await dat("UPDATE spielernamen SET Spieler1 = '"+document.getElementById("Spieler1NameFeldHM").value+"';");
  await dat("UPDATE spielernamen SET Spieler2 = '"+document.getElementById("Spieler2NameFeldHM").value+"';");
  location.href = "./Uno.html";
}

async function CPUTable()
{
  if (isUserLoggedIn) {
    document.getElementById("TableUsername").innerHTML = Benutzername + " (eingeloggt)";
  }
  else {
    document.getElementById("TableUsername").innerHTML = Benutzername + " (nicht eingeloggt)";
  }
  document.getElementById("TableSystem").innerHTML = Kernel;

  document.getElementById("TableIP").innerHTML = IPAdresse;
  if (IPAdresse === undefined) {
    document.getElementById("TableIP").innerHTML = "Du bist mit keinem Netzwerk verbunden";
  }
  document.getElementById("TableArch").innerHTML = Arch;
  document.getElementById("TableCPU").innerHTML = CPUKerne+"×"+CPU;
}

async function Übernehmen()
{
  //let abc = document.getElementById("foo").value;
  //await Sleep(10);
  //new Promise(resolve => Save()).then(Load());

  await Save(true);
  await Load();

  //console.log("LAAADEN");
}
// async function gotoUno() {
//   document.body.innerHTML = '<input type="text" placeholder="Name von Spieler 1" id="Spieler1Name__"> <br> <input type="text" placeholder="Name von Spieler 2" id="Spieler2Name__">';
// }
//
// function gotoUno2()
// {
//   Spieler1Name
//   document.location.href="./Uno.html";
// }

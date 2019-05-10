let Singleplayer = true;
let isUserLoggedIn = false;
let HMScreen = document.getElementById("HMScreen");
let ServerBelegt = [];
let ServerUser = [];
var preuser = -1;


async function testServer(ppp)
{
  await dat("UPDATE INUSE SET server"+ppp+" = TRUE;");
  await dat("UPDATE server"+ppp+" SET EMPTY= FALSE;");
  await dat("UPDATE server"+ppp+" SET FULL = FALSE;");
}

async function fillServer(ppp)
{
  await dat("UPDATE INUSE SET server"+ppp+" = TRUE;");
  await dat("UPDATE server"+ppp+" SET EMPTY= FALSE, FULL = TRUE;");
  await dat("UPDATE server"+ppp+" SET FULL = FALSE, FULL = TRUE;");
}

async function register()
{
  if (document.getElementById("usernameinput").value == "") {
    JSAlert.alert("Geben Sie einen Benutzernamen ein");
  }
  else if (document.getElementById("usernameinput").value.length <3) {
    JSAlert.alert("Der Nutzername darf nicht weniger als 3 Zeichen haben", null, JSAlert.Icons.Warning);
  }
  else if (document.getElementById("usernameinput").value == "root") {
    JSAlert.alert("Ey, ich bin schon Admin");
  }
  else {
    let dbuser = await dat("SELECT * FROM users WHERE username = '"+document.getElementById("usernameinput").value+"';");
    console.log(dbuser);
    if (dbuser.length != 0) {
      if (document.getElementById("usernameinput").value == dbuser[0].username) {
        console.error(document.getElementById("usernameinput").value);
        console.error(await dat("SELECT * FROM users WHERE username = '"+document.getElementById("usernameinput").value+"';"));
        JSAlert.alert("Benutzername ist bereits vergeben", null, JSAlert.Icons.Failed);
      }
    }

    else {
      await dat("INSERT INTO users VALUES('"+document.getElementById("usernameinput").value+"', '"+md5(document.getElementById("passwordinput").value)+"', '"+Benutzername+"', NOW());");
      JSAlert.alert("Registrierung erfolgreich!");
      prelogin();
    }
  }
}

async function LoadServer()
{
  console.log("Loading");
  let belegteServer = await dat("SELECT * FROM INUSE;");
  console.log(belegteServer);
  if (belegteServer[0].Server1) {
    console.warn("Server1");
    let S1 = await dat("SELECT * FROM server1");
    if (S1[0].FULL) {
      document.getElementById("TableServer1").title = "Spieler: "+S1[0].Spieler1Name+"\nIP-Adresse: "+S1[0].Spieler1IP+"\n\nSpieler: "+S1[0].Spieler2Name+ "\nIP-Adresse: "+S1[0].Spieler2IP+"\n\n Spiel gestartet";
      document.getElementById("TableServer1").style["color"] = "red";
      document.getElementById("TableServer1").innerHTML = "2/2 Spieler";
    }
    else if (!S1[0].EMPTY) {
      document.getElementById("TableServer1").innerHTML = "1/2 Spieler";
      document.getElementById("TableServer1").style["color"] = "yellow";
      document.getElementById("TableServer1").title = "Spieler: "+S1[0].Spieler1Name+"\nIP-Adresse: "+S1[0].Spieler1IP+"\nKlicke, um beizutreten";
      document.getElementById("TableServer1").setAttribute("onclick", 'BetreteServer(1);');
    }
    else {
      document.getElementById("TableServer1").innerHTML = "0/2 Spieler";
      document.getElementById("TableServer1").style["color"] = "";
      document.getElementById("TableServer1").title = "Keine Spieler";
      document.getElementById("TableServer1").removeAttribute("onclick");
    }
  }
  else {
    document.getElementById("TableServer1").innerHTML = "0/2 Spieler";
    document.getElementById("TableServer1").style["color"] = "";
    document.getElementById("TableServer1").title = "Keine Spieler";
    document.getElementById("TableServer1").removeAttribute("onclick");
  }
  if (belegteServer[0].Server2) {
    console.warn("Server2");
    let S2 = await dat("SELECT * FROM server2");
    console.warn(S2);
    if (S2[0].FULL) {
      document.getElementById("TableServer2").title = "Spieler: "+S2[0].Spieler1Name+"\nIP-Adresse: "+S2[0].Spieler1IP+"\n\nSpieler: "+S2[0].Spieler2Name+ "\nIP-Adresse: "+S2[0].Spieler2IP+"\n\n Spiel gestartet";
      document.getElementById("TableServer2").style["color"] = "red";
      document.getElementById("TableServer2").innerHTML = "2/2 Spieler";
    }
    else if (!S2[0].EMPTY) {
      document.getElementById("TableServer2").innerHTML = "1/2 Spieler";
      document.getElementById("TableServer2").style["color"] = "yellow";
      document.getElementById("TableServer2").title = "Spieler: "+S2[0].Spieler1Name+"\nIP-Adresse: "+S2[0].Spieler1IP+"\nKlicke, um beizutreten";
      document.getElementById("TableServer2").setAttribute("onclick", 'BetreteServer(2);');
    }
    else {
      document.getElementById("TableServer2").innerHTML = "0/2 Spieler";
      document.getElementById("TableServer2").style["color"] = "";
      document.getElementById("TableServer2").title = "Keine Spieler";
      document.getElementById("TableServer2").removeAttribute("onclick");
    }
  }
  else {
    document.getElementById("TableServer2").innerHTML = "0/2 Spieler";
    document.getElementById("TableServer2").style["color"] = "";
    document.getElementById("TableServer2").title = "Keine Spieler";
    document.getElementById("TableServer2").removeAttribute("onclick");
  }
  if (belegteServer[0].Server3) {
    console.warn("Server3");
    let S3 = await dat("SELECT * FROM server3");
    if (S3[0].FULL) {
      document.getElementById("TableServer3").title = "Spieler: "+S3[0].Spieler1Name+"\nIP-Adresse: "+S3[0].Spieler1IP+"\n\nSpieler: "+S3[0].Spieler2Name+ "\nIP-Adresse: "+S3[0].Spieler2IP+"\n\n Spiel gestartet";
      document.getElementById("TableServer3").style["color"] = "red";
      document.getElementById("TableServer3").innerHTML = "2/2 Spieler";
    }
    else if (!S3[0].EMPTY) {
      document.getElementById("TableServer3").innerHTML = "1/2 Spieler";
      document.getElementById("TableServer3").style["color"] = "yellow";
      document.getElementById("TableServer3").title = "Spieler: "+S3[0].Spieler1Name+"\nIP-Adresse: "+S3[0].Spieler1IP+"\nKlicke, um beizutreten";
      document.getElementById("TableServer3").setAttribute("onclick", 'BetreteServer(3);');
    }
    else {
      document.getElementById("TableServer3").innerHTML = "0/2 Spieler";
      document.getElementById("TableServer3").style["color"] = "";
      document.getElementById("TableServer3").title = "Keine Spieler";
      document.getElementById("TableServer3").removeAttribute("onclick");
    }
  }
  else {
    document.getElementById("TableServer3").innerHTML = "0/2 Spieler";
    document.getElementById("TableServer3").style["color"] = "";
    document.getElementById("TableServer3").title = "Keine Spieler";
    document.getElementById("TableServer3").removeAttribute("onclick");
  }
  if (belegteServer[0].Server4) {
    console.warn("Server4");
    let S4 = await dat("SELECT * FROM server4");
    if (S4[0].FULL) {
      document.getElementById("TableServer4").title = "Spieler: "+S4[0].Spieler1Name+"\nIP-Adresse: "+S4[0].Spieler1IP+"\n\nSpieler: "+S4[0].Spieler2Name+ "\nIP-Adresse: "+S4[0].Spieler2IP+"\n\n Spiel gestartet";
      document.getElementById("TableServer4").style["color"] = "red";
      document.getElementById("TableServer4").innerHTML = "2/2 Spieler";
    }
    else if (!S4[0].EMPTY) {
      document.getElementById("TableServer4").innerHTML = "1/2 Spieler";
      document.getElementById("TableServer4").style["color"] = "yellow";
      document.getElementById("TableServer4").title = "Spieler: "+S4[0].Spieler1Name+"\nIP-Adresse: "+S4[0].Spieler1IP+"\nKlicke, um beizutreten";
      document.getElementById("TableServer4").setAttribute("onclick", 'BetreteServer(4);');
    }
    else {
      document.getElementById("TableServer4").innerHTML = "0/2 Spieler";
      document.getElementById("TableServer4").style["color"] = "";
      document.getElementById("TableServer4").title = "Keine Spieler";
      document.getElementById("TableServer4").removeAttribute("onclick");
    }
  }
  else {
    document.getElementById("TableServer4").innerHTML = "0/2 Spieler";
    document.getElementById("TableServer4").style["color"] = "";
    document.getElementById("TableServer4").title = "Keine Spieler";
    document.getElementById("TableServer4").removeAttribute("onclick");
  }
  if (belegteServer[0].Server5) {
    console.warn("Server5");
    let S5 = await dat("SELECT * FROM server5");
    if (S5[0].FULL) {
      document.getElementById("TableServer5").title = "Spieler: "+S5[0].Spieler1Name+"\nIP-Adresse: "+S5[0].Spieler1IP+"\n\nSpieler: "+S5[0].Spieler2Name+ "\nIP-Adresse: "+S5[0].Spieler2IP+"\n\n Spiel gestartet";
      document.getElementById("TableServer5").style["color"] = "red";
      document.getElementById("TableServer5").innerHTML = "2/2 Spieler";
    }
    else if (!S5[0].EMPTY) {
      document.getElementById("TableServer5").innerHTML = "1/2 Spieler";
      document.getElementById("TableServer5").style["color"] = "yellow";
      document.getElementById("TableServer5").title = "Spieler: "+S5[0].Spieler1Name+"\nIP-Adresse: "+S5[0].Spieler1IP+"\nKlicke, um beizutreten";
      document.getElementById("TableServer5").setAttribute("onclick", 'BetreteServer(5);');
    }
    else {
      document.getElementById("TableServer5").innerHTML = "0/2 Spieler";
      document.getElementById("TableServer5").style["color"] = "";
      document.getElementById("TableServer5").title = "Keine Spieler";
      document.getElementById("TableServer5").removeAttribute("onclick");
    }
  }
  else {
    document.getElementById("TableServer5").innerHTML = "0/2 Spieler";
    document.getElementById("TableServer5").style["color"] = "";
    document.getElementById("TableServer5").title = "Keine Spieler";
    document.getElementById("TableServer5").removeAttribute("onclick");
  }
  await Sleep(3000);
  LoadServer();
}

async function BetreteServer(Server)
{
  if (isUserLoggedIn) {
    await fs.writeFileSync(__dirname+'/js/welcherServer.txt', Server, (err) => {if (err) throw err;});
    //await dat("INSERT INTO placeholder SET Server = "+Server+", IP = '"+IPAdresse+"';");
    await dat("UPDATE server"+Server+" SET Spieler2Name = '"+preuser[0].username+"', Spieler2IP = '"+IPAdresse+"', FULL = TRUE;");
    document.location.href = "./UnoGast.html";
  }
  else {
    JSAlert.alert("Du bist nicht eingeloggt");
  }
}

async function Server1Sim()
{
  document.getElementById("TableServer1").innerHTML = "1/2 Spieler";
  document.getElementById("TableServer1").style["color"] = "yellow";
  document.getElementById("TableServer1").title = "Spieler: Hanz\nIP-Adresse: 192.168.178.62\nKlicke, um beizutreten";
  document.getElementById("TableServer1").setAttribute("onclick", 'Server1Sim2();');
}
async function Server1Sim2()
{
  document.getElementById("TableServer1").title = "Spieler: Hanz\nIP-Adresse: 192.168.178.62\n\nSpieler: "+preuser[0].username+ "\nIP-Adresse: "+IPAdresse+"\n\n Spiel gestartet";
  document.getElementById("TableServer1").style["color"] = "red";
  document.getElementById("TableServer1").innerHTML = "2/2 Spieler";
  await dat("INSERT INTO server1 VALUES('5,2,8,5,9,3,5', 'ROT, GRÜN, GRÜN, BLAU, GELB, GELB, ROT', '5,2,1,4,0,5,4', 'ROT, ROT, ROT, GRÜN, BLAU, BLAU, GELB', 'Hanz', '"+preuser[0].username+ "', '192.168.178.62', '"+IPAdresse+"');");
}
let TS1 = document.getElementById("TableServer1");
let TS2 = document.getElementById("TableServer2");
let TS3 = document.getElementById("TableServer3");
let TS4 = document.getElementById("TableServer4");
let TS5 = document.getElementById("TableServer5");

let SP1ServerIP = "192.168.178.63";
let S1Name_ = "Ven";

let SP2ServerIP = "192.168.178.87";
let S2Name_ = "Torui";

let SP3ServerIP = "192.168.178.23";
let S3Name_ = "Prowler";

let Text = "IP-Adresse: "+SP1ServerIP+"\nName: "+S1Name_;
let Text2 = "IP-Adresse: "+SP2ServerIP+"\nName: "+S2Name_+"\n\nIP-Adresse: "+SP3ServerIP+"\nName: "+S3Name_;

async function updateTable()
{
  TS1.innerHTML = "1/2 Spieler";
  TS1.style.color = "yellow";
  TS1.setAttribute("title", Text);
  TS1.setAttribute("onclick", "JSAlert.alert('Erfolgreich beigetreten');");

  TS2.innerHTML = "2/2 Spieler";
  TS2.style.color = "red";
  TS2.setAttribute("title", Text2);
  TS2.setAttribute("onclick", "JSAlert.alert('Der Server ist bereits belegt!');");
  //await Sleep(1000);
  //updateTable();
}

async function prelogin()
{

  preuser = await dat("SELECT * FROM users;"); //Everytime, this function is executed, it gets the results from the wrong table, so just ONE execution
  login(preuser);
}

async function login(user)
{
  preuser = await dat("SELECT * FROM users WHERE username = '"+document.getElementById("usernameinput").value+"';");
  if (!JSON.stringify(preuser).includes("username")) {
    await Sleep(100);
    login();
  }
  else {
    console.warn(preuser);
    await Sleep(100);
  if (preuser[0].password == await md5(document.getElementById("passwordinput").value)) {
    console.warn("Passwort korrekt");
    JSAlert.alert("Login erfolgreich");
    isUserLoggedIn = true;
    document.getElementById("usernamefeld").innerHTML = "Willkommen, "+preuser[0].username;
    document.getElementById("Spieler1NameFeldHM").value = preuser[0].username;
    document.getElementsByClassName("Spieler1NameFeldHM").value = preuser[0].username;
    reverse(true);
    CPUTable();
  }
  else {
    JSAlert.alert("Falsches Passwort");
    console.error("Passwort falsch");
  }
  }
}

async function reverse(ew)
{
  if (ew) {
    document.getElementById("loginbtn").innerHTML = "Abmelden";
    document.getElementById("loginbtn").setAttribute("onclick", "Abmelden();");
  }
  else {
    document.getElementById("loginbtn").innerHTML = "Anmelden";
    document.getElementById("loginbtn").setAttribute("onclick", "prelogin();");
  }

}

async function Abmelden()
{
  isUserLoggedIn = false;
  CPUTable();
  reverse(false);
  document.getElementById("Spieler1NameFeldHM").value = Benutzername;
  document.getElementsByClassName("Spieler1NameFeldHM").value = Benutzername;
  JSAlert.alert("erfolgreich abgemeldet");
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


const masteruser = "root";
const masterpasswort = "52dc4d7e48590d5a475e1a85b386f08d";
async function testbereich() {
  if (document.getElementById("usernameinput").value == "") {
    JSAlert.alert("Geben Sie Ihren Benutzernamen ein");
  }
  else {
    if (document.getElementById("usernameinput").value == masteruser) {
      if (await md5(document.getElementById("passwordinput").value) == masterpasswort) {
        JSAlert.alert("Willkommen, root");
        document.location.href = "./test.html";
      }
      else {
        JSAlert.alert("Falsches Passwort");
      }
    }
    else {
      JSAlert.alert("Sie sind nicht berechtigt");
    }
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
  if (!isUserLoggedIn) {
    if (confirm("Sie sind nicht angemeldet. Ihre Spielstände werden lediglich mit einer 4-stelligen PIN geschützt. Möchten Sie fortfahren?") == true) {
      await dat("UPDATE spielernamen SET Spieler2 = '"+document.getElementById("Spieler2NameFeldHM").value+"';");
      let PIN = await Random(10000);
      if (!confirm("Ihr Name: "+document.getElementById("Spieler1NameFeldHM").value+"\nSind diese Einstellungen korrekt?")) {
        delete PIN;
        console.warn("Rejected");
        return UnoStartHM();
      }
      console.log("1");
      let TEMPSpielerDaten = '{ "Daten" : [{ "Karten":"" , "Farben":"" , "Name":"'+document.getElementById("Spieler1NameFeldHM").value+'", "ID":"'+await md5(PIN.toString())+'" } ]}';
      console.log(PIN);
      console.log(TEMPSpielerDaten);
      await JSAlert.alert("Ihre PIN lautet: "+PIN+"\nBitte schreiben sie sich auf, sie brauchen sie, um sich einzuloggen", null, JSAlert.Icons.Warning).then(async function(){

        if (await fs.existsSync(__dirname+"/usr/guest/"+document.getElementById("Spieler1NameFeldHM").value+"/Uno.dat")) {
          if (confirm("Dieser Nutzer hat schon einen aktiven Spielerstand! Möchten Sie sich anmelden?")) {
            JSAlert.prompt("Geben Sie Ihre PIN ein").then(function(result) {
              if (!result)
                  return;
              let request = fs.readFileSync(__dirname+"/usr/guest/"+document.getElementById("Spieler1NameFeldHM").value+"/Uno.dat", {encoding: 'utf-8'}, async function(err)
              {
                if (err) throw err;
                if (request.Daten[0].PIN == result)
                {
                  alert("Sie wurden erfolgreich angemeldet!", null, JSAlert.Icons.Success);
                }
              }
              );
            });
          }
        }
        else {
          await new Promise(resolve, async function() {
            await cmd.run("mkdir .\\usr\\guest\\"+document.getElementById("Spieler1NameFeldHM").value);
            await cmd.run("echo hi > .\\usr\\guest\\"+document.getElementById("Spieler1NameFeldHM").value)
          }).then(fs.writeFileSync(__dirname+'/usr/guest/'+document.getElementById("Spieler1NameFeldHM").value+'/Uno.dat', TEMPSpielerDaten, (err) => {
          if (err) throw err;
          }));


        }
      });

    }
    else {
      return;
    }
  }
  await dat("UPDATE spielernamen SET Spieler1 = '"+document.getElementById("Spieler1NameFeldHM").value+"';");
  location.href = "./Uno.html";
}

async function CPUTable()
{
  if (isUserLoggedIn) {
    document.getElementById("TableUsername").innerHTML = preuser[0].username + " (eingeloggt)";
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

var useJSON = false;
async function Übernehmen()
{
  if(useJSON)
  {
    await Savealt(true);
    Loadalt();
  }
  else
  {
    await Save(true);
    Load();
  }
}

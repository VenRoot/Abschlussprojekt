async function UnoInit() {
  if (CONLOG == true) {
    console.log("UnoInit();");
  }
/*
Kartenverteilung:

108 Möglichkeiten
1-8 = Spezial
9-12 = Super Spezial
14-22 = Spezial
23-108 = Normal

108 Gesamte Möglichkeiten
88 Normale
16 Speziale
4 Super Speziale

81,481% Normale Karte
14,814% Speziale Karte
3,703% Super Speziale Karte

= 99,998% gesamt?!


*/


  let Spieler1Karten; //Alle Karten von Spieler1
  let Spieler2Karten; //Alle Karten von Spieler2
  let Spieler1KartenFarbe; //Alle KartenFarben von Spieler1
  let Spieler2KartenFarbe; //Alles KartenFarben von Spieler2
  let x, y, i=0;
  let ErsteKarte, ErsteKarteFarbe;
  let NeueKarte, NeueKarteFarbe;
  let welcherSpieler = 1;
  let PlusZweiRot
  let LoadingBarState = true;
  //let Multiplayer = false;
  let Server = [];
}

async function leave() {
  if (Multiplayer) {
    await dat("UPDATE server"+belegt2+" SET SP1left = TRUE");
  }
  document.location.href = "./index.html";
}
var belegt2 = "";
let Multiplayer = false;
let isInGame = false;
let server1 = -1;
var Zug = 0;

async function Abfrage()
{
  let gu;
  if (con.config.host == "prow.li") {
    gu = "Möchtest du im Online-Multiplayer spielen?";
  }
  else {
    gu = "Möchtest du im lokalen Multiplayer spielen?";
  }
  if (!confirm(gu)) { //If local multiplayer is confimed
    return;
  }
    Multiplayer = true;
    myEmitter.setMaxListeners(100);
    console.log(myEmitter);

    var SpielerNamen = await dat("SELECT * FROM spielernamen;");
    console.log("Spielernamen: ");
    console.log(SpielerNamen);

    //Spieler1Name = SpielerNamen[0]
    server1 = await dat("SELECT * FROM INUSE;");
    //Erzeuge Tabelle, falls sie noch nicht existiert!
    await dat("CREATE TABLE IF NOT EXISTS INUSE (server1 boolean NOT NULL, server2 boolean NOT NULL, server3 boolean NOT NULL, server4 boolean NOT NULL, server5 boolean NOT NULL);");
    //await dat_alt();
    console.warn("TABLE INITIALISIERT");
    //server1 = await dat("SELECT * FROM INUSE;");
    console.log("Verbinde mit Datenbank...");
    await Sleep(1000);
    console.log("Verbunden");
    console.log(typeof server1);
    console.log(server1[0]);
    let errcount = 0;
    while (server1 === undefined && errcount < 6) {
      errcount++;
      await Sleep(100);
      if (errcount == 5) {
        alert("Datenbank konnte nicht geladen werden. Bitte versichere, dass die Datenbank existiert");
        JSAlert.confirm("Möchtest du zum Hauptmenü zurückkehren?").then(function(result){
          if (!result)
          return;

          document.location.href = "./index.html";
        });
      }
      console.log(errcount);
      console.log("Erneut");
      // server1 = await dat("SELECT * FROM INUSE;");
      // console.log(server1);
      // await Sleep(10);
    }
    console.log(server1);
    console.log(myEmitter);
    if (server1[0].Server1 == 0) {
      await dat("UPDATE INUSE SET server1 = TRUE;"); //Server 1 belegen || Use Server 1
      await dat("UPDATE server1 SET FULL = FALSE, EMPTY = FALSE, SP1left = FALSE, SP2left = FALSE;");
       belegt = 1;
       belegt2 = belegt;
       //return belegt;
    }
    else if (server1[0].Server2 == 0) {
      await dat("UPDATE INUSE SET server2 = TRUE;"); //Server 2 belegen
      await dat("UPDATE server2 SET FULL = FALSE, EMPTY = FALSE, SP1left = FALSE, SP2left = FALSE;");
      const belegt = 2;
      belegt2 = belegt;
      //return belegt;
    }
    else if (server1[0].Server3 == 0) {
      await dat("UPDATE INUSE SET server3 = TRUE;"); //Server 3 belegen
      await dat("UPDATE server3 SET FULL = FALSE, EMPTY = FALSE, SP1left = FALSE, SP2left = FALSE;");
      const belegt = 3;
      belegt2 = belegt;
      //return belegt;
    }
    else if (server1[0].Server4 == 0) {
      await dat("UPDATE INUSE SET server4 = TRUE;"); //Server 4 belegen
      await dat("UPDATE server4 SET FULL = FALSE, EMPTY = FALSE, SP1left = FALSE, SP2left = FALSE;");
      const belegt = 4;
      belegt2 = belegt;
      //return belegt;
    }
    else if (server1[0].Server5 == 0) {
      await dat("UPDATE INUSE SET server5 = TRUE;"); //Server 5 belegen
      await dat("UPDATE server5 SET FULL = FALSE, EMPTY = FALSE, SP1left = FALSE, SP2left = FALSE;");
      const belegt = 5;
      belegt2 = belegt;
      //return belegt;
    }
    else {
      alert("Zurzeit sind alle Server belegt... bitte versuche es später noch einmal!"); //Alle Server belegt
      location.reload();
    }
    JSAlert.alert("Es wurde Server "+belegt2+" ausgewählt!");
    Spieler1Name = await dat("SELECT * FROM spielernamen;");
    Spieler1Name = Spieler1Name[0].Spieler1;
    await dat("UPDATE server"+belegt2+" SET Spieler1IP = '"+IPAdresse+"', Spieler1Name = '"+Spieler1Name+"';");
    await WarteAufSP2();
}


async function WarteAufSP2() {
  return new Promise( async (resolve, reject) =>
{
  JSAlert.alert("Warte auf Spieler2...");
  console.log("oof");
  document.getElementById("startUno").setAttribute("disabled", "");
  await dat("UPDATE server"+belegt2+" SET SP1Bereit = TRUE;");
    let SP2Bereit = await dat("SELECT * FROM server"+belegt2+";");
    let tmpSP;
    SP2Bereit = SP2Bereit[0].SP2Bereit;
    while (!SP2Bereit) {
      await Sleep(1000);
      tmpSP = await dat("SELECT * FROM server"+belegt2+";");
      SP2Bereit = tmpSP[0].SP2Bereit;
    }
    console.log("FERTIG");
    document.getElementById("startUno").removeAttribute("disabled");
    resolve();
});

}
let HM = document.getElementById("HM");

async function change()
{
  while(true)
  {
    HM.setAttribute("class", "btn btn-warning");
    await Sleep(1000);
    HM.setAttribute("class", "btn btn-success");
    await Sleep(1000);
    HM.setAttribute("class", "btn btn-danger");
    await Sleep(1000);
  }
}


//let CONLOG = false;
let Spieler1Name = "Spieler 1", Spieler2Name = "Spieler 2";

$("#LOG").hide();
$("#FARBWUNSCH_WAHLPLUS4").hide();

let log = document.getElementById("LOG");

let Spielernamen;

async function NameVonSQL()
{
  await dat("CREATE TABLE IF NOT EXISTS spielernamen (Spieler1 VARCHAR(255), Spieler2 VARCHAR(255));");
  Spielernamen = await dat("SELECT * FROM server"+belegt2+";");
  Spieler1Name = Spielernamen[0].Spieler1Name;
  Spieler2Name = Spielernamen[0].Spieler2Name;
  Spielernamen = [Spieler1Name, Spieler2Name];
  //await Sleep(1000);
  console.log(Spielernamen);
  if (Spielernamen.length == 0 || Spielernamen == undefined) {
    console.warn("Spielernamen ist leer. Daten werden zurückgesetzt");
    await dat("UPDATE spielernamen VALUES('Spieler1', 'Spieler2');");
    if (!isInGame) {
      NameVonSQL();
    }

    return 0;
  }
  else {
    //await Sleep(100);
    Spieler1Name = Spielernamen[0].Spieler1Name;
    Spieler2Name = Spielernamen[0].Spieler2Name;
      if (Spieler1Name == "") {
        Spieler1Name = "Spieler 1";
        console.warn("Spieler1 zurückgesetzt");
      }
      if (Spieler2Name == "") {
        Spieler2Name = "Spieler 2"; //Falls Name nicht eingegeben wurde
        console.warn("Spieler2 zurückgesetzt");
      }
  }
}

async function UnoStart() {
  console.warn("UnoInit();");
  await UnoInit();
  console.warn("UnoInit();");
  if (Multiplayer) {
    await dat("UPDATE server"+belegt2+" SET Zug = 1");
    await NameVonSQL();
    document.getElementById("Spieler1NameFeld").innerHTML+= Spielernamen[0];
    document.getElementById("Spieler2NameFeld").innerHTML+= Spielernamen[1];
  }
  console.warn("getKarten();");
  await getKarten();
  console.warn("OwO();");
  await OwO();
  console.warn("ETZ();");
  await ETZ();
  console.warn("FirstCardF();");
  await FirstCardF();

  if (Multiplayer) {
    console.warn("Upload();");
    await Upload();
  }
  $("#UNOSCREEN").show();
  isInGame = true;
  if (Multiplayer) {
    await dat("UPDATE server"+belegt2+" SET gestartet = TRUE;");
  }
  $("#startUno").hide();
  document.getElementById("RundeBeenden").setAttribute("disabled", "");
  DownloadLoop(500);
  return;
}

function LOG()
{
  $("#LOG").toggle();
  if (CONLOG == false) {
    CONLOG = true;
  }
  else {
    CONLOG = false;
  }
}

async function Upload()
{
  return new Promise(async (resolve, reject) =>
{
  Zug = 2;
  await dat("UPDATE server"+belegt2+" SET Spieler1Karten='"+Spieler1Karten.toString()+"', Spieler1KartenFarbe='"+Spieler1KartenFarbe.toString()+"', Spieler2Karten='"+Spieler2Karten.toString()+"', Spieler2KartenFarbe='"+Spieler2KartenFarbe.toString()+"', Zug = '"+Zug+"';");
  resolve();
});
}
async function WaitForPlayerTwo()
{
  JSAlert.alert("Warte auf "+Spielernamen[1]).dismissIn(1000 * 5);
  return new Promise(async (resolve, reject) =>
{
  let oop = await dat("SELECT * FROM server"+belegt2+";");
  let Zeit1 = 0;
  while (oop[0].Zug == 2) {
    console.log("Nicht am Zug");
    Verbieten();
    Zeit1++;
    await Sleep(900);
    oop = await dat("SELECT * FROM server"+belegt2+";");
    document.getElementById("WartenDIV").innerHTML = "Warte auf "+Spielernamen[1]+"... "+Zeit1+" Sekunden...";
  }
  Erlauben();
  resolve();
})
}

async function Verbieten()
{
  document.getElementById("Ziehen").setAttribute("disabled", "");
  document.getElementById("KarteLegen").setAttribute("disabled", "");
  document.getElementById("WartenDIV").innerHTML = Spielernamen[1]+" ist dran";
}

async function Erlauben()
{
  document.getElementById("Ziehen").removeAttribute("disabled");
  document.getElementById("KarteLegen").removeAttribute("disabled");
  document.getElementById("WartenDIV").innerHTML = "Du bist dran";
}

// async function Name()
// {
//   if (CONLOG == true) {
//     console.log("Name();");
//   }
//   document.body.innerHTML += '<div id="Namenn" >Gebt eure Namen ein! <br> <input type="text" id="Spieler1Name_" placeholder="Spieler 1"> <br> <input type="text" id="Spieler2Name_" placeholder="Spieler 2"> <button class="btn btn-success" onclick="setName();">Bestätigen</button></div>';
//   await Sleep(100000000000);
// }

// async function setName()
// {
//   if (CONLOG == true) {
//     console.log("setName();");
//   }
//   Spieler1Name = document.getElementById("Spieler1Name_").value;
//   Spieler2Name = document.getElementById("Spieler2Name_").value;
//   if (Spieler1Name == Spieler2Name)
//   {
//     JSAlert.alert("Bitte nicht die selben Namen verwenden");
//   }
//     else {
//       $("#Namenn").hide();
//       await OpenUno();
//       await Sleep(1000);
//       while (Spieler1Name == "Spieler 1") {}
//       while (Spieler2Name == "Spieler 2") {}
//       document.getElementById("SPIELSCREEN").innerHTML = '<button type="button" class="btn btn-warning btn-block" name="button">Karten von '+Spieler2Name+'</button>';
//       document.getElementById("Trennwand").innerHTML = '<button type="button" class="btn btn-warning btn-block" name="button">Karten von '+Spieler1Name+'</button>';
//   }
//
// }

async function OpenUno()
{
  if (CONLOG == true) {
    console.log("OpenUno();");
  }
  //await Name();
  JSAlert.alert("Bitte warten Sie, das Laden könnte etwas Zeit in Anspruch nehmen", null, JSAlert.Icons.Warning);
  await UnoStart();
  await graphic();
}

function hello(Message)
{
  JSAlert.alert(Message);
}

let x = [100];
let SC1 = document.getElementById("UNOSPIELER1SCREEN");
let SC2 = document.getElementById("UNOSPIELER2SCREEN");

async function graphic()
{
  if (CONLOG == true) {
    console.log("graphic();");
  }
   document.getElementById("UNOSPIELER1SCREEN").innerHTML = "";
   document.getElementById("UNOSPIELER2SCREEN").innerHTML = "";
   if (Multiplayer)
   {
     for (var i = 0; i <= Spieler1Karten.length; i++) {
       switch (Spieler1Karten[i]) {


         case "0": switch (Spieler1KartenFarbe[i]) {
           case "ROT": SC1.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/0R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/0B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/0GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/0GE.png'>";  break;
         } break;

         case "1": switch (Spieler1KartenFarbe[i]) {
           case "ROT": SC1.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/1R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/1B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/1GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");;'id='SP1Karte"+i+"'  src='./img/Uno/Karten/1GE.png'>"; break;
         } break;

         case "2": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/2R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/2B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/2GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/2GE.png'>"; break;
         } break;

         case "3": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/3R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/3B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/3GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/3GE.png'>";  break;
         } break;

         case "4": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/4R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/4B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/4GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/4GE.png'>"; break;
         } break;

         case "5": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/5R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/5B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/5GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/5GE.png'>";  break;
         } break;

         case "6": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/6R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/6B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/6GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/6GE.png'>";  break;
         } break;

         case "7": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/7R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/7B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/7GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/7GE.png'>";  break;
         } break;

         case "8": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/8R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/8B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/8GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/8GE.png'>";  break;
         } break;

         case "9": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/9R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/9B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/9GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/9GE.png'>";  break;
         } break;

         case "NOKARTE": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/NOR.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/NOB.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/NOGR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/NOGE.png'>";  break;
         } break;

         case "RICHTUNGSWECHSEL": switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/WR.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/WB.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/WGR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/WGE.png'>";  break;
         } break;

         case '+2': switch (Spieler1KartenFarbe[i]) {
           case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/+2R.png'>";  break;
           case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/+2B.png'>";  break;
           case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/+2GR.png'>";  break;
           case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/+2GE.png'>";  break;
         } break;

         case '+4': SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/+4.png'>"; break;
         case 'FARBWUNSCH': SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/WUNSCH.png'>"; break;
       }
     }
     for (var i = 0; i < Spieler2Karten.length; i++) {
       SC2.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
     }
   }
   else
   {
     if (welcherSpieler == 1) {

       for (var i = 0; i <= Spieler1Karten.length; i++) {
         switch (Spieler1Karten[i]) {


           case "0": switch (Spieler1KartenFarbe[i]) {
             case "ROT": SC1.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/0R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/0B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/0GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/0GE.png'>";  break;
           } break;

           case "1": switch (Spieler1KartenFarbe[i]) {
             case "ROT": SC1.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/1R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/1B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/1GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");;'id='SP1Karte"+i+"'  src='./img/Uno/Karten/1GE.png'>"; break;
           } break;

           case "2": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/2R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/2B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/2GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/2GE.png'>"; break;
           } break;

           case "3": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/3R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/3B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/3GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/3GE.png'>";  break;
           } break;

           case "4": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/4R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/4B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/4GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/4GE.png'>"; break;
           } break;

           case "5": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/5R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/5B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/5GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/5GE.png'>";  break;
           } break;

           case "6": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/6R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/6B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/6GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/6GE.png'>";  break;
           } break;

           case "7": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/7R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/7B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/7GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/7GE.png'>";  break;
           } break;

           case "8": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/8R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/8B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/8GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/8GE.png'>";  break;
           } break;

           case "9": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/9R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/9B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/9GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/9GE.png'>";  break;
           } break;

           case "NOKARTE": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/NOR.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/NOB.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/NOGR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/NOGE.png'>";  break;
           } break;

           case "RICHTUNGSWECHSEL": switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/WR.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/WB.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/WGR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/WGE.png'>";  break;
           } break;

           case '+2': switch (Spieler1KartenFarbe[i]) {
             case "ROT":  SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"'  src='./img/Uno/Karten/+2R.png'>";  break;
             case "BLAU": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/+2B.png'>";  break;
             case "GRÜN": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/+2GR.png'>";  break;
             case "GELB": SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/+2GE.png'>";  break;
           } break;

           case '+4': SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/+4.png'>"; break;
           case 'FARBWUNSCH': SC1.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP1Karte"+i+"' src='./img/Uno/Karten/WUNSCH.png'>"; break;
         }
       }



       for (var i = 0; i < Spieler2Karten.length; i++) {
         SC2.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
       }

     }
     else if(welcherSpieler == 2)
     {
       SC1.innerHTML = "";
       SC2.innerHTML = "";
       for (var i = 0; i <= Spieler1Karten.length; i++) {
         SC1.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
       }

       for (var i = 0; i < Spieler2Karten.length; i++) {
         switch (Spieler2Karten[i]) {


           case "0": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/0R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"'  src='./img/Uno/Karten/0B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/0GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/0GE.png'>";  break;
           } break;

           case "1": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"'src='./img/Uno/Karten/1R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/1B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/1GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/1GE.png'>";  break;
           } break;

           case "2": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"'src='./img/Uno/Karten/2R.png'>"; break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/2B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/2GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/2GE.png'>";  break;
           } break;

           case "3": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"'src='./img/Uno/Karten/3R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/3B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/3GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/3GE.png'>";  break;
           } break;

           case "4": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/4R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/4B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/4GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/4GE.png'>";  break;
           } break;

           case "5": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/5R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/5B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/5GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/5GE.png'>";  break;
           } break;

           case "6": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/6R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/6B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/6GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/6GE.png'>";  break;
           } break;

           case "7": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/7R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/7B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/7GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/7GE.png'>";  break;
           } break;

           case "8": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/8R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/8B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/8GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/8GE.png'>";  break;
           } break;

           case "9": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/9R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/9B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/9GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/9GE.png'>";  break;
           } break;

           case "NOKARTE": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/NOR.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/NOB.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/NOGR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/NOGE.png'>";  break;
           } break;

           case "RICHTUNGSWECHSEL": switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WR.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WB.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WGR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WGE.png'>";  break;
           } break;

           case '+2': switch (Spieler2KartenFarbe[i]) {
             case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+2R.png'>";  break;
             case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+2B.png'>";  break;
             case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+2GR.png'>";  break;
             case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+2GE.png'>";  break;
           } break;

           case '+4': SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+4.png'>"; break;
           case 'FARBWUNSCH': SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WUNSCH.png'>"; break;
         }
     }
   }
   }
return 0;
}

let Tutorial = true;

 let KarteLegen2;

/*async function KarteLegen()
{
  if (Tutorial) {
    alert("Wähle nun die Karte aus, die du legen möchtest!");
  }
  KarteLegen2 = true;
}
*/

async function LegenLegen()
{
  if (CONLOG == true) {
    console.log("LegenLegen();");
  }


  let Kartee = await document.getElementById("Kartennummer").value;
  console.log(Kartee);
  await Check(Kartee);
}

$("#FARBWUNSCH_WAHL").hide();

async function Legen(Karte)
{
  if (CONLOG == true) {
    console.log("Legen(Karte);");
  }

  if (Multiplayer) {
    UnoKartenStapel = Spieler1Karten[Karte];
    UnoKartenStapelFarbe = Spieler1KartenFarbe[Karte];
    if(UnoKartenStapel == "FARBWUNSCH")
    {
      $("#FARBWUNSCH_WAHL").show();
      document.getElementById("RundeBeenden").setAttribute("disabled", "");
    }
    if(UnoKartenStapel == "0")
    {
      await Spieler1KartenFarbe.splice(Karte,1);
      await Spieler1Karten.splice(Karte,1);
      await Tausch();
    }
    else if (UnoKartenStapel == "+2") {
      for (var i = 0; i < 2; i++) {
        Spieler2Karten.push(await Random(14));
        Spieler2KartenFarbe.push(await RandomFarbe(3));
      }
      await convert();
      await invalid();
    }
    else if (UnoKartenStapel == "+4") {
      for (var i = 0; i < 4; i++) {
        Spieler2Karten.push(await Random(14));
        Spieler2KartenFarbe.push(await RandomFarbe(3));
      }
      await convert();
      await invalid();

      $("#FARBWUNSCH_WAHLPLUS4").show();
      document.getElementById("RundeBeenden").setAttribute("disabled", "");
    }
    await Spieler1KartenFarbe.splice(Karte,1);
    await Spieler1Karten.splice(Karte,1);
    await dat("UPDATE server"+belegt2+" SET Spieler1Karten = '"+Spieler1Karten.toString()+"', Spieler1KartenFarbe = '"+Spieler1KartenFarbe.toString()+"', Spieler2Karten = '"+Spieler2Karten.toString()+"', Spieler2KartenFarbe = '"+Spieler2KartenFarbe.toString()+"';");
  }
  else {
    if (welcherSpieler == 1) {
      UnoKartenStapel = Spieler1Karten[Karte];
      UnoKartenStapelFarbe = Spieler1KartenFarbe[Karte];
      if(UnoKartenStapel == "FARBWUNSCH")
      {
        $("#FARBWUNSCH_WAHL").show();
        document.getElementById("RundeBeenden").setAttribute("disabled", "");
      }
      if(UnoKartenStapel == "0")
      {
        await Spieler1KartenFarbe.splice(Karte,1);
        await Spieler1Karten.splice(Karte,1);
        await Tausch();
      }
      else if (UnoKartenStapel == "+2") {
        for (var i = 0; i < 2; i++) {
          Spieler2Karten.push(await Random(14));
          Spieler2KartenFarbe.push(await RandomFarbe(3));
        }
        await convert();
        await invalid();
      }
      else if (UnoKartenStapel == "+4") {
        for (var i = 0; i < 4; i++) {
          Spieler2Karten.push(await Random(14));
          Spieler2KartenFarbe.push(await RandomFarbe(3));
        }
        await convert();
        await invalid();

        $("#FARBWUNSCH_WAHLPLUS4").show();
        document.getElementById("RundeBeenden").setAttribute("disabled", "");
      }
      await Spieler1KartenFarbe.splice(Karte,1);
      await Spieler1Karten.splice(Karte,1);
    }
    else if(welcherSpieler == 2){
      UnoKartenStapel = Spieler2Karten[Karte];
      UnoKartenStapelFarbe = Spieler2KartenFarbe[Karte];
      if(UnoKartenStapel == "FARBWUNSCH")
      {
        $("#FARBWUNSCH_WAHL").show();
        document.getElementById("RundeBeenden").setAttribute("disabled", "");
      }

      if(UnoKartenStapel == "0")
      {
        await Spieler2KartenFarbe.splice(Karte,1);
        await Spieler2Karten.splice(Karte,1);
        Tausch();
      }
      else if (UnoKartenStapel == "+2") {
        for (var i = 0; i < 2; i++) {
          Spieler1Karten.push(await Random(14));
          Spieler1KartenFarbe.push(await RandomFarbe(3));
        }
        await convert();
        await invalid();
      }

      else if (UnoKartenStapel == "+4") {
        for (var i = 0; i < 4; i++) {
          Spieler1Karten.push(await Random(14));
          Spieler1KartenFarbe.push(await RandomFarbe(3));
        }
        await convert();
        await invalid();


        $("#FARBWUNSCH_WAHLPLUS4").show();
        document.getElementById("RundeBeenden").setAttribute("disabled", "");
      }
      await Spieler2KartenFarbe.splice(Karte,1);
      await Spieler2Karten.splice(Karte,1);
    }
  } //ELSE ZUENEDE


    await StapelUpdate();
    await graphic();
    if (UnoKartenStapel == "NOKARTE" || UnoKartenStapel == "RICHTUNGSWECHSEL") {
      weiters();
    }
    if (UnoKartenStapel != "FARBWUNSCH" && UnoKartenStapel != "NOKARTE" && UnoKartenStapel != "RICHTUNGSWECHSEL" && UnoKartenStapel != "+4") {
      weiter();
    }
}

async function Check(Karte)
{
  if (CONLOG == true) {
    console.log("Check(Karte);");
  }


  if (welcherSpieler == 1) {
    await console.log(Spieler1Karten[Karte]);
    await console.log(Spieler1KartenFarbe[Karte]);

    let checkKarte = Spieler1Karten[Karte];
    let checkFarbe = Spieler1KartenFarbe[Karte];

    if (UnoKartenStapel == checkKarte || UnoKartenStapelFarbe == checkFarbe || checkFarbe == "0") {
      Legen(document.getElementById("Kartennummer").value);
    }
    else {
      console.error("Konnte die Karte nicht legen!");
    }
  }
  else {
    await console.log(Spieler2Karten[Karte]);
    await console.log(Spieler2KartenFarbe[Karte]);

    let checkKarte = Spieler2Karten[Karte];
    let checkFarbe = Spieler2KartenFarbe[Karte];

    if (UnoKartenStapel == checkKarte || UnoKartenStapelFarbe == checkFarbe || checkFarbe == "0") {
      Legen(document.getElementById("Kartennummer").value);
    }
    else {
      console.error("Konnte die Karte nicht legen!");
    }
  }
}

let UnoLog = document.getElementById("UnoLog");

async function Tausch()
{
  if (CONLOG == true) {
    console.log("Tausch();");
  }
  alert("Spieler 1 und Spieler 2 tauschen Karten!!!");
  console.warn("Kartentausch!");

  let tmp;
  let tmp2;
  tmp = Spieler1Karten;
  Spieler1Karten = Spieler2Karten;
  Spieler2Karten = tmp;

  tmp2 = Spieler1KartenFarbe;
  Spieler1KartenFarbe = Spieler2KartenFarbe;
  Spieler2KartenFarbe = tmp2;

  await Sleep(100);
  graphic();
}

let owo;
async function KartenKarten()
{
  if (CONLOG == true) {
    console.log("KartenKarten();");
  }
  owo = await Random(108);
  //await console.log(owo);
  await Sleep(10);
  if (owo<9) //Spezialkarte
  {
    console.log("Spezialkarte");
    switch (owo) {
      case 1: case 2: console.log("+2 Rot"); PlusZweiRot--; break;//+2 Rot
      case 3: case 4: console.log("+2 Blau"); PlusZweiBlau--; break;// +2 Blau
      case 5: case 6: console.log("+2 Grün"); PlusZweiGrün--; break;// +2 Grün
      case 7: case 8: console.log("+2 GELB"); PlusZweiGelb--; break;// +2 Gelb
    }
  }
  else if(owo>9&&owo<13)
  {
    console.log("Starke Spezialkarte");
    switch (owo) {
      case 9: case 10:console.log("Wunsch"); Wunschkartenanzahl--; break;//Wunsch
      case 11: case 12: console.log("+4"); PlusVierAnzahl--; break;     //Plus4
    }
  }
  else if(owo>13&&owo<22)
  {
    switch (owo) {
      case 14: case 15: console.log("+2 Rot"); RetourRot--; break;  // Retour Rot
      case 16: case 17: console.log("+2 Blau"); RetourBlau--; break;// Retour Blau
      case 18: case 19: console.log("+2 Grün"); RetourGrün--; break;// Retour Grün
      case 20: case 21: console.log("+2 Gelb"); RetourGelb--; break;// Retour Gelb
    }
  }
  else { //Normale Karte
    console.log("Normal");
  }
}
let llog = document.getElementById("LOG");
function weiterlog(ppp)
{
  llog.innerHTML += "<br>";
  llog.innerHTML += ppp;

}

let pos, TransID = 0;

function doubleclick()
{
  LegenLegen();
}

async function CLICKLEGEN(Karteö)
{

  delete document.getElementById("Trans"+TransID-1);

  if (CONLOG) {
    console.log("KARTELEGEN("+Karteö+");");
  }
  console.log(Karteö);
  if (welcherSpieler == 1) {
    console.log($("#SP1Karte"+Karteö).position().top);
    console.log($("#SP1Karte"+Karteö).position().left);
    console.log($("#SP1Karte"+Karteö).position());
    await TransID++;
    document.getElementById("hi").innerHTML = "<img ondblclick='doubleclick();' class='tra' style='position: absolute; z-index=auto; ' id='Trans"+TransID+"' src='./img/Uno/Karten/Trans.png'>";
    pos = await $("#SP1Karte"+Karteö).position();
    await Sleep(10);
    console.log("Position: "+$("#SP1Karte"+Karteö).position().top);
    let top = await $("#SP1Karte"+Karteö).position().top;
    let left = await $("#SP1Karte"+Karteö).position().left;
    $("#Trans"+TransID).css({left: left, top: top});
    document.getElementById("Kartennummer").value = Karteö;
  }
  else if (welcherSpieler == 2) {
    console.log($("#SP2Karte"+Karteö).position().top);
    console.log($("#SP2Karte"+Karteö).position().left);
    console.log($("#SP2Karte"+Karteö).position());
    await TransID++;
    document.getElementById("hi").innerHTML = "<img class='tra' ondblclick='doubleclick();' style='position: absolute; z-index=auto; ' id='Trans"+TransID+"' src='./img/Uno/Karten/Trans.png'>";
    pos = await $("#SP2Karte"+Karteö).position();
    await Sleep(10);
    console.log("Position: "+$("#SP2Karte"+Karteö).position().top);
    let top = await $("#SP2Karte"+Karteö).position().top;
    let left = await $("#SP2Karte"+Karteö).position().left;
    $("#Trans"+TransID).css({left: left, top: top});
    document.getElementById("Kartennummer").value = Karteö;
  }

}

let Stapel = document.getElementById("KartenStapel");

let TP = document.getElementById("Tipps");

let uwu=0;

async function Tipp()
{
  if (CONLOG == true) {
    console.log("Tipp();");
    weiterlog('console.log("Tipp();");');
  }
  uwu++;
  switch (uwu) {
    case 1: TP.innerHTML = "Du kannst oben auf den roten Button klicken, um den Spielverlauf anzuzeigen"; break;
    case 2: TP.innerHTML = "Die Anleitung kannst du dir im Hauptmenü von Uno ansehen!"; break;
    case 3: TP.innerHTML = "Selber denken macht schlau!"; break;
    case 4: TP.innerHTML = "Der Log ist eine gute Methode, um den Spielverlauf zu prüfen"; break;
    case 5: TP.innerHTML = "Um eine Karte zu legen, gebe die Kartennummer in das Feld ein und klicke auf Karte legen.<br> Beachte, dass die 1. Karte von links Karte 0 ist, die 2. von Links Karte 1 usw."; break;
    case 6: TP.innerHTML = "Du kannst die Karten des Gegenspielers nicht sehen, dennoch kannst du sehen, wie viele es sind"; break;
    case 7: uwu=1; TP.innerHTML = "Du kannst oben auf den roten Button klicken, um den Spielverlauf anzuzeigen"; break;
  }
}


function löschen(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function LogLog(text)
{
  if (CONLOG == true) {
    console.log("LogLog();");
    weiterlog('console.log("LogLog();");');
  }
  log.innerHTML += UnoLog.innerHTML + "<br>";
  UnoLog.innerHTML = text;
}

async function DownloadLoop(looptime)
{
  while (true) {
    await Sleep(looptime);
    await Download();
    graphic();
  }
}

async function weiter()
{
  //löschen("TransID"-1);
  document.querySelectorAll('.tra').forEach(function(a){
a.remove()
})
  if (Multiplayer) {
    let zuu = await dat("SELECT * FROM server"+belegt2+";");
    Spieler1Karten = await zuu[0].Spieler1Karten.split(",");
    Spieler1KartenFarbe = await zuu[0].Spieler1KartenFarbe.split(",");
    Spieler2Karten = await zuu[0].Spieler2Karten.split(",");
    Spieler2KartenFarbe = await zuu[0].Spieler2KartenFarbe.split(",");
    if (Spieler1Karten.length <= 0) {
      Gewonnen(1);
    }
    else if (Spieler2Karten.length <= 0) {
      Gewonnen(2);
    }
    document.getElementById("Kartennummer").value = "";
    SC1.innerHTML = "";
    SC2.innerHTML = "";
    for (var i = 0; i < Spieler2Karten.length; i++) {
      SC2.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
    }
    await Upload();
    await WaitForPlayerTwo();
    graphic();
    document.getElementById("Ziehen").removeAttribute("disabled", "");
    document.getElementById("KarteLegen").removeAttribute("disabled", "");
    document.getElementById("RundeBeenden").setAttribute("disabled", "");
    $("#FARBWUNSCH_WAHLPLUS4").hide();

  }
  else {
    if (CONLOG == true) {
      console.log("weiter();");
    }
    if (Spieler1Karten.length <= 0) {
      Gewonnen(1);
    }
    else if (Spieler2Karten.length <= 0) {
      Gewonnen(2);
    }

    document.getElementById("Kartennummer").value = "";
    if (welcherSpieler == 1) {
      welcherSpieler = 2;
    }
    else {
      welcherSpieler = 1;
    }
    SC1.innerHTML = "";
    SC2.innerHTML = "";
    for (var i = 0; i < Spieler2Karten.length; i++) {
       SC2.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
    }
    for (var i = 0; i < Spieler1Karten.length; i++) {
       SC1.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
    }
    alert("Gebe an Spieler " + welcherSpieler + " weiter\n\nSpieler " + welcherSpieler + ": bitte bestätige mit OK");
    graphic();

    log.innerHTML += document.getElementById("UnoLog").innerHTML + "<br>";
    document.getElementById("Ziehen").removeAttribute("disabled", "");
    document.getElementById("KarteLegen").removeAttribute("disabled", "");
    document.getElementById("RundeBeenden").setAttribute("disabled", "");
    $("#FARBWUNSCH_WAHLPLUS4").hide();
  }
}

async function weiters()
{
  if (CONLOG == true) {
    console.log("weiters();");
  }

  if (Spieler1Karten.length <= 0) {
    Gewonnen(1);
  }
  else if (Spieler2Karten.length <= 0) {
    Gewonnen(2);
  }
  document.getElementById("Kartennummer").value = "";
  //SC1.innerHTML = "";
  SC2.innerHTML = "";
  if (Multiplayer) {
    for (var i = 0; i < Spieler2Karten.length; i++) {
      SC2.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
    }
    await Upload();
    await WaitForPlayerTwo();
    graphic();

  }
  else {


    for (var i = 0; i < Spieler2Karten.length; i++) {
       SC2.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
    }

    for (var i = 0; i < Spieler1Karten.length; i++) {
       SC1.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
    }
    graphic();
  }
  log.innerHTML += document.getElementById("UnoLog").innerHTML + "<br>";
  document.getElementById("Ziehen").removeAttribute("disabled", "");
  document.getElementById("KarteLegen").removeAttribute("disabled", "");
  document.getElementById("RundeBeenden").setAttribute("disabled", "");

}

async function Download() {
  return new Promise(async (resolve, reject) =>
{
  let ascx = await dat("SELECT * FROM server"+belegt2+";");
  Spieler1Karten = ascx[0].Spieler1Karten.split(",");
  Spieler1KartenFarbe = ascx[0].Spieler1KartenFarbe.split(",");
  Spieler2Karten = ascx[0].Spieler2Karten.split(",");
  Spieler2KartenFarbe = ascx[0].Spieler2KartenFarbe.split(",");
  UnoKartenStapel = JSON.parse(ascx[0].Kartenstapel).Kartenstapel;
  UnoKartenStapelFarbe = JSON.parse(ascx[0].Kartenstapel).KartenstapelFarbe;
  Zug = ascx[0].Zug;
  if (ascx[0].SP2left) {
    alert(Spielernamen[1]+" hat das Spiel verlassen. Du kehrst nun zum Hauptmenü zurück");
    await Freigeben(belegt2);
    location.href = "./index.html";
  }
  resolve();
});
}

// async function Upload()
// {
//   return new Promise(async (resolve, reject) =>
// {
//    let StapelKarte = {"Kartenstapel":FirstCard, "KartenstapelFarbe":FirstCardFarbe};
//   await dat("UPDATE server"+belegt2+" SET Spieler1Karten='"+Spieler1Karten.toString()+"', Spieler1KartenFarbe='"+Spieler1KartenFarbe.toString()+"', Spieler2Karten='"+Spieler2Karten.toString()+"', Spieler2KartenFarbe='"+Spieler2KartenFarbe.toString()+"', Kartenstapel = '"+JSON.stringify(StapelKarte)+"';");
//   resolve();
// });
// }


function getKarten()
{
  if (CONLOG == true) {
    console.log("getKarten();");
  }
  Spieler1Karten = 7;
  Spieler2Karten = 7;

}

async function KarteZiehen()
{
  if (CONLOG == true) {
    console.log("KarteZiehen();");
  }
  if (Multiplayer)
  {
    Spieler1Karten.push(await Random(14));
    Spieler1KartenFarbe.push(await RandomFarbe(3));
    await convert();
    await invalid();

  }
  else
  {
    if (welcherSpieler == 1)
    {
      Spieler1Karten.push(await Random(14));
      Spieler1KartenFarbe.push(await RandomFarbe(3));
      await convert();
      await invalid();
    }
    else
    {
      Spieler2Karten.push(await Random(14));
      Spieler2KartenFarbe.push(await RandomFarbe(3));
      await convert();
      await invalid();
    }
  }

  graphic();
  document.getElementById("Ziehen").setAttribute("disabled", "");
  document.getElementById("KarteLegen").removeAttribute("disabled", "");
  document.getElementById("RundeBeenden").removeAttribute("disabled", "");
}


async function OwO() {
  if (CONLOG == true) {
    console.log("OwO();");
  }
  let f=0;
  i=0;
  welcherSpieler = 1;
  Spieler1Karten = [];
  Spieler2Karten = [];
  Spieler1KartenFarbe = [];
  Spieler2KartenFarbe = [];
  for(f=0; f<7; f++)
  {
    Spieler1Karten[i] = await Random(14); //Wählt Random Karte aus (Insgesamt 14 Karten)
    Spieler1KartenFarbe[i] = await RandomFarbe(3);  //Farbe der Karte (Insgesamt 4 Farben)
    Spieler2Karten[i] = await Random(14);
    Spieler2KartenFarbe[i] = await RandomFarbe(3); //AWAIT, SONST PROMISE
    i++;
    //console.log(f);
  }
  i=0;
  await convert();
  await invalid();
  console.log("Spieler 1: " +Spieler1Karten + " \nFarbe: "+Spieler1KartenFarbe); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  console.log("Spieler 2: " +Spieler2Karten + " \nFarbe: "+Spieler2KartenFarbe); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   //chunk(Spieler1Karten, 2);
   if (Multiplayer) {
     await dat("UPDATE server"+belegt2+" SET Spieler1Karten = '"+Spieler1Karten.toString()+"';");
     await dat("UPDATE server"+belegt2+" SET Spieler1KartenFarbe = '"+Spieler1KartenFarbe.toString()+"';");
     await dat("UPDATE server"+belegt2+" SET Spieler2Karten = '"+Spieler2Karten.toString()+"';");
     await dat("UPDATE server"+belegt2+" SET Spieler2KartenFarbe = '"+Spieler2KartenFarbe.toString()+"';");
   }
  return Spieler1Karten, Spieler2Karten, Spieler1KartenFarbe, Spieler2KartenFarbe;

}

async function convert() {
  if (CONLOG == true) {
    console.log("convert();");
  }
  for (let g = 0; g < 100; g++) {                                             //100 Mal, damit JEDE Karte konvertiert nicht, nicht immer nur die erste
    Spieler1Karten = Spieler1Karten.toString().replace(/10/i, "FARBWUNSCH_"); //Ersetzt Karte 10 mit FARBWUNSCH!!! NOCH NICHT KONVERTIERT! SIEHE: INVALID()
    Spieler1Karten = Spieler1Karten.toString().replace(/11/i, "NOKARTE");
    Spieler1Karten = Spieler1Karten.toString().replace(/12/i, "RICHTUNGSWECHSEL");
    Spieler1Karten = Spieler1Karten.toString().replace(/13/i, "+2");
    Spieler1Karten = Spieler1Karten.toString().replace(/14/i, "+4_");         //NOCH NICHT KONVERTIERT! SIEHE: INVALID()
  }

    await Sleep(10);
    Spieler1Karten = Spieler1Karten.split(",");

for (let f = 0; f < 100; f++) {
  Spieler2Karten = Spieler2Karten.toString().replace(/10/i, "FARBWUNSCH_"); //NOCH NICHT KONVERTIERT! SIEHE: INVALID()
  Spieler2Karten = Spieler2Karten.toString().replace(/11/i, "NOKARTE");
  Spieler2Karten = Spieler2Karten.toString().replace(/12/i, "RICHTUNGSWECHSEL");
  Spieler2Karten = Spieler2Karten.toString().replace(/13/i, "+2");
  Spieler2Karten = Spieler2Karten.toString().replace(/14/i, "+4_"); //NOCH NICHT KONVERTIERT! SIEHE: INVALID()
}

    await Sleep(10);
    Spieler2Karten = Spieler2Karten.split(",");
}


async function invalid()
{
  if (CONLOG == true) {
    console.log("invalid();");
  }
  let ver;
  for (let x = 0; x < Spieler1Karten.length; x++) {
    ver = Spieler1Karten.indexOf("FARBWUNSCH_");
    console.log(ver);
    if(ver == "-1")
    {
      //console.log("Kein Farbwunsch enthalten");
    }
    else {
      //console.log(ver);
      await Spieler1KartenFarbe.splice(ver,1,"0");
      await Spieler1Karten.splice(ver,1,"FARBWUNSCH"); //ERSETZT FARBWUNSCH_ MIT FARBWUNSCH, DAMIT ALLE FARBWÜNSCHE BEARBEITET WERDEN
    }

    ver = Spieler1Karten.indexOf("+4_");
    if (ver == "-1") {
      //console.log("Keine +4 enthalten");
    }
    else {
      //console.log(ver);
      Spieler1KartenFarbe.splice(ver,1,"0");
      Spieler1Karten.splice(ver,1,"+4");
    }
  }
  for (let x = 0; x < Spieler2Karten.length; x++) {
    ver = 0;
    ver = Spieler2Karten.indexOf("FARBWUNSCH_");
    if(ver == "-1")
    {
      //console.log("Kein Farbwunsch enthalten");
    }
    else {
      //console.log(ver);
      await Spieler2KartenFarbe.splice(ver,1,"0");
      await Spieler2Karten.splice(ver,1,"FARBWUNSCH"); //ERSETZT FARBWUNSCH_ MIT FARBWUNSCH, DAMIT ALLE FARBWÜNSCHE BEARBEITET WERDEN
    }

    ver = Spieler2Karten.indexOf("+4_");
    if (ver == "-1") {
      //console.log("Keine +4 enthalten");
    }
    else {
      //console.log(ver);
      await Spieler2KartenFarbe.splice(ver,1,"0");
      await Spieler2Karten.splice(ver,1,"+4");
    }
  }
}

function tst() {
  if (CONLOG == true) {
    console.log("tst();");
  }
  for(let z=0; z < Spieler1Karten.length; z++)
  {
    Spieler1Karten[z] = "FARBWUNSCH";
  }
}

let UnoKartenStapel;
let UnoKartenStapelFarbe;

function ETZ()
{
  if (CONLOG == true) {
    console.log("ETZ();");
  }
  console.log("\n\nKarten von "+Spieler1Name+": ");
  for (i = 0; i<=6; i++) {
    console.log(Spieler1Karten[i] + " " + Spieler1KartenFarbe[i] + "\n" );
  }

  console.log("\n\nKarten von "+Spieler2Name+": ");
  for (i = 0; i<=6; i++) {
    console.log(Spieler2Karten[i] + " " + Spieler2KartenFarbe[i] + "\n" );
  }
}

async function FirstCardF() {
  if (CONLOG == true) {
    console.log("FirstCardF();");
  }
  FirstCard = await Random(14); //Welche Karte (Insgesamt 14 Karten)
  FirstCard = FirstCard.toString();
  if(FirstCard >= 10)
   {
     FirstCardF();
   }
   else
   {
      FirstCardFarbe = await RandomFarbe(3);  //Farbe der Karte (Insgesamt 4 Farben)
      //convertFirstCard();
      console.log("Erste Karte: "+FirstCard +" "+FirstCardFarbe);
      if (Multiplayer) {
        var FirstCardM = {"Kartenstapel":FirstCard, "KartenstapelFarbe":FirstCardFarbe};
        await dat("UPDATE server"+belegt2+" SET Kartenstapel = '"+JSON.stringify(FirstCardM)+"';");
      }
      await Sleep(100);
      UnoKartenStapel = FirstCard;
      UnoKartenStapelFarbe = FirstCardFarbe;
      StapelUpdate();
}

}


async function StapelUpdate()
{
  if (CONLOG == true) {
    console.log("StapelUpdate();");
  }
  if (Multiplayer) {
    let lkm = await dat("SELECT * FROM server"+belegt2+";");
    lkm = await JSON.parse(lkm[0].Kartenstapel);
    UnoKartenStapel = lkm.Kartenstapel;
    UnoKartenStapelFarbe = lkm.KartenstapelFarbe;
  }
  switch (UnoKartenStapel) {
    case "1": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/1R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/1GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/1GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/1B.png'>"; break;
    } break;

    case "2": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/2R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/2GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/2GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/2B.png'>"; break;
    } break;

    case "3": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/3R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/3GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/3GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/3B.png'>"; break;
    } break;

    case "4": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/4R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/4GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/4GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/4B.png'>"; break;
    } break;

    case "5": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/5R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/5GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/5GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/5B.png'>"; break;
    } break;

    case "6": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/6R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/6GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/6GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/6B.png'>"; break;
    } break;

    case "7": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/7R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/7GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/7GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/7B.png'>"; break;
    } break;

    case "8": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/8R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/8GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/8GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/8B.png'>"; break;
    } break;

    case "9": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/9R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/9GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/9GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/9B.png'>"; break;
    } break;

    case "0": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/0R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/0GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/0GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/0B.png'>"; break;
    } break;

    case "RICHTUNGSWECHSEL": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WR.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WGE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WGR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WB.png'>"; break;
    } break;

    case "FARBWUNSCH": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCH.png'>"; break;

    case "+2": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/+2R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/+2GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/+2GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/+2B.png'>"; break;
    } break;

    case "+4": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/+4.png'>"; break;

    case "NOKARTE": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/NOR.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/NOGE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/NOGR.png'>";  break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/NOB.png'>"; break;
    } break;

  }
  return 0;
}


function WunschRot()
{
  if (CONLOG == true) {
    console.log("WunschRot();");
  }
  UnoKartenStapelFarbe = "ROT";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHR.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

function WunschBlau()
{
  if (CONLOG == true) {
    console.log("WunschBlau();");
  }
  UnoKartenStapelFarbe = "BLAU";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHB.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

function WunschGrün()
{
  if (CONLOG == true) {
    console.log("WunschGrün();");
  }
  UnoKartenStapelFarbe = "GRÜN";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHGR.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}


async function WunschGelb()
{
  if (CONLOG == true) {
    console.log("WunschGelb();");
  }
  UnoKartenStapelFarbe = "GELB";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHGE.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

async function WunschRotPlus4()
{
  if (CONLOG == true) {
    console.log("WunschRotPlus4();");
  }
  UnoKartenStapelFarbe = "ROT";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4R.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

async function WunschBlauPlus4()
{
  if (CONLOG == true) {
    console.log("WunschBlauPlus4();");
  }
  UnoKartenStapelFarbe = "BLAU";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4B.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

async function WunschGrünPlus4()
{
  if (CONLOG == true) {
    console.log("WunschGrünPlus4();");
  }
  UnoKartenStapelFarbe = "GRÜN";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4GR.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

$("Spieler1Name").hide();

async function WunschGelbPlus4()
{
  if (CONLOG == true) {
    console.log("WunschGelbPlus4();");
  }
  UnoKartenStapelFarbe = "GELB";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4GE.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

let inputname;
let won;
let Kartenstapel = document.getElementById("UnoStapel");

function K() {
  console.log("Karte 1-9: 1-9\nKarte 10: Farbe\nKarte 11: NOKARTE\nKarte 12: Richtungswechsel\nKarte 13: +2\nKarte 14: +4\nFarbe 1: Rot\nFarbe 2: Blau\nFarbe 3: Gelb\nFarbe 4: Grün");
}

async function Gewonnen(Spieler)
{
  if (CONLOG == true) {
    console.log("Gewonnen();");
  }
  if (Multiplayer) {
    if (Spieler == 1) {
      alert("Herzlichen Glückwunsch, du hast gewonnen!");
      won = Spieler;
      if (confirm("Möchtest du deinen Highscore eintragen lassen?")) {
        inputname = document.getElementById("inputname").value;
        $("#UNOSCREEN").hide();
        $("#Formular").show();

      }
    }
    else {
      alert("Schade, du hast verloren");
    }
  }
  else {
    alert("Herzlichen Glückwunsch Spieler " + Spieler + ". Du hast gewonnen!!!");
    won = Spieler;
    if (confirm("Möchtest du deinen Highscore eintragen lassen?")) {
      inputname = document.getElementById("inputname").value;
      $("#UNOSCREEN").hide();
      $("#Formular").show();

    }
  }
  for (var i = 0; i <= Spieler1Karten.length; i++) {
    switch (Spieler1Karten[i]) {


      case "0": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  onclick='SELECTROT();' src='./img/Uno/Karten/0R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img onclick='SELECTBLAU();' src='./img/Uno/Karten/0B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img onclick='SELECTGRÜN();' src='./img/Uno/Karten/0GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img onclick='SELECTGELB();' src='./img/Uno/Karten/0GE.png'>";  break;
      } break;

      case "1": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  onclick='SELECTROT();' src='./img/Uno/Karten/1R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img onclick='SELECTROT();' src='./img/Uno/Karten/1B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img onclick='SELECTROT();' src='./img/Uno/Karten/1GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img onclick='SELECTROT();' src='./img/Uno/Karten/1GE.png'>"; break;
      } break;

      case "2": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/2R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/2B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/2GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/2GE.png'>"; break;
      } break;

      case "3": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/3R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/3B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/3GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/3GE.png'>";  break;
      } break;

      case "4": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/4R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/4B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/4GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/4GE.png'>"; break;
      } break;

      case "5": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/5R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/5B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/5GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/5GE.png'>";  break;
      } break;

      case "6": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/6R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/6B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/6GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/6GE.png'>";  break;
      } break;

      case "7": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/7R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/7B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/7GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/7GE.png'>";  break;
      } break;

      case "8": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/8R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/8B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/8GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/8GE.png'>";  break;
      } break;

      case "9": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/9R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/9B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/9GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/9GE.png'>";  break;
      } break;

      case "NOKARTE": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/NOR.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/NOB.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/NOGR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/NOGE.png'>";  break;
      } break;

      case "RICHTUNGSWECHSEL": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/WR.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/WB.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/WGR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/WGE.png'>";  break;
      } break;

      case '+2': switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img  src='./img/Uno/Karten/+2R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/+2B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/+2GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/+2GE.png'>";  break;
      } break;

      case '+4': SC1.innerHTML+= "<img src='./img/Uno/Karten/+4.png'>"; break;
      case 'FARBWUNSCH': SC1.innerHTML+= "<img src='./img/Uno/Karten/WUNSCH.png'>"; break;
    }
  }

  for (var i = 0; i < Spieler2Karten.length; i++) {
    switch (Spieler2Karten[i]) {


      case "0": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/0R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/0B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/0GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/0GE.png'>";  break;
      } break;

      case "1": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/1R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/1B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/1GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/1GE.png'>";  break;
      } break;

      case "2": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/2R.png'>"; break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/2B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/2GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/2GE.png'>";  break;
      } break;

      case "3": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/3R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/3B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/3GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/3GE.png'>";  break;
      } break;

      case "4": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/4R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/4B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/4GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/4GE.png'>";  break;
      } break;

      case "5": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/5R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/5B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/5GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/5GE.png'>";  break;
      } break;

      case "6": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/6R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/6B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/6GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/6GE.png'>";  break;
      } break;

      case "7": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/7R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/7B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/7GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/7GE.png'>";  break;
      } break;

      case "8": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/8R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/8B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/8GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/8GE.png'>";  break;
      } break;

      case "9": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/9R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/9B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/9GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/9GE.png'>";  break;
      } break;

      case "NOKARTE": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/NOR.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/NOB.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/NOGR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/NOGE.png'>";  break;
      } break;

      case "RICHTUNGSWECHSEL": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/WR.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/WB.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/WGR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/WGE.png'>";  break;
      } break;

      case '+2': switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img src='./img/Uno/Karten/+2R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/+2B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/+2GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/+2GE.png'>";  break;
      } break;

      case '+4': SC2.innerHTML+= "<img src='./img/Uno/Karten/+4.png'>"; break;
      case 'FARBWUNSCH': SC2.innerHTML+= "<img src='./img/Uno/Karten/WUNSCH.png'>"; break;
    }
  }
  //location.reload();
}

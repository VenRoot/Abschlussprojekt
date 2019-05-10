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


  let Spieler2Karten; //Alle Karten von Spieler1
  let Spieler1Karten; //Alle Karten von Spieler2
  let Spieler2KartenFarbe; //Alle KartenFarben von Spieler1
  let Spieler1KartenFarbe; //Alles KartenFarben von Spieler2
  let x, y, i=0;
  let ErsteKarte, ErsteKarteFarbe;
  let NeueKarte, NeueKarteFarbe;
  const welcherSpieler = 2;
  let PlusZweiRot
  let LoadingBarState = true;
  //let Multiplayer = false;
  let Server = [];
  await whichServer();
  await NameVonSQL();
}
const Multiplayer = true;
let isInGame = false;
let Server1 = -1;
var belegt2 = "";


function whichServer()
{
  filePath = path.join(__dirname, './js/welcherServer.txt');
  console.log("Server lesen...");

  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,SV)
  {
      if (!err)
      {
        console.log(SV);
        belegt2 = parseInt(SV);
        return belegt2;
      }
      else {
        throw err;
        alert("FEHLER!!!");
        location.reload();
      }
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

let Spieler1Name = "Spieler 1", Spieler2Name = "Spieler 2";

$("#LOG").hide();
$("#FARBWUNSCH_WAHLPLUS4").hide();

let log = document.getElementById("LOG");

let Spielernamen;

async function NameVonSQL()
{
  await dat("CREATE TABLE IF NOT EXISTS spielernamen (Spieler1 VARCHAR(255), Spieler2 VARCHAR(255));");
  try {
    Spielernamen = await dat("SELECT * FROM server"+belegt2+";");
  } catch (e) {
    throw e;
    alert("FEHLER! Server unbekannt. Biite erneut versuchen\n\n Fehlermeldung: "+e);
    document.location.href="./index.html";
  }
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

async function WarteAufSP1() {
  return new Promise( async (resolve, reject) =>
{
  JSAlert.alert("Warte auf Spieler1...");
  console.log("oof");
  document.getElementById("startUno").setAttribute("disabled", "");
  await dat("UPDATE server"+belegt2+" SET SP2Bereit = TRUE;");
    let SP1Bereit = await dat("SELECT * FROM server"+belegt2+";");
    let tmpSP;
    SP1Bereit = SP1Bereit[0].SP1Bereit;
    while (!SP1Bereit) {
      await Sleep(1000);
      tmpSP = await dat("SELECT * FROM server"+belegt2+";");
      SP1Bereit = tmpSP[0].SP1Bereit;
    }
    console.log("FERTIG");
    let daten = await dat("SELECT * FROM server"+belegt2+";");
    daten = daten[0];
    JSAlert.alert("Bitte warte, bis "+daten.Spieler1Name+" das Spiel gestartet hat...");
    let Spielgestartet = await dat("SELECT * FROM server"+belegt2+";");
    while(!Spielgestartet[0].gestartet)
    {
      await Sleep(500);
      console.warn("Warten...");
      Spielgestartet = await dat("SELECT * FROM server"+belegt2+";");
    }
    resolve();
});
}

async function WaitForPlayerOne()
{
  JSAlert.alert("Warte auf "+Spielernamen[0]).dismissIn(1000 * 5);
  return new Promise(async (resolve, reject) =>
{
  let oop = await dat("SELECT * FROM server"+belegt2+";");
  let Zeit1 = 0;
  while (oop[0].Zug != 2) {
    console.log("Nicht am Zug");
    Verbieten();
    Zeit1++;
    await Sleep(900);
    oop = await dat("SELECT * FROM server"+belegt2+";");
    document.getElementById("WartenDIV").innerHTML = "Warte auf "+Spielernamen[0]+"... "+Zeit1+" Sekunden...";
  }
  Erlauben();
  resolve();
})
}

async function Verbieten()
{
  document.getElementById("Ziehen").setAttribute("disabled", "");
  document.getElementById("KarteLegen").setAttribute("disabled", "");
  document.getElementById("WartenDIV").innerHTML = Spielernamen[0]+" ist dran";
}

async function Erlauben()
{
  document.getElementById("Ziehen").removeAttribute("disabled");
  document.getElementById("KarteLegen").removeAttribute("disabled");
  document.getElementById("WartenDIV").innerHTML = "Du bist dran";
}


async function UnoStart() {
  await UnoInit();
  await NameVonSQL();
  document.getElementById("Spieler1NameFeld").innerHTML+= Spielernamen[0];
  document.getElementById("Spieler2NameFeld").innerHTML+= Spielernamen[1];
  Verbieten();
  DownloadLoop(1000);
  await WarteAufSP1();
  //await OwO();
  //await ETZ();
  //await FirstCardF();
  $("#UNOSCREEN").show();
  isInGame = true;
  $("#startUno").hide();
  document.getElementById("RundeBeenden").setAttribute("disabled", "");
  WaitForPlayerOne();
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

let Loopstop = false;
async function DownloadLoop(looptime)
{
  if (looptime == undefined) {
    throw "Bitte geb Parameter mit an";
  }
  else {
    while (!Loopstop) {
      await Sleep(looptime);
      await Download();
      graphic();
  }

  }
}

async function StopLoop() {
  Loopstop = true;
  await Sleep(1500);
  Loopstop = false;
}

async function Download() {
  return new Promise(async (resolve, reject) =>
{
  let ascx = await dat("SELECT * FROM server"+belegt2+";");
  if (CONLOG) {
    console.warn(ascx);
  }
  while (ascx[0].Spieler1Karten == "") {
    await Sleep(200);
    ascx = await dat("SELECT * FROM server"+belegt2+";");
    console.warn("Spieler1Karten nicht gültig...");
  }
  try {
    Spieler1Karten = ascx[0].Spieler1Karten.split(",");
    Spieler1KartenFarbe = ascx[0].Spieler1KartenFarbe.split(",");
    Spieler2Karten = ascx[0].Spieler2Karten.split(",");
    Spieler2KartenFarbe = ascx[0].Spieler2KartenFarbe.split(",");
    UnoKartenStapel = JSON.parse(ascx[0].Kartenstapel).Kartenstapel;
    UnoKartenStapelFarbe = JSON.parse(ascx[0].Kartenstapel).KartenstapelFarbe;
  } catch (e)
  {
    throw e;
    //await Download();
    graphic();
    ascx = await dat("SELECT * FROM server"+belegt2+";");
    Spieler1Karten = ascx[0].Spieler1Karten.split(",");
    Spieler1KartenFarbe = ascx[0].Spieler1KartenFarbe.split(",");
    Spieler2Karten = ascx[0].Spieler2Karten.split(",");
    Spieler2KartenFarbe = ascx[0].Spieler2KartenFarbe.split(",");
    UnoKartenStapel = JSON.parse(ascx[0].Kartenstapel).Kartenstapel;
    UnoKartenStapelFarbe = JSON.parse(ascx[0].Kartenstapel).KartenstapelFarbe;
  }
  Zug = ascx[0].Zug;
  if (ascx[0].SP1left) {
    alert(Spielernamen[0]+" hat das Spiel verlassen. Du kehrst nun zum Hauptmenü zurück");
    await Freigeben(belegt2);
    location.href = "./index.html";
  }
  resolve();
});
}

async function leave()
{
  await dat("UPDATE server"+belegt2+" SET SP2left = TRUE");
  document.location.href='./index.html'
}

async function OpenUno()
{
  if (CONLOG == true) {
    console.log("OpenUno();");
  }
  //await Name();
  JSAlert.alert("Bitte warten Sie, das Laden könnte etwas Zeit in Anspruch nehmen", null, JSAlert.Icons.Warning);
  await UnoStart();
  graphic();
}

function hello(Message)
{
  JSAlert.alert(Message);
}

async function Upload()
{
  return new Promise(async (resolve, reject) =>
{
  Zug = 1;
  if (UnoKartenStapel == "RICHTUNGSWECHSEL" || UnoKartenStapel == "NOKARTE") {
    Zug = 2;
  }
  let StapelUp = {"Kartenstapel":UnoKartenStapel, "KartenstapelFarbe":UnoKartenStapelFarbe};
  console.log("UPDATE server"+belegt2+" SET Spieler1Karten='"+Spieler1Karten.toString()+"', Spieler1KartenFarbe='"+Spieler1KartenFarbe.toString()+"', Spieler2Karten='"+Spieler2Karten.toString()+"', KartenStapel = '"+JSON.stringify(StapelUp)+"', Spieler2KartenFarbe='"+Spieler2KartenFarbe.toString()+"', Zug = '"+Zug+"';");
  await dat("UPDATE server"+belegt2+" SET Spieler1Karten='"+Spieler1Karten.toString()+"', Spieler1KartenFarbe='"+Spieler1KartenFarbe.toString()+"', Spieler2Karten='"+Spieler2Karten.toString()+"', KartenStapel = '"+JSON.stringify(StapelUp)+"', Spieler2KartenFarbe='"+Spieler2KartenFarbe.toString()+"', Zug = '"+Zug+"';");
  resolve();
});
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
     console.warn("Renne "+Spieler2Karten.length+" Mal durch");
     SC1.innerHTML = "";
     SC2.innerHTML = "";
     for (var i = 0; i < Spieler1Karten.length; i++) {
       SC1.innerHTML += "<img src='./img/Uno/Karten/Ruckseite.png'>";
     }

     for (var i = 0; i < Spieler2Karten.length; i++)
     {
       switch (Spieler2Karten[i])
       {
         case "0": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/0R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"'  src='./img/Uno/Karten/0B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/0GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/0GE.png'>";  break;
         } break;

         case "1": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"'src='./img/Uno/Karten/1R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/1B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/1GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/1GE.png'>";  break;
         } break;

         case "2": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"'src='./img/Uno/Karten/2R.png'>"; break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/2B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/2GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/2GE.png'>";  break;
         } break;

         case "3": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"'src='./img/Uno/Karten/3R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/3B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/3GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/3GE.png'>";  break;
         } break;

         case "4": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/4R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/4B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/4GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/4GE.png'>";  break;
         } break;

         case "5": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/5R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/5B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/5GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/5GE.png'>";  break;
         } break;

         case "6": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/6R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/6B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/6GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/6GE.png'>";  break;
         } break;

         case "7": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/7R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/7B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/7GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/7GE.png'>";  break;
         } break;

         case "8": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/8R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/8B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/8GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/8GE.png'>";  break;
         } break;

         case "9": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/9R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/9B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/9GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/9GE.png'>";  break;
         } break;

         case "NOKARTE": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/NOR.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/NOB.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/NOGR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/NOGE.png'>";  break;
         } break;

         case "RICHTUNGSWECHSEL": switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WR.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WB.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WGR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WGE.png'>";  break;
         } break;

         case '+2': switch (Spieler2KartenFarbe[i])
         {
           case "ROT": SC2.innerHTML+= "<img  onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+2R.png'>";  break;
           case "BLAU": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+2B.png'>";  break;
           case "GRÜN": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+2GR.png'>";  break;
           case "GELB": SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+2GE.png'>";  break;
         } break;

         case '+4': SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/+4.png'>"; break;
         case 'FARBWUNSCH': SC2.innerHTML+= "<img onclick='CLICKLEGEN("+i+");' id='SP2Karte"+i+"' src='./img/Uno/Karten/WUNSCH.png'>"; break;
       }
   }
   StapelUpdate();
  }
  return 0;
}

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
      await Tausch();
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
    // await dat("UPDATE server"+belegt2+" SET Spieler1Karten = '"+Spieler1Karten.toString()+"', Spieler1KartenFarbe = '"+Spieler1KartenFarbe.toString()+"', Spieler2Karten = '"+Spieler2Karten.toString()+"', Spieler2KartenFarbe = '"+Spieler2KartenFarbe.toString()+"';");
      await Upload();
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
  await console.log(Spieler2Karten[Karte]);
  await console.log(Spieler2KartenFarbe[Karte]);

  let checkKarte = Spieler2Karten[Karte];
  let checkFarbe = Spieler2KartenFarbe[Karte];

  if (UnoKartenStapel == checkKarte || UnoKartenStapelFarbe == checkFarbe || checkFarbe == "0")
  {
    Legen(document.getElementById("Kartennummer").value);
  }
  else
  {
    console.error("Konnte die Karte nicht legen!");
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
  tmp = Spieler2Karten;
  Spieler2Karten = Spieler1Karten;
  Spieler1Karten = tmp;

  tmp2 = Spieler2KartenFarbe;
  Spieler2KartenFarbe = Spieler1KartenFarbe;
  Spieler1KartenFarbe = tmp2;
  if (Multiplayer) {
    await Upload();
    graphic();
    weiter();

  }
  else {
    graphic();
  }


}

//let owo;
// async function KartenKarten()
// {
//   if (CONLOG == true) {
//     console.log("KartenKarten();");
//   }
//   owo = await Random(108);
//   //await console.log(owo);
//   await Sleep(10);
//   if (owo<9) //Spezialkarte
//   {
//     console.log("Spezialkarte");
//     switch (owo) {
//       case 1: case 2: console.log("+2 Rot"); PlusZweiRot--; break;//+2 Rot
//       case 3: case 4: console.log("+2 Blau"); PlusZweiBlau--; break;// +2 Blau
//       case 5: case 6: console.log("+2 Grün"); PlusZweiGrün--; break;// +2 Grün
//       case 7: case 8: console.log("+2 GELB"); PlusZweiGelb--; break;// +2 Gelb
//     }
//   }
//   else if(owo>9&&owo<13)
//   {
//     console.log("Starke Spezialkarte");
//     switch (owo) {
//       case 9: case 10:console.log("Wunsch"); Wunschkartenanzahl--; break;//Wunsch
//       case 11: case 12: console.log("+4"); PlusVierAnzahl--; break;     //Plus4
//     }
//   }
//   else if(owo>13&&owo<22)
//   {
//     switch (owo) {
//       case 14: case 15: console.log("+2 Rot"); RetourRot--; break;  // Retour Rot
//       case 16: case 17: console.log("+2 Blau"); RetourBlau--; break;// Retour Blau
//       case 18: case 19: console.log("+2 Grün"); RetourGrün--; break;// Retour Grün
//       case 20: case 21: console.log("+2 Gelb"); RetourGelb--; break;// Retour Gelb
//     }
//   }
//   else { //Normale Karte
//     console.log("Normal");
//   }
// }
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

async function weiter()
{

  //löschen("TransID"-1);
  document.querySelectorAll('.tra').forEach(function(a){
a.remove()
})
  if (Multiplayer) {
    await Upload();
    let zuu = await dat("SELECT * FROM server"+belegt2+";");
    Spieler2Karten = await zuu[0].Spieler2Karten.split(",");
    Spieler2KartenFarbe = await zuu[0].Spieler2KartenFarbe.split(",");
    Spieler1Karten = await zuu[0].Spieler1Karten.split(",");
    Spieler1KartenFarbe = await zuu[0].Spieler1KartenFarbe.split(",");
    if (Spieler2Karten.length <= 0) {
      Gewonnen(1);
    }
    else if (Spieler1Karten.length <= 0) {
      Gewonnen(2);
    }
    document.getElementById("Kartennummer").value = "";
    SC2.innerHTML = "";
    SC1.innerHTML = "";
    for (var i = 0; i < Spieler1Karten.length; i++) {
      SC1.innerHTML += "<img src='./img/Uno/Karten/Ruckseite.png'>";
    }
    graphic();
    document.getElementById("Ziehen").removeAttribute("disabled", "");
    document.getElementById("KarteLegen").removeAttribute("disabled", "");
    document.getElementById("RundeBeenden").setAttribute("disabled", "");
    $("#FARBWUNSCH_WAHLPLUS4").hide();
    await Upload();
    await WaitForPlayerOne();
  }
}


var lastMessage;

async function preSend() {
    if(event.key === 'Enter') {
      if (document.getElementById("chatEingabe") == "") {
        return;
        //Breche ab, wenn nicht eingegeben wurde
      }
      else {
        await dat("UPDATE server"+belegt2+" SET SP2typing = false");
        await ChatSend();
        document.getElementById("chatEingabe").value = "";
      }
    }
    else {
      await dat("UPDATE server"+belegt2+" SET SP2typing = true");
    }
}
document.addEventListener('keypress', preSend);

async function ChatSend()
{
  return new Promise( async (resolve, reject) =>
  {
    if (Multiplayer) {
      await dat("UPDATE server"+belegt2+" SET chat = '"+Spielernamen[1]+": "+document.getElementById("chatEingabe").value+"';");
    }
  });
}

async function ChatGet()
{
  if (Multiplayer) {

    let isTyping = await dat("SELECT SP1typing from server"+belegt2+";");
    isTyping = isTyping[0].SP1typing;
    if (isTyping) {
      document.getElementById("isTyping").innerHTML = Spielernamen[0]+" schreibt...";
    }
    else {
      document.getElementById("isTyping").innerHTML = "";
    }
    let msg = await dat("SELECT chat from server"+belegt2);
    msg = msg[0].chat;
    console.log(msg);
    if (msg != lastMessage)
    {
      lastMessage = msg;
      document.getElementById("chat").innerHTML += "<br>"+lastMessage;
    }
  }
}

async function check()
{
  while (true)
  {
    ChatGet();
    let tmp2 = document.getElementById("chatEingabe").value;
    await Sleep(2000);
    if (tmp2 != document.getElementById("chatEingabe").value) {
      await dat("UPDATE server"+belegt2+" SET SP2typing = TRUE;");
    }
    else {
      await dat("UPDATE server"+belegt2+" SET SP2typing = FALSE;");
    }
  }
}

async function weiters()
{
  if (CONLOG == true) {
    console.log("weiters();");
  }

  if (Spieler2Karten.length <= 0) {
    Gewonnen(2);
  }
  else if (Spieler1Karten.length <= 0) {
    Gewonnen(1);
  }
  document.getElementById("Kartennummer").value = "";
  //SC2.innerHTML = "";
  SC1.innerHTML = "";
  if (Multiplayer) {
    for (var i = 0; i < Spieler1Karten.length; i++) {
      SC1.innerHTML += "<img src='./img/Uno/Karten/Ruckseite.png'>";
    }
    graphic();
  }
  log.innerHTML += document.getElementById("UnoLog").innerHTML + "<br>";
  document.getElementById("Ziehen").removeAttribute("disabled", "");
  document.getElementById("KarteLegen").removeAttribute("disabled", "");
  document.getElementById("RundeBeenden").setAttribute("disabled", "");
  await Upload();
  await WaitForPlayerOne();
}

function getKarten()
{
  if (CONLOG == true) {
    console.log("getKarten();");
  }
  Spieler2Karten = 7;
  Spieler1Karten = 7;

}

async function KarteZiehen()
{
  if (CONLOG == true) {
    console.log("KarteZiehen();");
  }
  document.getElementById("Ziehen").setAttribute("disabled", "");
  document.getElementById("KarteLegen").removeAttribute("disabled", "");
  document.getElementById("RundeBeenden").removeAttribute("disabled", "");
  if (Multiplayer)
  {
    await StopLoop();
    Spieler2Karten.push(await Random(14));
    Spieler2KartenFarbe.push(await RandomFarbe(3));
    await convert();
    await invalid();
    await Upload();
    await DownloadLoop(1000);
  }
  graphic();

}


// async function OwO() {
//   if (CONLOG == true) {
//     console.log("OwO();");
//   }
//   let f=0;
//   i=0;
//   welcherSpieler = 1;
//   Spieler2Karten = [];
//   Spieler1Karten = [];
//   Spieler2KartenFarbe = [];
//   Spieler1KartenFarbe = [];
//   for(f=0; f<7; f++)
//   {
//     Spieler2Karten[i] = await Random(14); //Wählt Random Karte aus (Insgesamt 14 Karten)
//     Spieler2KartenFarbe[i] = await RandomFarbe(3);  //Farbe der Karte (Insgesamt 4 Farben)
//     Spieler1Karten[i] = await Random(14);
//     Spieler1KartenFarbe[i] = await RandomFarbe(3); //AWAIT, SONST PROMISE
//     i++;
//     //console.log(f);
//   }
//   i=0;
//   await convert();
//   await invalid();
//   console.log("Spieler 1: " +Spieler2Karten + " \nFarbe: "+Spieler2KartenFarbe); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   console.log("Spieler 2: " +Spieler1Karten + " \nFarbe: "+Spieler1KartenFarbe); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//    //chunk(Spieler2Karten, 2);
//    if (Multiplayer) {
//      await dat("UPDATE server"+belegt2+" SET Spieler2Karten = "+Spieler2Karten.toString());
//      await dat("UPDATE server"+belegt2+" SET Spieler2KartenFarbe = "+Spieler2KartenFarbe.toString());
//      await dat("UPDATE server"+belegt2+" SET Spieler1Karten = "+Spieler1Karten.toString());
//      await dat("UPDATE server"+belegt2+" SET Spieler1KartenFarbe = "+Spieler1KartenFarbe.toString());
//    }
//   return Spieler2Karten, Spieler1Karten, Spieler2KartenFarbe, Spieler1KartenFarbe;
//
// }

async function convert() {
  if (CONLOG == true) {
    console.log("convert();");
  }
  for (let g = 0; g < 100; g++) {                                             //100 Mal, damit JEDE Karte konvertiert nicht, nicht immer nur die erste
    Spieler2Karten = Spieler2Karten.toString().replace(/10/i, "FARBWUNSCH_"); //Ersetzt Karte 10 mit FARBWUNSCH!!! NOCH NICHT KONVERTIERT! SIEHE: INVALID()
    Spieler2Karten = Spieler2Karten.toString().replace(/11/i, "NOKARTE");
    Spieler2Karten = Spieler2Karten.toString().replace(/12/i, "RICHTUNGSWECHSEL");
    Spieler2Karten = Spieler2Karten.toString().replace(/13/i, "+2");
    Spieler2Karten = Spieler2Karten.toString().replace(/14/i, "+4_");         //NOCH NICHT KONVERTIERT! SIEHE: INVALID()
  }

    //await Sleep(10);
    Spieler2Karten = Spieler2Karten.split(",");

for (let f = 0; f < 100; f++) {
  Spieler1Karten = Spieler1Karten.toString().replace(/10/i, "FARBWUNSCH_"); //NOCH NICHT KONVERTIERT! SIEHE: INVALID()
  Spieler1Karten = Spieler1Karten.toString().replace(/11/i, "NOKARTE");
  Spieler1Karten = Spieler1Karten.toString().replace(/12/i, "RICHTUNGSWECHSEL");
  Spieler1Karten = Spieler1Karten.toString().replace(/13/i, "+2");
  Spieler1Karten = Spieler1Karten.toString().replace(/14/i, "+4_"); //NOCH NICHT KONVERTIERT! SIEHE: INVALID()
}

    //await Sleep(10);
    Spieler1Karten = Spieler1Karten.split(",");
}


async function invalid()
{
  if (CONLOG == true) {
    console.log("invalid();");
  }
  let ver;
  for (let x = 0; x < Spieler2Karten.length; x++) {
    ver = Spieler2Karten.indexOf("FARBWUNSCH_");
    console.log(ver);
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
      Spieler2KartenFarbe.splice(ver,1,"0");
      Spieler2Karten.splice(ver,1,"+4");
    }
  }
  for (let x = 0; x < Spieler1Karten.length; x++) {
    ver = 0;
    ver = Spieler1Karten.indexOf("FARBWUNSCH_");
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
      await Spieler1KartenFarbe.splice(ver,1,"0");
      await Spieler1Karten.splice(ver,1,"+4");
    }
  }
}

function tst() {
  if (CONLOG == true) {
    console.log("tst();");
  }
  for(let z=0; z < Spieler2Karten.length; z++)
  {
    Spieler2Karten[z] = "FARBWUNSCH";
  }
}

let UnoKartenStapel;
let UnoKartenStapelFarbe;

function ETZ()
{
  if (CONLOG == true) {
    console.log("ETZ();");
  }
  console.log("\n\nKarten von "+Spielernamen[1]+": ");
  for (i = 0; i<=6; i++) {
    console.log(Spieler2Karten[i] + " " + Spieler2KartenFarbe[i] + "\n" );
  }

  console.log("\n\nKarten von "+Spielernamen[0]+": ");
  for (i = 0; i<=6; i++) {
    console.log(Spieler1Karten[i] + " " + Spieler1KartenFarbe[i] + "\n" );
  }
}

// async function FirstCardF() {
//   if (CONLOG == true) {
//     console.log("FirstCardF();");
//   }
//   FirstCard = await Random(14); //Welche Karte (Insgesamt 14 Karten)
//   FirstCard = FirstCard.toString();
//   if(FirstCard >= 10)
//    {
//      FirstCardF();
//    }
//    else
//    {
//       FirstCardFarbe = await RandomFarbe(3);  //Farbe der Karte (Insgesamt 4 Farben)
//       //convertFirstCard();
//       console.log("Erste Karte: "+FirstCard +" "+FirstCardFarbe);
//       if (Multiplayer) {
//         var FirstCardM = {"Kartenstapel":FirstCard, "KartenstapelFarbe":FirstCardFarbe};
//         await dat("UPDATE server"+belegt2+" SET Kartenstapel = '"+JSON.stringify(FirstCardM)+"';");
//       }
//       await Sleep(100);
//       UnoKartenStapel = FirstCard;
//       UnoKartenStapelFarbe = FirstCardFarbe;
//       StapelUpdate();
// }
//
// }
var Kartenstapel = document.getElementById("UnoStapel");

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

    case "FARBWUNSCH": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHR.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHGE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHGR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHB.png'>"; break;
    } break;

    case "+2": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/+2R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/+2GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/+2GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/+2B.png'>"; break;
    } break;

    case "+4": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4R.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4GE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4GR.png'>"; break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4B.png'>"; break;
    } break;

    case "NOKARTE": switch (UnoKartenStapelFarbe) {
      case "ROT": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/NOR.png'>"; break;
      case "GELB": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/NOGE.png'>"; break;
      case "GRÜN": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/NOGR.png'>";  break;
      case "BLAU": Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/NOB.png'>"; break;
    } break;

  }
  return 0;
}
Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCH.png'>";

async function WunschRot()
{
  if (CONLOG == true) {
    console.log("WunschRot();");
  }
  UnoKartenStapelFarbe = "ROT";
  UnoKartenStapel = "FARBWUNSCH";
  //Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHR.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  await Upload();
  weiter();
}

async function WunschBlau()
{
  if (CONLOG == true) {
    console.log("WunschBlau();");
  }
  UnoKartenStapelFarbe = "BLAU";
  UnoKartenStapel = "FARBWUNSCH";
  //Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHB.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  await Upload();
  weiter();
}

async function WunschGrün()
{
  if (CONLOG == true) {
    console.log("WunschGrün();");
  }
  UnoKartenStapelFarbe = "GRÜN";
  UnoKartenStapel = "FARBWUNSCH";
  //Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHGR.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  await Upload();
  weiter();
}


async function WunschGelb()
{
  if (CONLOG == true) {
    console.log("WunschGelb();");
  }
  UnoKartenStapelFarbe = "GELB";
  UnoKartenStapel = "FARBWUNSCH";
  //Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHGE.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  await Upload();
  weiter();
}

async function WunschRotPlus4()
{
  if (CONLOG == true) {
    console.log("WunschRotPlus4();");
  }
  UnoKartenStapelFarbe = "ROT";
  UnoKartenStapel = "+4";
  ////Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4R.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  await Upload();
  weiter();
}

async function WunschBlauPlus4()
{
  if (CONLOG == true) {
    console.log("WunschBlauPlus4();");
  }
  UnoKartenStapelFarbe = "BLAU";
  UnoKartenStapel = "+4";
  //Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4B.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  await Upload();
  weiter();
}

async function WunschGrünPlus4()
{
  if (CONLOG == true) {
    console.log("WunschGrünPlus4();");
  }
  UnoKartenStapelFarbe = "GRÜN";
  UnoKartenStapel = "+4";
  //Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4GR.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  await Upload();
  weiter();
}

$("Spieler1Name").hide();

async function WunschGelbPlus4()
{
  if (CONLOG == true) {
    console.log("WunschGelbPlus4();");
  }
  UnoKartenStapelFarbe = "GELB";
  UnoKartenStapel = "+4";
  //Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4GE.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  await Upload();
  weiter();
}

let inputname;
let won;


function K() {
  console.log("Karte 1-9: 1-9\nKarte 10: Farbe\nKarte 11: NOKARTE\nKarte 12: Richtungswechsel\nKarte 13: +2\nKarte 14: +4\nFarbe 1: Rot\nFarbe 2: Blau\nFarbe 3: Gelb\nFarbe 4: Grün");
}

async function Gewonnen(Spieler)
{
  if (CONLOG == true) {
    console.log("Gewonnen();");
  }
  if (Multiplayer) {
    if (Spieler == 2) {
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
  for (var i = 0; i <= Spieler2Karten.length; i++) {
    switch (Spieler2Karten[i]) {


      case "0": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  onclick='SELECTROT();' src='./img/Uno/Karten/0R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img onclick='SELECTBLAU();' src='./img/Uno/Karten/0B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img onclick='SELECTGRÜN();' src='./img/Uno/Karten/0GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img onclick='SELECTGELB();' src='./img/Uno/Karten/0GE.png'>";  break;
      } break;

      case "1": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  onclick='SELECTROT();' src='./img/Uno/Karten/1R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img onclick='SELECTROT();' src='./img/Uno/Karten/1B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img onclick='SELECTROT();' src='./img/Uno/Karten/1GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img onclick='SELECTROT();' src='./img/Uno/Karten/1GE.png'>"; break;
      } break;

      case "2": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/2R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/2B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/2GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/2GE.png'>"; break;
      } break;

      case "3": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/3R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/3B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/3GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/3GE.png'>";  break;
      } break;

      case "4": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/4R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/4B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/4GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/4GE.png'>"; break;
      } break;

      case "5": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/5R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/5B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/5GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/5GE.png'>";  break;
      } break;

      case "6": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/6R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/6B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/6GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/6GE.png'>";  break;
      } break;

      case "7": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/7R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/7B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/7GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/7GE.png'>";  break;
      } break;

      case "8": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/8R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/8B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/8GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/8GE.png'>";  break;
      } break;

      case "9": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/9R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/9B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/9GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/9GE.png'>";  break;
      } break;

      case "NOKARTE": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/NOR.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/NOB.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/NOGR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/NOGE.png'>";  break;
      } break;

      case "RICHTUNGSWECHSEL": switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/WR.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/WB.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/WGR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/WGE.png'>";  break;
      } break;

      case '+2': switch (Spieler2KartenFarbe[i]) {
        case "ROT": SC2.innerHTML+= "<img  src='./img/Uno/Karten/+2R.png'>";  break;
        case "BLAU": SC2.innerHTML+= "<img src='./img/Uno/Karten/+2B.png'>";  break;
        case "GRÜN": SC2.innerHTML+= "<img src='./img/Uno/Karten/+2GR.png'>";  break;
        case "GELB": SC2.innerHTML+= "<img src='./img/Uno/Karten/+2GE.png'>";  break;
      } break;

      case '+4': SC2.innerHTML+= "<img src='./img/Uno/Karten/+4.png'>"; break;
      case 'FARBWUNSCH': SC2.innerHTML+= "<img src='./img/Uno/Karten/WUNSCH.png'>"; break;
    }
  }

  for (var i = 0; i < Spieler1Karten.length; i++) {
    switch (Spieler1Karten[i]) {


      case "0": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/0R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/0B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/0GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/0GE.png'>";  break;
      } break;

      case "1": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/1R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/1B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/1GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/1GE.png'>";  break;
      } break;

      case "2": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/2R.png'>"; break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/2B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/2GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/2GE.png'>";  break;
      } break;

      case "3": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/3R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/3B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/3GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/3GE.png'>";  break;
      } break;

      case "4": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/4R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/4B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/4GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/4GE.png'>";  break;
      } break;

      case "5": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/5R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/5B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/5GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/5GE.png'>";  break;
      } break;

      case "6": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/6R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/6B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/6GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/6GE.png'>";  break;
      } break;

      case "7": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/7R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/7B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/7GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/7GE.png'>";  break;
      } break;

      case "8": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/8R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/8B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/8GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/8GE.png'>";  break;
      } break;

      case "9": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/9R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/9B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/9GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/9GE.png'>";  break;
      } break;

      case "NOKARTE": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/NOR.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/NOB.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/NOGR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/NOGE.png'>";  break;
      } break;

      case "RICHTUNGSWECHSEL": switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/WR.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/WB.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/WGR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/WGE.png'>";  break;
      } break;

      case '+2': switch (Spieler1KartenFarbe[i]) {
        case "ROT": SC1.innerHTML+= "<img src='./img/Uno/Karten/+2R.png'>";  break;
        case "BLAU": SC1.innerHTML+= "<img src='./img/Uno/Karten/+2B.png'>";  break;
        case "GRÜN": SC1.innerHTML+= "<img src='./img/Uno/Karten/+2GR.png'>";  break;
        case "GELB": SC1.innerHTML+= "<img src='./img/Uno/Karten/+2GE.png'>";  break;
      } break;

      case '+4': SC1.innerHTML+= "<img src='./img/Uno/Karten/+4.png'>"; break;
      case 'FARBWUNSCH': SC1.innerHTML+= "<img src='./img/Uno/Karten/WUNSCH.png'>"; break;
    }
  }
  //location.reload();
}

async function UnoInit() {
  if (CONLOG == true) {
    console.log("UnoInit();");
  }



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
  let Multiplayer = false;
  let Server = [];
  let belegt2 = "owo";
  await NameVonSQL();
}
let isInGame = false;
let Server1 = -1;


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

let SpielerNamen;

async function NameVonSQL()
{
  await dat("CREATE TABLE IF NOT EXISTS spielernamen (Spieler1 VARCHAR(255), Spieler2 VARCHAR(255));");
  SpielerNamen = await dat("SELECT * FROM spielernamen;");
  await Sleep(1000);
  console.log(SpielerNamen);
  if (SpielerNamen.length == 0 || SpielerNamen == undefined) {
    console.warn("Spielernamen ist leer. Daten werden zurückgesetzt");
    await dat("INSERT INTO spielernamen VALUES('Spieler1', 'Spieler2');");
    if (!isInGame) {
      NameVonSQL();
    }

    return 0;
  }
  else {
    await Sleep(100);
    Spieler1Name = SpielerNamen[0].Spieler1;
    await dat("INSERT INTO spielernamen VALUES('Spieler1', 'Spieler2');");
    Spieler2Name = SpielerNamen[0].Spieler2;
      if (SpielerNamen[0].Spieler1 == "") {
        Spieler1Name = "Spieler 1";
        console.warn("Spieler1 zurückgesetzt");
      }
      if (SpielerNamen[0].Spieler2 == "") {
        Spieler2Name = "Spieler 2"; //Falls Name nicht eingegeben wurde
        console.warn("Spieler2 zurückgesetzt");
      }
  }


}

async function UnoStart() {
  await UnoInit();
  await NameVonSQL();
  document.getElementById("Spieler1NameFeld").innerHTML+= Spieler1Name;
  document.getElementById("Spieler2NameFeld").innerHTML+= Spieler2Name;
  await getKarten();
  await OwO();
  await ETZ();
  await FirstCardF();
  $("#UNOSCREEN").show();
  isInGame = true;
  $("#startUno").hide();
  document.getElementById("RundeBeenden").setAttribute("disabled", "");
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

async function Name()
{
  if (CONLOG == true) {
    console.log("Name();");
  }
  document.body.innerHTML += '<div id="Namenn" >Gebt eure Namen ein! <br> <input type="text" id="Spieler1Name_" placeholder="Spieler 1"> <br> <input type="text" id="Spieler2Name_" placeholder="Spieler 2"> <button class="btn btn-success" onclick="setName();">Bestätigen</button></div>';
  await Sleep(100000000000);

}

async function setName()
{
  if (CONLOG == true) {
    console.log("setName();");
  }
  Spieler1Name = document.getElementById("Spieler1Name_").value;
  Spieler2Name = document.getElementById("Spieler2Name_").value;
  if (Spieler1Name == Spieler2Name)
  {
    JSAlert.alert("Bitte nicht die selben Namen verwenden");
  }
    else {
      $("#Namenn").hide();
      await OpenUno();
      await Sleep(1000);
      while (Spieler1Name == "Spieler 1") {}
      while (Spieler2Name == "Spieler 2") {}
      document.getElementById("SPIELSCREEN").innerHTML = '<button type="button" class="btn btn-warning btn-block" name="button">Karten von '+Spieler2Name+'</button>';
      document.getElementById("Trennwand").innerHTML = '<button type="button" class="btn btn-warning btn-block" name="button">Karten von '+Spieler1Name+'</button>';
  }

}

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
  //await Sleep(1000);
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
    await StapelUpdate();
    await graphic();
    if (UnoKartenStapel == "NOKARTE" || UnoKartenStapel == "RICHTUNGSWECHSEL") {
      weiters();
    }
    if (UnoKartenStapel != "FARBWUNSCH" && UnoKartenStapel != "NOKARTE" && UnoKartenStapel != "RICHTUNGSWECHSEL" && UnoKartenStapel != "+4") {
      weiter();
    }

    if (Multiplayer) {
      dat("UPDATE Server"+belegt2+" SET Spieler1Karten = '"+Spieler1Karten.toString()+"', Spieler1KartenFarbe = '"+Spieler1KartenFarbe.toString()+"', Spieler2Karten = '"+Spieler2Karten.toString()+"', Spieler2KartenFarbe = '"+Spieler2KartenFarbe.toString()+"';");
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

async function weiter()
{
  //löschen("TransID"-1);
  document.querySelectorAll('.tra').forEach(function(a){
a.remove()
})
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

  await Sleep(100);

  alert("Gebe an Spieler " + welcherSpieler + " weiter\n\nSpieler " + welcherSpieler + ": bitte bestätige mit OK");
  //await Sleep(100);
  graphic();

  log.innerHTML += document.getElementById("UnoLog").innerHTML + "<br>";
  document.getElementById("Ziehen").removeAttribute("disabled", "");
  document.getElementById("KarteLegen").removeAttribute("disabled", "");
  document.getElementById("RundeBeenden").setAttribute("disabled", "");
  $("#FARBWUNSCH_WAHLPLUS4").hide();
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
  SC1.innerHTML = "";
  SC2.innerHTML = "";
  for (var i = 0; i < Spieler2Karten.length; i++) {
     SC2.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
  }

  for (var i = 0; i < Spieler1Karten.length; i++) {
     SC1.innerHTML += "<img src='./img/Uno/Karten/Rückseite.png'>";
  }
  graphic();

  log.innerHTML += document.getElementById("UnoLog").innerHTML + "<br>";
  document.getElementById("Ziehen").removeAttribute("disabled", "");
  document.getElementById("KarteLegen").removeAttribute("disabled", "");
  document.getElementById("RundeBeenden").setAttribute("disabled", "");
}

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
  if (welcherSpieler == 1) {
    Spieler1Karten.push(await Random(14));
    Spieler1KartenFarbe.push(await RandomFarbe(3));
    await convert();
    await invalid();
  }
  else {
    Spieler2Karten.push(await Random(14));
    Spieler2KartenFarbe.push(await RandomFarbe(3));
    await convert();
    await invalid();
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
        var FirstCardM = {"FirstCard":FirstCard, "FirstCardFarbe":FirstCardFarbe};
        await dat("UPDATE Server"+belegt2+" SET KartenStapel = "+JSON.stringify(FirstCardFarbe)+";");
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


function WunschGelb()
{
  if (CONLOG == true) {
    console.log("WunschGelb();");
  }
  UnoKartenStapelFarbe = "GELB";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/WUNSCHGE.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

function WunschRotPlus4()
{
  if (CONLOG == true) {
    console.log("WunschRotPlus4();");
  }
  UnoKartenStapelFarbe = "ROT";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4R.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

function WunschBlauPlus4()
{
  if (CONLOG == true) {
    console.log("WunschBlauPlus4();");
  }
  UnoKartenStapelFarbe = "BLAU";
  Kartenstapel.innerHTML = "<img src='./img/Uno/Karten/PLUS4B.png'>";
  $("#FARBWUNSCH_WAHL").hide();
  weiter();
}

function WunschGrünPlus4()
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

function WunschGelbPlus4()
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
  alert("Herzlichen Glückwunsch Spieler " + Spieler + ". Du hast gewonnen!!!");
  won = Spieler;
  if (confirm("Möchtest du deinen Highscore eintragen lassen?")) {
    inputname = document.getElementById("inputname").value;
    $("#UNOSCREEN").hide();
    $("#Formular").show();

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


/*function KarteLegen() {
  if(aktuelleKarte == gelegteKarte || aktuelleKarteFarbe == gelegteKarteFarbe)
{
  alert("Ja");
  if (gelegteKarte == "0")
  {
    Tausch();
  }
}
  else {
    alert("Nein");
  }
}
*/

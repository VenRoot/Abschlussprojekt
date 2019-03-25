let Spieler1Karten = [];
let Spieler2Karten = [];
let gelegteKarten = [];
let welcherSpieler;
let Spieler1Score;
let Spieler2Score;
let CONLOG = false;
let uwu = 0;



// async function BJInitKarten()
// {
//   //await Sleep(1000);
//   for (let i=1; i<=11; i++) {
//     BJKartenStapel[i] = i;
//   }
//   return BJKartenStapel;
// }

async function BJStart() {
  //await BJInitKarten();
  welcherSpieler = await RandomS(1);
  await console.log("Spieler "+welcherSpieler+" ist dran!");
  await BJInit();
  await graphic();
}

async function BJInit()
{
  Spieler1Karten = [];
  Spieler1Karten.push(await BJZiehen2());
  Spieler1Karten.push(await BJZiehen2());

  Spieler2Karten = [];
  Spieler2Karten.push(await BJZiehen2());
  Spieler2Karten.push(await BJZiehen2());

  //gelegteKarten.push(Spieler1Karten[0]); gelegteKarten.push(Spieler1Karten[1]);
  //gelegteKarten.push(Spieler2Karten[0]); gelegteKarten.push(Spieler2Karten[1]);
}

async function BJZiehen2()
{
  let a = await Random(11);
  if(gelegteKarten.includes(a))
  {
    console.log("Karte "+a+" nicht gelegt");
    await BJZiehen2();
  }
  else {
    await console.log("Karte "+a+" gelegt");
    await gelegteKarten.push(a);
    await console.log(gelegteKarten);
    return a;
}
}

async function BJZiehen() {
  if (welcherSpieler == 1) {
    if (gelegteKarten.length == 11) {
      console.warn("Es sind keine Karten mehr verfügbar!");
      console.error(gelegteKarten);
    }
    else {
      Karte = await Random(11);
      if(Spieler1Karten.includes(Karte))
      {
        console.log("Karte "+Karte+" nicht gelegt");
        await BJZiehen();
      }
      else {
        await console.log("Karte "+Karte+" gelegt");
        await gelegteKarten.push(Karte);
        await Spieler1Karten.push(Karte);
        await console.log(gelegteKarten);
    }}
  }
  else if (welcherSpieler == 2)
  {
    if (gelegteKarten.length == 11) {
      console.warn("Es sind keine Karten mehr verfügbar!");
      console.error(gelegteKarten);
    }
    else {
      Karte = await Random(11);
      if(Spieler2Karten.includes(Karte))
      {
        console.log("Karte "+Karte+" nicht gelegt");
        await BJZiehen();
      }
      else {
        await console.log("Karte "+Karte+" gelegt");
        await Spieler2Karten.push(Karte);
        await gelegteKarten.push(Karte);
        await console.log(gelegteKarten);
    }}
  }
  //BJKartenStapel = BJKartenStapel.split(",");
}

async function BJKarteLegen(Karte)
{
  if (welcherSpieler == 1)
  {
    gelegteKarten.toString();
    Spieler1Karten.toString();
    ver = Spieler1Karten.indexOf(Karte);
    if(ver == '-1')
    {
      Fehler(1);
    }
    else {
      await gelegteKarten.splice(ver,1);
      await Spieler1Karten.splice(ver,1);
    }
  }
  else if(welcherSpieler == 2)
  {
    gelegteKarten.toString();
    Spieler2Karten.toString();
    ver = Spieler2Karten.indexOf(Karte);
    if(ver == '-1')
    {
      Fehler(1);
    }
    else {
      await gelegteKarten.splice(ver,1);
      await Spieler2Karten.splice(ver,1);
    }
  }
}

async function Tipp()
{
  let TP = document.getElementById("Tipps");
  if (CONLOG == true) {
    console.log("Tipp();");
  }
  uwu++;
  switch (uwu) {
    case 1: TP.innerHTML = "Das Ziel des Spiels ist es, so nah an eine Summe von 21 zu kommen, ohne sich zu überkaufen"; break;
    case 2: TP.innerHTML = "Die Anleitung kannst du dir im Hauptmenü ansehen!"; break;
    case 3: TP.innerHTML = "Selber denken macht schlau!"; break;
    case 4: TP.innerHTML = "Der Log ist eine gute Methode, um den Spielverlauf zu prüfen"; break;
    case 5: TP.innerHTML = "Um eine Karte zu legen, gebe die Kartennummer in das Feld ein und klicke auf Karte legen.<br> Beachte, dass die 1. Karte von links Karte 0 ist, die 2. von Links Karte 1 usw."; break;
    case 6: TP.innerHTML = "Du kannst die Karten des Gegenspielers nicht sehen, dennoch kannst du sehen, wie viele es sind"; break;
    case 7: uwu=1; TP.innerHTML = "Du kannst oben auf den roten Button klicken, um den Spielverlauf anzuzeigen"; break;
  }
}

function LogLog(text)
{
  if (CONLOG == true) {
    console.log("LogLog();");
  }
  log.innerHTML += UnoLog.innerHTML + "<br>";
  UnoLog.innerHTML = text;
}

async function nächsteRunde()
{
  if (Spieler1Karten == []) {
    Gewonnen(1);
  }
   if (Spieler2Karten == []) {
    Gewonnen(2);
  }
  if (welcherSpieler == 1) {welcherSpieler = 2;} else { welcherSpieler = 1;}
  console.log("Spieler "+welcherSpieler+" ist dran");
}

async function Auswertung()
{
  let Summe = 0;

  for (var i = 0; i < Spieler1Karten.length; i++) {
    Summe += Spieler1Karten[i];
  }
}

async function Gewonnen(Spieler)
{
  alert("Spieler "+Spieler+" hat gewonnnen!!! Herzlichen Glückwunsch");
  if (Spieler == 1) {
    await Spieler1Score++;
  }
  else {
    await Spieler2Score++;
  }
  document.getElementById("Spieler1Score").innerHTML = Spieler1Score;
  document.getElementById("Spieler2Score").innerHTML = Spieler2Score;
}

async function graphic()
{
  document.getElementById("BJSPIELER1SCREEN").innerHTML = "";
  document.getElementById("BJSPIELER2SCREEN").innerHTML = "";

  if (welcherSpieler == 1) {
    for (var i = 0; i < Spieler1Karten.length; i++) {
      switch (Spieler1Karten[i]) {
        case 1: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`1`);' src='./img/BJ/K1.png'>";  break;
        case 2: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`2`);' src='./img/BJ/K2.png'>";  break;
        case 3: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`3`);' src='./img/BJ/K3.png'>";  break;
        case 4: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`4`);' src='./img/BJ/K4.png'>";  break;
        case 5: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`5`);' src='./img/BJ/K5.png'>";  break;
        case 6: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`6`);' src='./img/BJ/K6.png'>";  break;
        case 7: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`7`);' src='./img/BJ/K7.png'>";  break;
        case 8: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`8`);' src='./img/BJ/K8.png'>";  break;
        case 9: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`9`);' src='./img/BJ/K9.png'>";  break;
        case 10: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`10`);' src='./img/BJ/K10.png'>";  break;
        case 11: SC1.innerHTML += "<img  onclick='KARTENLEGEN(`11`);' src='./img/BJ/K11.png'>";  break;

      }
    }
  }
}

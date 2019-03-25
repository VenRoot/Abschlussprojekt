let Spieler1Karten = [];
let Spieler2Karten = [];
let KartenStapel = [1,2,3,4,5,6,7,8,9,10,11];
let gelegteKarten = [];
let welcherSpieler = 1;
let Karte;

function BJStart()
{
  BJInit();
}


async function BJRandom()
{
  return Math.round(Math.random() * ((10 - 1) + 1)+1);
}

async function BJInit()
{
  while (Spieler1Karten.legth == 2) {
    console.log("OwO");
    Karte = await BJRandom();
    //if (!gelegteKarten.includes(Karte)) {
      Spieler1Karten.push(Karte);
      console.log(Spieler1Karten);
    //}
  }
  while (Spieler2Karten.legth == 2) {
    Karte = await BJRandom();
    //if (!gelegteKarten.includes(Karte)) {
      Spieler2Karten.push(Karte);
  //  }
  }
}
/*

let x = 0;
var y = 0;

if (true) {
  x = 2;
  y = 2;
}

console.log(x); //0
console.log(y); //2

*/

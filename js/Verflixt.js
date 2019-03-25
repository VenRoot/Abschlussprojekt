let Spieler1Pos0;
let Spieler1Pos1;
let Spieler1Pos2;
let Spieler1Pos3;

let Spieler2Pos0;
let Spieler2Pos1;
let Spieler2Pos2;
let Spieler2Pos3;

let Spieler3Pos0;
let Spieler3Pos1;
let Spieler3Pos2;
let Spieler3Pos3;

let Spieler4Pos0;
let Spieler4Pos1;
let Spieler4Pos2;
let Spieler4Pos3;

// If welcherSpieler > Spieleranzahl { welcherSpieler = 1; }

async function VStart(Spieleranzahl2)
{
  Spieleranzahl = Spieleranzahl2;
  if (Spieleranzahl == 2)
  {
    Spieler1Pos0 = 0; Spieler1Pos1 = 0; Spieler1Pos2 = 0;
    Spieler2Pos0 = 0; Spieler2Pos1 = 0; Spieler2Pos2 = 0;
  }
  else if(Spieleranzahl == 3)
  {
    Spieler1Pos0 = 0; Spieler1Pos1 = 0; Spieler1Pos2 = 0;
    Spieler2Pos0 = 0; Spieler2Pos1 = 0; Spieler2Pos2 = 0;
    Spieler3Pos0 = 0; Spieler3Pos1 = 0; Spieler3Pos2 = 0;
  }
  else if (Spieleranzahl == 4)
  {
    Spieler1Pos0 = 0; Spieler1Pos1 = 0; Spieler1Pos2 = 0;
    Spieler2Pos0 = 0; Spieler2Pos1 = 0; Spieler2Pos2 = 0;
    Spieler3Pos0 = 0; Spieler3Pos1 = 0; Spieler3Pos2 = 0;
    Spieler4Pos0 = 0; Spieler4Pos1 = 0; Spieler4Pos2 = 0;
  }
  else
  {
    Fehler(3);
  }

  bewegen(0);
}


async function bewegen(0)
{
  //Spieler1Pos0 =
}

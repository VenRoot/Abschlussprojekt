let Ergebnis = [];

let ErgebnisEins = 0, ErgebnisZwei = 0, ErgebnisDrei = 0, ErgebnisVier = 0, ErgebnisFünf = 0, ErgebnisSechs = 0;
let DreiFrei = false, VierFrei = false, FHFrei = false, KSFrei = false, GSFrei = false, KFrei = false, CFrei = false, WStop1 = false, WStop2 = false, WStop3 = false, WStop4 = false, WStop5 = false;
let EA = [];
let welcherSpieler = 1;
let Save1 = false, Save2 = false, Save3 = false, Save4 = false, Save5 = false, Save11 = false, Save12 = false, Save13 = false, Save14 = false, Save15 = false,  Save22 = false,  Save23 = false,  Save24 = false,  Save25 = false;
isKniffel = true;

function MethodeNull()
{
  document.body.innerHTML += '<button type="button" class="btn btn-danger" id="Button1" name="button">1</button> <button type="button" class="btn btn-danger" id="Button2" name="button">2</button> <button type="button" class="btn btn-danger" id="Button3" name="button">3</button> <button type="button" class="btn btn-danger" id="Button4" name="button">4</button> <button type="button" class="btn btn-danger" id="Button5" name="button">5</button> <button type="button" class="btn btn-danger" id="Button6" name="button">6</button> <button type="button" class="btn btn-danger" id="ButtonDreierPasch" name="button">Dreierpasch</button> <button type="button" class="btn btn-danger" id="ButtonViererPasch" name="button">Viererpasch</button> <button type="button" class="btn btn-danger" id="ButtonFullHouse" name="button">Full-House</button> <button type="button" class="btn btn-danger" id="ButtonKleineStraße" name="button">Kleine Straße</button> <button type="button" class="btn btn-danger" id="ButtonGroßeStraße" name="button">Große Straße</button> <button type="button" class="btn btn-danger" id="ButtonKniffel" name="button">Kniffel</button> <button type="button" class="btn btn-danger" id="ButtonChance" name="button">Chance</button>';
}

async function altWürfeln()
{
  for (var i = 0; i < 5; i++) {

    Ergebnis[i] = await Random(6);
  }

  console.log(Ergebnis);
}

let KniffelUp=0;

async function Würfeln()
{
  if (Versuche >0) {
    if (document.getElementById("Versuch").value != "") {
      Versuche--;
    }
    else {
      NoVersuche();
    }
    document.getElementById("Versuch").value = Versuche;
    console.log("Würfeln...");
    await BTClear();






    $("#StopButton").show();
    $("#WürfelButton").hide();
    if (!Save1) {EZ1.value = ""; Würfeln1();}
    if (!Save2) {EZ2.value = ""; Würfeln2();}
    if (!Save3) {EZ3.value = ""; Würfeln3();}
    if (!Save4) {EZ4.value = ""; Würfeln4();}
    if (!Save5) {EZ5.value = ""; Würfeln5();}

    if(Save1 && Save2 && Save3 && Save4 && Save5)
    {
      //Versuche=0;
      alert("Du hast alle Nummern gelockt. Du kannst nicht mehr Würfeln!");
    }



  }
}
$("#savenum").hide();
$("#relnum").hide();
$("#savenum2").hide();
let Versuche = 3;

function ResetAll()
{
  Release1f();
  Release2f();
  Release3f();
  Release4f();
  Release5f();
  Versuche = 3;
}

async function Fertig()
{
  await ResetAll();
  if (welcherSpieler == 1) {
    welcherSpieler = 2;
  }
  else {
    welcherSpieler = 1;
  }
}

function checkText()
{
  document.body.style.color = 0;
}

async function Würfeln1()
{
  while (!WStop1) {

    await KniffelUp++;
    document.getElementById("KErgebnis1").value = KniffelUp;
    if (KniffelUp >= 6) {
      KniffelUp = 0;
    }
    await Sleep(50);
  }
}

async function Würfeln2()
{
  while (!WStop2) {

    await KniffelUp++;
    document.getElementById("KErgebnis2").value = KniffelUp;
    if (KniffelUp >= 6) {
      KniffelUp = 0;
    }
    await Sleep(50);
  }
}

async function Würfeln3()
{
  while (!WStop3) {

    await KniffelUp++;
    document.getElementById("KErgebnis3").value = KniffelUp;
    if (KniffelUp >= 6) {
      KniffelUp = 0;
    }
    await Sleep(50);
  }
}

async function Würfeln4()
{
  while (!WStop4) {
    await KniffelUp++;
    document.getElementById("KErgebnis4").value = KniffelUp;
    if (KniffelUp >= 6) {
      KniffelUp = 0;
    }
    await Sleep(50);
  }
}

async function Würfeln5()
{
  while (!WStop5) {
    await KniffelUp++;
    document.getElementById("KErgebnis5").value = KniffelUp;
    if (KniffelUp >= 6) {
      KniffelUp = 0;
    }
    await Sleep(50);
  }
}

let EZ1 = document.getElementById("KErgebnis1");
let EZ2 = document.getElementById("KErgebnis2");
let EZ3 = document.getElementById("KErgebnis3");
let EZ4 = document.getElementById("KErgebnis4");
let EZ5 = document.getElementById("KErgebnis5");


async function Stop()
{
  console.log("Stop();");
  if (welcherSpieler == 1) {
  let timer = 0;
  WStop1 = true;
  Ergebnis[0] = EZ1.value;
  timer = await Random(1000);
  await Sleep(timer);
  Ergebnis[1] = EZ2.value;
  WStop2 = true;
  timer = await Random(1000);
  await Sleep(timer);
  Ergebnis[2] = EZ3.value;
  WStop3 = true;
  timer = await Random(1000);
  await Sleep(timer);
  Ergebnis[3] = EZ4.value;
  WStop4 = true;
  timer = await Random(1000);
  await Sleep(timer);
  Ergebnis[4] = EZ5.value;
  WStop5 = true;

  console.log(Ergebnis);

  $("#savenum").show();
  $("#relnum").show();
  $("#savenum2").show();

  }

  $("#WürfelButton").show();
  $("#StopButton").hide();
  await Sleep(100);
  //document.getElementById("WürfelButton").setAttribute("disabled", "");
  WStop1 = false; WStop2 = false; WStop3 = false; WStop4 = false; WStop5 = false;

  await Auswahl();
  await Auswerten();
  await FFH();

}


function Save1f()
{
  Save1 = true;
  let pop = document.getElementById("KErgebnis1").value;
  document.getElementById("KErgebnis1").setAttribute("style", "color: #f70000;");
}


function Save2f()
{
   Save2 = true;
  document.getElementById("KErgebnis2").setAttribute("style", "color: #f70000;");
}


function Save3f()
{
  Save3 = true;
  document.getElementById("KErgebnis3").setAttribute("style", "color: #f70000;");
}


function Save4f()
{
  Save4 = true;
  document.getElementById("KErgebnis4").setAttribute("style", "color: #f70000;");
}


function Save5f()
{
  Save5 = true;
  document.getElementById("KErgebnis5").setAttribute("style", "color: #f70000;");
}

function Release1f()
{
  Save1 = false;
  let pop = document.getElementById("KErgebnis1").value;
  document.getElementById("KErgebnis1").removeAttribute("style");
}


function Release2f()
{
   Save2 = false;
  document.getElementById("KErgebnis2").removeAttribute("style");
}


function Release3f()
{
  Save3 = false;
  document.getElementById("KErgebnis3").removeAttribute("style");
}


function Release4f()
{
  Save4 = false;
  document.getElementById("KErgebnis4").removeAttribute("style");
}


function Release5f()
{
  Save5 = false;
  document.getElementById("KErgebnis5").removeAttribute("style");
}

const BT1 = document.getElementById("Button1");
const BT2 = document.getElementById("Button2");
const BT3 = document.getElementById("Button3");
const BT4 = document.getElementById("Button4");
const BT5 = document.getElementById("Button5");
const BT6 = document.getElementById("Button6");
const BTDP = document.getElementById("ButtonDreierPasch");
const BTVP = document.getElementById("ButtonViererPasch");
const BTFH = document.getElementById("ButtonFullHouse");
const BTKS = document.getElementById("ButtonKleineStraße");
const BTGS = document.getElementById("ButtonGroßeStraße");
const BTK = document.getElementById("ButtonKniffel");
const BTC = document.getElementById("ButtonChance");

const Z1 = document.getElementById("Zahl1");
const Z2 = document.getElementById("Zahl2");
const Z3 = document.getElementById("Zahl3");
const Z4 = document.getElementById("Zahl4");
const Z5 = document.getElementById("Zahl5");
const Z6 = document.getElementById("Zahl6");
const DP = document.getElementById("Dreierpasch");
const VP = document.getElementById("Viererpasch");
const FH = document.getElementById("FullHouse");
const KS = document.getElementById("KleineStraße");
const GS = document.getElementById("GroßeStraße");
const K = document.getElementById("Kniffel");
const C = document.getElementById("Chance");

const Zahl1SP1 = document.getElementById("Zahl1SP1");
const Zahl1SP2 = document.getElementById("Zahl1SP2");
const Zahl2SP1 = document.getElementById("Zahl2SP1");
const Zahl2SP2 = document.getElementById("Zahl2SP2");
const Zahl3SP1 = document.getElementById("Zahl3SP1");
const Zahl3SP2 = document.getElementById("Zahl3SP2");
const Zahl4SP1 = document.getElementById("Zahl4SP1");
const Zahl4SP2 = document.getElementById("Zahl4SP2");
const Zahl5SP1 = document.getElementById("Zahl5SP1");
const Zahl5SP2 = document.getElementById("Zahl5SP2");
const Zahl6SP1 = document.getElementById("Zahl6SP1");
const Zahl6SP2 = document.getElementById("Zahl6SP2");
const gesSP1 = document.getElementById("gesSP1");
const gesSP2 = document.getElementById("gesSp2");
const BonSP1 = document.getElementById("BonSP1");
const BonSP2 = document.getElementById("BonSP2");
const gesOSP1 = document.getElementById("gesOSP1");
const gesOSP2 = document.getElementById("gesOSP2");
const DPSP1 = document.getElementById("DPSP1");
const DPSP2 = document.getElementById("DPSP2");
const VPSP1 = document.getElementById("VPSP1");
const VPSP2 = document.getElementById("VPSP2");
const FHSP1 = document.getElementById("FHSP1");
const FHSP2 = document.getElementById("FHSP2");
const KSSP1 = document.getElementById("KSSP1");
const KSSP2 = document.getElementById("KSSP2");
const KSP1 = document.getElementById("KSP1");
const KSP2 = document.getElementById("KSP2");
const CSP1 = document.getElementById("CSP1");
const CSP2 = document.getElementById("CSP2");
const gesUSP1 = document.getElementById("gesUSP1");
const gesUSP2 = document.getElementById("gesUSP2");
const ESSP1 = document.getElementById("ESSP1");
const ESSP2 = document.getElementById("ESSP2");

// let Block1SP1, Block1SP2, Block2SP1, Block2SP2, Block3SP1, Block3SP2, Block4SP1, BLock4SP2, Block5SP1, Block5SP2, Block6SP1, Block6SP2;

let Methode = 0;

async function Auswahl()
{
  if(Methode == 2)
  {
    if (Ergebnis.includes("1")) { Check(1) }
    if (Ergebnis.includes("2")) { Z2.innerHTML = "<font color =#51ff5a>2</font>"; Z2.setAttribute("onclick", "M22();"); }
    if (Ergebnis.includes("3")) { Z3.innerHTML = "<font color =#51ff5a>3</font>"; Z3.setAttribute("onclick", "M23();"); }
    if (Ergebnis.includes("4")) { Z4.innerHTML = "<font color =#51ff5a>4</font>"; Z4.setAttribute("onclick", "M24();"); }
    if (Ergebnis.includes("5")) { Z5.innerHTML = "<font color =#51ff5a>5</font>"; Z5.setAttribute("onclick", "M25();"); }
    if (Ergebnis.includes("6")) { Z6.innerHTML = "<font color =#51ff5a>6</font>"; Z6.setAttribute("onclick", "M26();"); }
  }
  else {
    if (Ergebnis.includes("1")) { BT1.setAttribute("class", "btn btn-success"); }
    if (Ergebnis.includes("2")) { BT2.setAttribute("class", "btn btn-success"); }
    if (Ergebnis.includes("3")) { BT3.setAttribute("class", "btn btn-success"); }
    if (Ergebnis.includes("4")) { BT4.setAttribute("class", "btn btn-success"); }
    if (Ergebnis.includes("5")) { BT5.setAttribute("class", "btn btn-success"); }
    if (Ergebnis.includes("6")) { BT6.setAttribute("class", "btn btn-success"); }
  }

}


function BTClear()
{
  if(Methode == 2)
  {
    if (Ergebnis.includes("1")) { Z1.innerHTML = "<font color =#f70000>1</font>"; Z1.removeAttribute("onclick"); if(Versuche == 0) { Z1.innerHTML = "<font color = #f70000>1</font>"; }}
    if (Ergebnis.includes("2")) { Z2.innerHTML = "<font color =#f70000>2</font>"; Z2.removeAttribute("onclick"); if(Versuche == 0) { Z1.innerHTML = "<font color = #f70000>2</font>"; }}
    if (Ergebnis.includes("3")) { Z3.innerHTML = "<font color =#f70000>3</font>"; Z3.removeAttribute("onclick"); if(Versuche == 0) { Z1.innerHTML = "<font color = #f70000>3</font>"; }}
    if (Ergebnis.includes("4")) { Z4.innerHTML = "<font color =#f70000>4</font>"; Z4.removeAttribute("onclick"); if(Versuche == 0) { Z1.innerHTML = "<font color = #f70000>4</font>"; }}
    if (Ergebnis.includes("5")) { Z5.innerHTML = "<font color =#f70000>5</font>"; Z5.removeAttribute("onclick"); if(Versuche == 0) { Z1.innerHTML = "<font color = #f70000>5</font>"; }}
    if (Ergebnis.includes("6")) { Z6.innerHTML = "<font color =#f70000>6</font>"; Z6.removeAttribute("onclick"); if(Versuche == 0) { Z1.innerHTML = "<font color = #f70000>6</font>"; }}
  }
  else {
    BT1.setAttribute("class", "btn btn-danger");
    BT2.setAttribute("class", "btn btn-danger");
    BT3.setAttribute("class", "btn btn-danger");
    BT4.setAttribute("class", "btn btn-danger");
    BT5.setAttribute("class", "btn btn-danger");
    BT6.setAttribute("class", "btn btn-danger");
    BTDP.setAttribute("class", "btn btn-danger");
    BTVP.setAttribute("class", "btn btn-danger");
    BTFH.setAttribute("class", "btn btn-danger");
    BTK.setAttribute("class", "btn btn-danger");
    BTC.setAttribute("class", "btn btn-danger");
    BTKS.setAttribute("class", "btn btn-danger");
    BTGS.setAttribute("class", "btn btn-danger");
  }

}

async function Auswerten()
{
  console.log("Auswerten();");
   ErgebnisEins = 0, ErgebnisZwei = 0, ErgebnisDrei = 0, ErgebnisVier = 0, ErgebnisFünf = 0, ErgebnisSechs = 0; //Reset
  await Ergebnis.sort();
  for (var i = 0; i < Ergebnis.length; i++) {
    switch (Ergebnis[i]) {
      case "1": await ErgebnisEins++; break;
      case "2": await ErgebnisZwei++; break;
      case "3": await ErgebnisDrei++; break;
      case "4": await ErgebnisVier++; break;
      case "5": await ErgebnisFünf++; break;
      case "6": await ErgebnisSechs++; break;
    }
  }

  /*
    if (ErgebnisEins <=3 || ErgebnisZwei <=3 || ErgebnisDrei <=3 || ErgebnisVier <=3 || ErgebnisFünf <=3 || ErgebnisSechs <=3) {
      document.getElementById("ButtonDreierPasch").setAttribute("class", "btn btn-success");
      DreiFrei = true;
    }
    if (ErgebnisEins <=3 || ErgebnisZwei <=3 || ErgebnisDrei <=3 || ErgebnisVier <=3 || ErgebnisFünf <=3 || ErgebnisSechs <=3) {
      document.getElementById("ButtonViererPasch").setAttribute("class", "btn btn-success");
    }
    if (await FH()==true) {
      document.getElementById("ButtonViererPasch").setAttribute("class", "btn btn-success");
    }
*/
}

async function FFH()
{
  EA = [ErgebnisEins, ErgebnisZwei, ErgebnisDrei, ErgebnisVier, ErgebnisFünf, ErgebnisSechs];
  EAN = [ErgebnisEins, ErgebnisZwei, ErgebnisDrei, ErgebnisVier, ErgebnisFünf, ErgebnisSechs];

  for (var i = 0; i < 10; i++) {
    if (EA.includes(0)) {
      EA = EA.slice(1);
      EA.sort();
      console.log(EA);
    }

    if (EA[0] == EA[1]) {
      EA = EA.slice(1);
      EA.sort();
      console.log(EA);
    }

  }

}


async function Dreierpasch()
{
  EA = [ErgebnisEins, ErgebnisZwei, ErgebnisDrei, ErgebnisVier, ErgebnisFünf, ErgebnisSechs];
  EA.sort();
  if (EA[0] == EA[1] && EA[1] == EA[2] || EA[1] == EA[2] && EA[2] == EA[3] || EA[2] == EA[3] && EA[3] == EA[4] || EA[3] == EA[4] && EA[4] == EA[5] || EA[4] == EA[5] && EA[5] == EA[6] ) {
    console.log("Dreierpasch!");
  }
}

async function Viererpasch()
{
  if (EA[0] == EA[1] && EA[1] == EA[2] && EA[2] == EA[3] || EA[1] == EA[2] && EA[2] == EA[3] && EA[3] == EA[4] || EA[2] == EA[3] && EA[3] == EA[4] && EA[4] == EA[5] || EA[3] == EA[4] && EA[4] == EA[5] && EA[5] == EA[6])
  {
    console.log("Viererpasch");
  }
}

function vorbei()
{
  document.getElementsByName("Feld").removeAttribute("onclick", "");
}

async function Check(Zahl)
{
  switch (Zahl) {
    case 1: Z1.innerHTML = "<font color =#51ff5a>1</font>"; Z1.setAttribute("onclick", "M21();"); break;

  }
}

async function M21()
{
  if(Versuche>=0)
  {
    if (welcherSpieler == 1)
    {
      Zahl1SP1.innerHTML = ErgebnisEins;
    }
    else
    {
      Zahl1SP2.innerHTML = ErgebnisEins;
    }
    selected();
  }


  }
  async function M22()
{
  if(Versuche>=0)
  {
    if (welcherSpieler == 1)
    {
      Zahl2SP1.innerHTML = ErgebnisZwei*2;
    }
    else
    {
      Zahl2SP2.innerHTML = ErgebnisZwei*2;
    }
    selected();
  }

}

async function M23()
{
  if(Versuche>=0)
  {
    if (welcherSpieler == 1)
    {
      Zahl3SP1.innerHTML = ErgebnisDrei*3;
    }
    else
    {
      Zahl3SP2.innerHTML = ErgebnisDrei*3;
    }
    selected();
  }

}

async function M24()
{
  if(Versuche>=0)
  {
    if (welcherSpieler == 1)
    {
      Zahl4SP1.innerHTML = ErgebnisVier*4;
    }
    else
    {
      Zahl4SP2.innerHTML = ErgebnisVier*4;
    }
    selected();
  }

}

async function M25()
{
  if(Versuche>=0)
  {
    if (welcherSpieler == 1)
    {
      Zahl5SP1.innerHTML = ErgebnisFünf*5;
    }
    else
    {
      Zahl5SP2.innerHTML = ErgebnisFünf*5;
    }
    selected();
  }

}

async function M26()
{
  if(Versuche>=0)
  {
    if (welcherSpieler == 1)
    {
      Zahl6SP1.innerHTML = ErgebnisSechs*6;
    }
    else
    {
      Zahl6SP2.innerHTML = ErgebnisSechs*6;
    }
    selected();
  }
}

function selected()
{
  Zahl1.removeAttribute("onclick"); Zahl2.removeAttribute("onclick"); Zahl3.removeAttribute("onclick"); Zahl4.removeAttribute("onclick"); Zahl5.removeAttribute("onclick"); Zahl6.removeAttribute("onclick");
  Zahl1.innerHTML = "<font color =#f70000>1</font>" ; Z2.innerHTML = "<font color =#f70000>2</font>"; Z3.innerHTML = "<font color =#f70000>3</font>"; Z4.innerHTML = "<font color =#f70000>4</font>"; Z5.innerHTML = "<font color =#f70000>5</font>"; Z6.innerHTML = "<font color =#f70000>6</font>";
}


function NoVersuche()
{
  console.log("NoVersuche();")
  Z1.innerHTML = "<font color =#f70000>1</font>";
  Z2.innerHTML = "<font color =#f70000>2</font>";
  Z3.innerHTML = "<font color =#f70000>3</font>";
  Z4.innerHTML = "<font color =#f70000>4</font>";
  Z5.innerHTML = "<font color =#f70000>5</font>";
  Z6.innerHTML = "<font color =#f70000>6</font>";
}


// async function M2Click()
// {
//   const m2z1 = document.getElementById("Zahl1");
//   const m2z2 = document.getElementById("Zahl2");
//   const m2z3 = document.getElementById("Zahl3");
//   const m2z4 = document.getElementById("Zahl4");
//   const m2z5 = document.getElementById("Zahl5");
//   const m2z6 = document.getElementById("Zahl6");
//
//   if (m2z1.contains('<font color="#51ff5a">1</font>');) {
//
//   }
//
// }

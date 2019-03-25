let Würfel1;
let Würfel2;
let Würfel3;
let Würfel4;
let Würfel5;
let Würfel6;
const CWürfe = 3;
let ClockDisW1 = 0;
let ClockDisW2 = 0;
let ClockDisW3 = 0;
let ClockDisW4 = 0;
let ClockDisW5 = 0;
let ClockDisW6 = 0;



async function initKniffel() {

  HMScreen.innerHTML = '<div id="Add"><button type="button" class="btn btn-danger" id="W1" disabled>1</button> <button type="button" class="btn btn-danger" id="W2" disabled>2</button> <button type="button" class="btn btn-danger" id="W3" disabled>3</button> <button type="button" class="btn btn-danger" id="W4" disabled>4</button> <button type="button" class="btn btn-danger" id="W5" disabled>5</button> <button type="button" class="btn btn-danger" id="W6" disabled>6</button></div>';
  await Sleep(100);
  W1 = document.getElementById("W1");
  W2 = document.getElementById("W2");
  W3 = document.getElementById("W3");
  W4 = document.getElementById("W4");
  W5 = document.getElementById("W5");
  W6 = document.getElementById("W6");
}

async function ClockW1() {
  W1.innerText = "1";
  await Sleep(50);
  W1.innerText = "2";
  await Sleep(50);
  W1.innerText = "3";
  await Sleep(50);
  W1.innerText = "4";
  await Sleep(50);
  W1.innerText = "5";
  await Sleep(50);
  W1.innerText = "6";
  await Sleep(50);
}
async function ClockW2() {
  W2.innerText = "1";
  await Sleep(50);
  W2.innerText = "2";
  await Sleep(50);
  W2.innerText = "3";
  await Sleep(50);
  W2.innerText = "4";
  await Sleep(50);
  W2.innerText = "5";
  await Sleep(50);
  W2.innerText = "6";
  await Sleep(50);
}
async function ClockW3() {
  W3.innerText = "1";
  await Sleep(50);
  W3.innerText = "2";
  await Sleep(50);
  W3.innerText = "3";
  await Sleep(50);
  W3.innerText = "4";
  await Sleep(50);
  W3.innerText = "5";
  await Sleep(50);
  W3.innerText = "6";
  await Sleep(50);
}
async function ClockW4() {
  W4.innerText = "1";
  await Sleep(50);
  W4.innerText = "2";
  await Sleep(50);
  W4.innerText = "3";
  await Sleep(50);
  W4.innerText = "4";
  await Sleep(50);
  W4.innerText = "5";
  await Sleep(50);
  W4.innerText = "6";
  await Sleep(50);
}
async function ClockW5() {
  W5.innerText = "1";
  await Sleep(50);
  W5.innerText = "2";
  await Sleep(50);
  W5.innerText = "3";
  await Sleep(50);
  W5.innerText = "4";
  await Sleep(50);
  W5.innerText = "5";
  await Sleep(50);
  W5.innerText = "6";
  await Sleep(50);
}
async function ClockW6() {
  W6.innerText = "1";
  await Sleep(50);
  W6.innerText = "2";
  await Sleep(50);
  W6.innerText = "3";
  await Sleep(50);
  W6.innerText = "4";
  await Sleep(50);
  W6.innerText = "5";
  await Sleep(50);
  W6.innerText = "6";
  await Sleep(50);
}

function Clock() {
   if(ClockDisW1 == 0)
  {
    ClockW1();
  }
   if (ClockDisW2 == 0)
  {
    ClockW2();
  }
  if (ClockDisW3 == 0)
  {
    ClockW3();
  }
  if (ClockDisW4 == 0)
  {
    ClockW4();
  }
  if (ClockDisW5 == 0)
  {
    ClockW5();
  }
  if (ClockDisW6)
  {
    ClockW6();
  }
    Clock();
}

function Würfeln() {
  Würfel1=Random(6);
  Würfel2=Random(6);
  Würfel3=Random(6);
  Würfel4=Random(6);
  Würfel5=Random(6);
  Würfel6=Random(6);
}

function DEBUG6() {
 Würfel1 = 6;
 Würfel2 = 6;
 Würfel3 = 6;
 Würfel4 = 6;
 Würfel5 = 6;
 Würfel6 = 6;
}
function DEBUG5() {
 Würfel1 = 5;
 Würfel2 = 5;
 Würfel3 = 5;
 Würfel4 = 5;
 Würfel5 = 5;
 Würfel6 = 5;
}
function DEBUG4() {
 Würfel1 = 4;
 Würfel2 = 4;
 Würfel3 = 4;
 Würfel4 = 4;
 Würfel5 = 4;
 Würfel6 = 4;
}
function DEBUG3() {
 Würfel1 = 3;
 Würfel2 = 3;
 Würfel3 = 3;
 Würfel4 = 3;
 Würfel5 = 3;
 Würfel6 = 3;
}

function Auswerten() {
  console.log(Würfel1)
  console.log(Würfel2);
  console.log(Würfel3);
  console.log(Würfel4);
  console.log(Würfel5);
  console.log(Würfel6);
  // if (Würfel1 && Würfel2 && Würfel3 && Würfel4 && Würfel5 && Würfel6 == 1) {
  //   console.log("Alle auf 1");
  // }
  // else if (Würfel1 && Würfel2 && Würfel3 && Würfel4 && Würfel5 && Würfel6 == 2) {
  //   console.log("Alle auf 2");
  // }
  // else if (Würfel1 && Würfel2 && Würfel3 && Würfel4 && Würfel5 && Würfel6 == 3) {
  //   console.log("Alle auf 3");
  // }
  // else if (Würfel1 && Würfel2 && Würfel3 && Würfel4 && Würfel5 && Würfel6 == 4) {
  //   console.log("Alle auf 4");
  // }
  // else if (Würfel1 && Würfel2 && Würfel3 && Würfel4 && Würfel5 && Würfel6 == 5) {
  //   console.log("Alle auf 5");
  // }
  // else if (Würfel1 && Würfel2 && Würfel3 && Würfel4 && Würfel5 && Würfel6 == 6) {
  //   console.log("Alle auf 6");
  // }
  //
  //
  // else if (Würfel1 && Würfel2 && Würfel3 && Würfel4 && Würfel5 && Würfel6 == 6) {
  //   console.log("Alle auf 6");
  // }
  if( gleich(Würfel1,Würfel2,Würfel3,Würfel4,Würfel5,Würfel6) )
{
  switch (Würfel1) {
    case 1: W1.removeAttribute("disabled"); W1.setAttribute("class", "btn btn-success"); break;
    case 2: W2.removeAttribute("disabled"); W2.setAttribute("class", "btn btn-success"); break;
    case 3: W3.removeAttribute("disabled"); W3.setAttribute("class", "btn btn-success"); break;
    case 4: W4.removeAttribute("disabled"); W4.setAttribute("class", "btn btn-success"); break;
    case 5: W5.removeAttribute("disabled"); W5.setAttribute("class", "btn btn-success"); break;
    case 6: W6.removeAttribute("disabled"); W6.setAttribute("class", "btn btn-success"); break;
  }
}
  }

async function testKniffel() {
  await initKniffel();
  await Würfeln();
  await Auswerten();
}


function gleich(){
   var len = arguments.length;
   for (var i = 1; i< len; i++){
      if (arguments[i] === null || arguments[i] !== arguments[i-1])
         return false;
   }
   return true;
}

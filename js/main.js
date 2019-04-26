const PromiseFtp = require('promise-ftp');
const ftp = new PromiseFtp();
const JSAlert = require("js-alert");
const $ = require('jquery');

const ping = require('ping');


var useJSON = false;
//import $ from 'jquery';
//import jQuery from 'jquery';
const jQuery = require('jquery');
window.$ = $;
window.jQuery = jQuery;
const os = require('os');
const ifaces = os.networkInterfaces();
const md5 = require('js-md5');
//const ReverseMd5 = require('reverse-md5');
//const ini = require('ini');

// var reversemd5 = ReverseMd5({
// 	lettersUpper: true,
// 	lettersLower: true,
// 	numbers: true,
// 	special: true,
// 	whitespace: true,
// 	maxLen: 30
// });

var fs = require('fs'),
	path = require('path');


async function OnlineServer() {
	let qqq = await ping.promise.probe("prow.li");
	if (qqq.avg == "unknown") {
		let al = new JSAlert("Es konnte keine Verbindung zum Server hergestellt werden!\n\nBitte versuche es nochmal oder verwende den OFFLINE-MODUS", "Fehler!");
		al.addButton("Erneut versuchen").then(function() {
			location.reload();
		});
		al.addButton("OFFLINE").then(function() {
			OfflineModus();
		});
		al.show();
	}
}


function ftpowo() {
	ftp.connect({host: "localhost", user: "UnoUser", password: ""})
	  .then(function (serverMessage) {
	    console.log('Server message: '+serverMessage);
	    return ftp.list('/');
	  }).then(function (list) {
	    console.log('Directory listing:');
	    console.dir(list);
	    return ftp.end();
	  });
}

function ftplogin()
{
	return ftp.connect({host: "localhost", user: "UnoUser", password: ""});
	ftpping();
}

function ftpowo() {
	ftp.connect({host: "localhost", user: "UnoUser", password: ""})
	  .then(function (serverMessage) {
	    //console.log('Server message: '+serverMessage);
	    return ftp.list('/');
	  }).then(function (list) {
	    console.log('Directory listing:');
	    console.dir(list);
	    return ftp.end();
	  });
}

function UnoFTP(Befehl, Parameter) {
	switch (Befehl) {
		case "connect": return ftp.connect({host: "localhost", user: "UnoUser", password: ""}); break;
		case "list": return ftp.list(Parameter); break;
		case "delete": return ftp.delete(Parameter); break;
		// case "download": UnoFTPdownload(Parameter); break;
		case "disconnect": return ftp.end(); break;
		case "upload": return UnoFTPupload(Parameter); break;
		case "": return 0; break;
		case "": return 0; break;
	}
}

function move() {
  var elem = document.getElementById("myBar");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}
function PrepareFirstUse() {
	con.connect(function(err) {
	  if (err) throw err;
	  console.log("MySQL: Connected to localhost!");
	  con.query("CREATE DATABASE IF NOT EXISTS abschlussprojekt;", function (err, result) {
	    if (err) throw err;
	    console.log(result);
	  });
	});
	document.getElementById("FirstLoadLog").innerHTML += "<br> Datenbank erstellt..."
}


// function UnoFTPdownload(user)
// {
// 	return ftp.get("/FTP/"+user+"/Uno.dat").then(function(stream)
// {
// 	return new Promise(function (resolve, reject)) {
// 		stream.once("close", resolve);
// 		stream.once("error", reject);
// 		//stream.pipe(fs.createWriteStream(""))
// 	});
// 	}
// }



function ftpping() {
	var minutes = 1, the_interval = minutes * 60 * 1000;
	setInterval(function() {
	console.log("Ping...");
	return ftp.list("/");
}, the_interval);
}


var cmd=require('node-cmd');
function phptest()
{


execPhp('index.php', function(error, php, outprint){
    // outprint is now `One'.

    php.my_function(1, 2, function(err, result, output, printed){
        // result is now `3'
        // output is now `One'.
        // printed is now `Two'.
    });
});
}

const runner = require('child_process');

function php2(Befehl)
{
	cmd.get(
        'cd php && php.exe ../phpskripte/index.php '+Befehl,
        function(err, data, stderr){
            console.log(data)
        }
    );
}

const IPAdresse = testObjectIP()[1];
const Kernel = os.type;
const Arch = os.arch;
const Benutzername = os.userInfo().username;
const CPU = os.cpus()[0].model;
const CPUKerne = os.cpus().length

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();
// increase the limit
myEmitter.setMaxListeners(100);
function testObjectIP()
{
  var result = [];
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
      //result = ifname+" "+ " "+iface.address;
      result[0] = ifname;
      result[1] = iface.address;
     } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      //result = ifname+" "+ " "+iface.address;
      result[0] = ifname;
      result[1] = iface.address;
    }
    ++alias;
  });
});
return result;
}
var ui = "";
let fuseIPtest = false;
function IPtest() {
	if (fuseIPtest) {
		console.error("Wurde schon ausgeführt");
		return;
	}
	fuseIPtest = true;
	var result = [];
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;


	ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
			ui+=ifname + " "+iface.address + "\n";
			console.warn(ui);
     } else {
      console.log(ifname, iface.address);
			ui+=ifname + " "+iface.address + "\n";
			console.warn(ui);
    }
    ++alias;
  });
	document.getElementById("TableIP").title = ui;
});
}
// function Load3() {
//   console.warn("Load3");
//   if (DarkMode) {
//     if (lightOrDark(DunklerModusFarbe) == "dark") {
//       console.log("Dunkles Theme. Schrift wird heller...");
//       document.getElementById("html").setAttribute("style", "background-color: "+DunklerModusFarbe+"; color: white;");
//       document.body.setAttribute("style", "background-color: "+DunklerModusFarbe+"; color: white;");
//       row2 = document.getElementById("table").getElementsByTagName("td");
//
//
//        for (let i = 0; i <= document.getElementsByTagName("td").length; i++) {
//          console.log(document.getElementsByTagName("td"));
//          document.getElementsByTagName("td")[i].style.borderColor = "white";
//          console.log("Weiß");
//       }
//     }
//
//     else {
//       document.getElementById("html").setAttribute("style", "background-color: "+DunklerModusFarbe+";");
//       document.body.setAttribute("style", "background-color: "+DunklerModusFarbe+";");
//       if (row2 === undefined) {
//         console.warn("ROW2 existiert nicht!");
//       }
//       else {
//         for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
//           document.getElementsByTagName("td")[i].style.borderColor = "black";
//           //console.log("Schwarz");
//         }
//       }
//     }
//   }
// }

const SD = document.getElementById("SD");

var isRainbow = false;

async function updaterainbow(isRainbow)
{
  console.error(isRainbow);
  if (isRainbow) {
    console.warn("Rainbow wurde gesetzt");
    document.head.innerHTML+= "<link id='rainbowlink' rel='stylesheet' href='./css/rainbow.css'>";
  }
  else {
    console.warn("Rainbow wurde nicht gesetzt");
  }
}

async function toggleRainbow()
{
  if (!isRainbow) {
    document.head.innerHTML+= "<link id='rainbowlink' rel='stylesheet' href='./css/rainbow.css'>";
    isRainbow = true;
  }
  else {
    $("#rainbowlink").remove();
    isRainbow = false;
  }
  Save();
}


$(window).scroll(function(){
  console.log("Hewwo");
  if(isMyStuffScrolling()){
    //There is a scroll bar here!
  }
});

function isMyStuffScrolling() {
  var docHeight = $(document).height();
  var scroll    = $(window).height() + $(window).scrollTop();
  return (docHeight == scroll);
  console.log("Hewwo");
}


$("UnoScreen").hide();
$("BJScreen").hide();

const crypto = require("crypto"),
      algorithm = 'aes-256-ctr',
      password = 'd6F3Efeq';

// async function Verschlüsseln()
// {
//   return crypto.createHash('md5').update(passwd).digest("hex");
//
// }

function Verschlüsseln(buffer){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
  return crypted;
}

function Entschlüsseln(buffer){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
  return dec;
}


async function AlleFreigeben()
{
  // await dat("UPDATE INUSE SET server1 = FALSE;"); await dat("UPDATE server1 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE;");
  // await dat("UPDATE INUSE SET server2 = FALSE;"); await dat("UPDATE server2 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE;");
  // await dat("UPDATE INUSE SET server3 = FALSE;"); await dat("UPDATE server3 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE;");
  // await dat("UPDATE INUSE SET server4 = FALSE;"); await dat("UPDATE server4 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE;");
  // await dat("UPDATE INUSE SET server5 = FALSE;"); await dat("UPDATE server5 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE;");
	for (var i = 0; i <= 5; i++) {
		await Freigeben(i);
	}
  console.warn("Alle Server wurden wieder freigegeben!");
}

//await dat("UPDATE Server1 SET Spieler1Karten = '"+Spieler1Karten.toString()+"', Spieler1KartenFarbe = '"+Spieler1KartenFarbe.toString()+"', Spieler2Karten = '"+Spieler2Karten.toString()+"', Spieler2KartenFarbe = '"+Spieler2KartenFarbe.toString()+"';");

// await dat("INSERT INTO Server1 (Spieler1Karten, Spieler1KartenFarbe, Spieler2Karten, Spieler2KartenFarbe) VALUES ('"+Spieler1Karten+"', '"+Spieler1KartenFarbe+"', '"+Spieler2KartenFarbe+"');");
// await dat("INSERT INTO Server1 (Spieler1Karten, Spieler1KartenFarbe) VALUES ('10,5,7,3', 'BLAU,GELB,GRÜN,ROT')");

//CREATE TABLE IF NOT EXISTS Server1 (Spieler1Karten VARCHAR(255), Spieler1KartenFarbe VARCHAR(255), Spieler2Karten VARCHAR(255), Spieler2KartenFarbe VARCHAR(255));

//await dat("INSERT INTO Server1 ('Spieler1Karten', 'Spieler1KartenFarbe') VALUES ('"+Spieler1Karten.ToString();+", "+Spieler1KartenFarbe.ToString();"+;')");

var isKniffel = true;

async function Save(Farbe) {
  //if (!settingsSQL) {
    fs.writeFileSync('./js/dark.txt', DarkMode, (err) => {
    if (err) throw err;
    console.log('Modus saved!');
    });
    fs.writeFileSync('./js/rainbow.txt', isRainbow, (err) => {
    if (err) throw err;


    console.log('Rainbow saved!');
    });

    if (Farbe) {
      fs.writeFileSync('./js/darkFarbe.txt', document.getElementById("foo").value, (err) => {
      if (err) throw err;
      console.log('Farbe saved!');
      });
    }
//--------------------------

  // else {
  //   await dat("TRUNCATE TABLE settings");
  //   await dat("INSERT INTO settings (DarkMode,Farbe) VALUES ('"+DarkMode+"','"+document.getElementById("foo").value+"');");
  //   await dat("COMMIT;")
  // }
 }


let Settings = {
	"DarkMode":"false",
	"DarkModeFarbe":"#000000",
	"SP1Name": "Spieler1",
	"SP2Name": "Spieler2",
	"isRainbow": "false"
};

 async function Savealt(Farbe) {
   Settings.DarkModeFarbe = document.getElementById("foo").value;
	 Settings.SP1Name = Benutzername;
	 Settings.isRainbow = isRainbow;
	 Settings.DarkMode = DarkMode;
	 console.warn("SPEICHERN");
     fs.writeFileSync('./js/settings.JSON', JSON.stringify(Settings), (err) => {
     if (err) throw err;
     console.log('Modus saved!');
	 });
  }

function checkForFile(fileName)
{
	fs.exists(fileName, function (exists)
	{
		if(exists)
	    {

	    }
			else
	   	{
	       fs.writeFile(fileName, "", function (err, data)
	      {

	      })
	    }
	 });
}


async function Loadalt()
{
	await checkForFile("./js/settings.JSON")
	  if (location.href.includes("index.html"))
		{
	     generateTable();
	     console.log("Tabelle generieren...");
	  }

	      filePath = path.join(__dirname, './js/settings.JSON');
	      console.log("Einstellungen lesen...");

	      fs.readFileSync(filePath, {encoding: 'utf-8'}, async function(err,fileSettings)
				{
					fileSettings = JSON.parse(fileSettings);
	          if (!err)
						{
	            //await entschlüsseln(); FUNKTIONIERT NICHT
	              console.log('Einstellungen: ' + fileSettings);
	              if (fileSettings.DarkModeFarbe.indexOf("#") > -1)
								{
	                Settings.DarkModeFarbe = Farbe;}
	              else
								{
	                Settings.DarkModeFarbe = "#"+Farbe;
	              }
	              console.log('Dunkler Modus: ' + fileSettings.DarkMode);
	              if (fileSettings.DarkMode == "true")
								{
	                Settings.DarkMode = true;
	              }
	              else if (fileSettings.DarkMode == "false")
								{
	                Settings.DarkMode = false;
	              }
	              else
								{
	                Settings.DarkMode = undefined;
	              }
	              Settings.DarkMode = fileSettings.DarkMode;

								console.log("RAINBOW? "+Settings.isRainbow);
								Settings.isRainbow = fileSettings.isRainbow;
								updaterainbow(Settings.isRainbow);
								if (Settings.DarkMode)
								{
									if (lightOrDark(Settings.DarkModeFarbe) == "dark")
									{
										console.log("Dunkles Theme. Schrift wird heller...");
										document.getElementById("html").setAttribute("style", "background-color: "+Settings.DarkModeFarbe+"; color: white;");
										document.body.setAttribute("style", "background-color: "+Settings.DarkModeFarbe+"; color: white;");
										row2 = document.getElementById("table").getElementsByTagName("td");
										for (let i = 0; i <= document.getElementsByTagName("td").length; i++)
										{
					 	         //console.log(document.getElementsByTagName("td"));
					 	         document.getElementsByTagName("td")[i].style.borderColor = "white";
					 	         console.log("Weiß");
					 	      	}
									}
									else
									{
										document.getElementById("html").setAttribute("style", "background-color: "+DunklerModusFarbe+";");
							      document.body.setAttribute("style", "background-color: "+DunklerModusFarbe+";");
										if (row2 == undefined) {
											console.warn("ROW2 EXISTIERT NICHT!");
										}
										else
										{
											for (var i = 0; i < document.getElementById("td").length; i++)
											{
												document.getElementById("td")[i].style.borderColor = "black";
											}
										}
									}
									Load2alt();
								}
								else
								{
									document.getElementById("html").removeAttribute("style");
							    document.body.removeAttribute("style");
								}
							}
	      });
	}

async function Load2alt()
{
	if (lightOrDark(DunklerModusFarbe) == "dark")
	{
		row2 = document.getElementById("table").getElementsByTagName("td");
		for (var i = 0; i < document.getElementsByTagName("td").length; i++)
		{
			document.getElementsByTagName("td")[i].style.borderColor = "white";
			console.log(document.getElementsByTagName("td").length);
		}
	}
	else
	{
		if (row2 == undefined)
		{
			console.warn("ROW2 EXISTIERT NICHT");
		}
		else
		{
			for (var i = 0; i < document.getElementsByTagName("td").length; i++)
			{
        document.getElementsByTagName("td")[i].style.borderColor = "black";
        console.log("Schwarz");
      }
		}
	}
}

var DarkMode = false;
var DunklerModusFarbe;

async function Load2()
{
  if (document.location.href.includes("index")) {
		if (lightOrDark(DunklerModusFarbe) == "dark") {
	    row2 = document.getElementById("table").getElementsByTagName("td");
	    for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
	      document.getElementsByTagName("td")[i].style.borderColor = "white";
	      console.log(document.getElementsByTagName("td").length);
	    }
	  }
	  else {
	    if (row2 == undefined) {
	      console.warn("ROW2 EXISTIERT NICHT");
	    }
	    else {
	      for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
	        document.getElementsByTagName("td")[i].style.borderColor = "black";
	        console.log("Schwarz");
	      }
	    }
	  }
  }

}

var loadset;

var haha;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////!bookmark!
async function Load()
{
	fs.existsSync("./js/settings.JSON", {flag: "wx"}, function(err, data)
	{
		if(exists)
		{
			callback();
		}
		else {
			fs.writeFileSync("./js/settings.JSON", {flag: "wx"}, function(err, data)
		{
			callback();
		});
		}
	});
  if (location.href.includes("index.html")) {
     await generateTable();
     console.log("Tabelle generieren...");
  }
  //if (!settingsSQL) {

      filePath = path.join(__dirname, './js/darkFarbe.txt');
      console.log("Farbe lesen...");

      fs.readFile(filePath, {encoding: 'utf-8'}, async function(err,Farbe){
          if (!err) {
            //await entschlüsseln(); FUNKTIONIERT NICHT
              console.log('DunklerModusFarbe: ' + Farbe);
              if (Farbe.indexOf("#") > -1) { // Ist # schon enthalten?
                DunklerModusFarbe = Farbe;
              }
              else {
                DunklerModusFarbe = "#"+Farbe;
              }
              }
          }
      );


      filePath = path.join(__dirname, './js/dark.txt');
      console.log("Modus lesen...");

      fs.readFile(filePath, {encoding: 'utf-8'}, async function(err,data){
          if (!err) {
            //await entschlüsseln(); FUNKTIONIERT NICHT
              console.log('Dunkler Modus: ' + data);
              if (data == "true") {
                data = true;
              }
              else if (data == "false") {
                data = false;
              }
              else {
                data = undefined;
              }
              DarkMode = data;
              }
          }
      );

      filePath = path.join(__dirname, './js/rainbow.txt');
      console.log("RAIIINBOOOOW?");

      fs.readFile(filePath, {encoding: 'utf-8'}, async function(err,data){
          if (!err) {
            console.warn("RAINBOW LESEN");
            //await entschlüsseln(); FUNKTIONIERT NICHT
              console.log('RAAAAINBOW?: ' + data);
              if (data == "true") {
                data = true;
              }
              else if (data == "false") {
                data = false;
              }
              else {
                data = undefined;
              }
              isRainbow = data;

              }
          }

      );
      await Sleep(10);
      updaterainbow(isRainbow);
    await Sleep(9);
    if (DarkMode) {
    if (lightOrDark(DunklerModusFarbe) == "dark") {
      console.log("Dunkles Theme. Schrift wird heller...");
      document.getElementById("html").setAttribute("style", "background-color: "+DunklerModusFarbe+"; color: white;");
      document.body.setAttribute("style", "background-color: "+DunklerModusFarbe+"; color: white;");
			if (document.location.href.includes("index")) {
				row2 = document.getElementById("table").getElementsByTagName("td");


	       for (let i = 0; i <= document.getElementsByTagName("td").length; i++) {
	         //console.log(document.getElementsByTagName("td"));
	         document.getElementsByTagName("td")[i].style.borderColor = "white";
	         console.log("Weiß");
	      }
			}
    }

    else
		{
      document.getElementById("html").setAttribute("style", "background-color: "+DunklerModusFarbe+";");
      document.body.setAttribute("style", "background-color: "+DunklerModusFarbe+";");
        if (document.location.href.includes("index")) {
					for (var i = 0; i < document.getElementsByTagName("td").length; i++)
					{
	          document.getElementsByTagName("td")[i].style.borderColor = "black";
	          //console.log("Schwarz");
	      	}
        }
    }
    Load2();




    // if (isKniffel == true) {
    //   // document.body.setAttribute("style", "color: #FFFFFF; background-color: #131313");
    //   // console.log("Dunkler Modus für Kniffel aktiviert");
    //   document.getElementById("html").setAttribute("style", "background-color: "+DunklerModusFarbe+";"); // 0c1830
    //   document.body.setAttribute("style", "background-color: "+DunklerModusFarbe+";");
    // }
  }
  else {
    document.getElementById("html").removeAttribute("style");
    document.body.removeAttribute("style");
  }
}

// try{
//
// var row2 = document.getElementById("table").getElementsByTagName("td");
//
// }catch(e){
//
// console.error(e);
// }



async function SwitchDark()
{
  if (DarkMode) {
    DarkMode = false;
    document.getElementById("SD").setAttribute("class", "btn btn-dark");
    document.getElementById("SD").innerHTML = "Dunkler Modus";
  }
  else {
    DarkMode = true;
    document.getElementById("SD").setAttribute("class", "btn btn-light");
    document.getElementById("SD").innerHTML = "Heller Modus";
  }
  await Sleep(10);
  await Save(false);
  await Load();
}

async function Datum()
{
  while(true)
  {
    await Sleep(1000);
    document.body.innerHTML = Date();
  }
}
function clear(lol)
{
  if (lol == undefined) {
    throw "Parameter mitgeben";
  }
  else {
    lol.innerHTML="";
  }
}


async function SaveState()
{

}

async function LoadState()
{

}

async function cryptotest(Message)
{

  console.log(CryptoJS.HmacSHA1(Message, "Key"));
}

function Sleep(millisekunden) {
  return new Promise(resolve => setTimeout(resolve, millisekunden));
}

async function Random(max)
{
  // var tmp2 = Math.round(Math.random() * ((max - 1) + 1) + 1);
  // switch (tmp2) {
  //   case 10: tmp2 = "FARBWUNSCH"; break;
  //   case 11: tmp2 = "NOKARTE"; break;
  //   case 12: tmp2 = "RICHTUNGSWECHSEL"; break;
  //   case 13: tmp2 = "+2"; break;
  //   case 14: tmp2 = "+4"; break;
  //   return tmp2;
  // }
  return Math.round(Math.random() * ((max - 1) + 1));
}

function RandomS(max)
{
  return Math.round(Math.random() * ((max - 1) + 1) + 1);
}

async function RandomFarbe(max)
{

  var tmp = Math.round(Math.random() * ((max - 1) + 1) + 1);
  switch (tmp) {
    case 1: tmp = "ROT"; break;
    case 2: tmp = "BLAU"; break;
    case 3: tmp = "GELB"; break;
    case 4: tmp = "GRÜN"; break;

  }
  //console.log(tmp);
  return tmp;

  // switch (Math.round(Math.random() * ((max - 1) + 1) + 1)) {
  //   case 1: return "ROT"; break;
  //   case 2: return "BLAU"; break;
  //   case 3: return "GELB"; break;
  //   case 4: return "GRÜN"; break;

  // }

}

//Emitter erhöhen, sonst Fehler



function Fehler(FehlerID)
{
  switch (FehlerID) {
    case 1: alert("Fehler!\nBJ: BJKarteLegen(); Karte nicht gefunden"); console.error("Fehler!\nBJ: BJKarteLegen(); Karte nicht gefunden");  break;
    case 2: alert("Fehler!\nAllgemein: DarkMode ist weder true noch false. DarkMode wird auf false gesetzt"); console.error("Fehler!\nAllgemein: DarkMode ist weder true noch false. DarkMode wird auf false gesetzt");  break;
    case 3: alert("Fehler!\nVerflixxt: Du hast eine ungültige Spieleranzahl angegeben! Es sind 2-4 Spieler möglich"); location.reload(); break;
  }
}


//Experiment


function length(str) {
  //Wie groß ist die Variable in Bytes?
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

function size(objekt)
{
  //Bessere Version
  return new Blob([objekt]).size;
}



/*
KOPIERT! NICHT MEINS
  |
  |
  |
  v

*/
function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5 && DarkMode == true) {

        return 'light';
    }
    else {

        return 'dark';
    }
}

/*

        ^
        |
        |
Kopiert, nicht meins

*/



//var Spielername = ["Spieler"     ,"Ven", "Martin",  "Güney"];
//var Spiel =       ["Spiel"       ,"Uno", "Kniffel", "BlackJack"];
//var Highscore =   ["Score"   ,"27",    "245",     "-1"];

var table = document.getElementById("table");

var gen = 2;
var settingsSQL = false;

async function switchToSQL()
{
  if (!settingsSQL) {
    if (confirm("Die Einstellungen werden zurzeit in einer Datei gespeichert. Möchten Sie die Einstellungen stattdessen in einer Datenbank speichern?")) {
      document.getElementById("SwitchButton").innerHTML = "Einstellungen werden in einer Datenbank gespeichert. Klicke, um zu ändern";
      document.getElementById("SwitchButton").setAttribute("class", "btn btn-success");
      settingsSQL = true;
    }
  }
  else {
    if (confirm("Die Einstellungen werden zurzeit in einer Datenbank gespeichert. Möchten Sie die Einstellungen stattdessen in einer Datei speichern?")) {
      document.getElementById("SwitchButton").innerHTML = "Einstellungen werden in einer Datei gespeichert. Klicke, um zu ändern";
      document.getElementById("SwitchButton").setAttribute("class", "btn btn-danger");
      settingsSQL = false;
    }
  }
  //await Sync();
  await Save();
  await Load();
}

async function Sync()
{
  // if (!settingsSQL) {
  //   var fs = require('fs'),
  //     path = require('path'),
  //     filePath = path.join(__dirname, './js/darkFarbe.txt');
  //     console.log("Farbe synchronisieren...");
  //
  //     fs.readFile(filePath, {encoding: 'utf-8'}, async function(err,Farbe){
  //         if (!err) {
  //           //await entschlüsseln(); FUNKTIONIERT NICHT
  //             console.log('DunklerModusFarbe: ' + Farbe);
  //             if (Farbe.indexOf("#") > -1) { // Ist # schon enthalten?
  //               DunklerModusFarbe = Farbe;
  //             }
  //             else {
  //               DunklerModusFarbe = "#"+Farbe;
  //             }
  //             }
  //         }
  //     );
  // }
}

var CONLOG = true;



async function generateTable()
{
  let highscoredata = [];
  //await Sleep(3000);
   highscoredata = await loadhighscore();
   while(highscoredata === undefined)
   {
     highscoredata = await loadhighscore();
     await Sleep(10);
   }
   //else {

    console.log(highscoredata);

    if (gen>0) {
      await Sleep(500);
      gen--;
      generateTable();
    }
    else {
      var Spielername = [];
      var Spiel = [];
      var Highscore = [];
      await Sleep(100);
      for (var i = 0; i < highscoredata.length; i++) {
        Spielername[i] = highscoredata[i].Name;
        Spiel[i] = highscoredata[i].Spiel;
        Highscore[i] = highscoredata[i].Highscore;
        if (CONLOG) {
          console.log("SpielerName: "+Spielername);
        }
      }

      console.log("Daten implementiert");
      let table = document.getElementById("table");
      document.getElementById("table").innerHTML = "";
      var row, SpielerID1 = [], SpielerName1 = [], SpielArt1 = [], Highscore1 = [];
      for( var i = Spielername.length-1; i>-1; i--)
      {
        //console.log(Spielername);
        //console.log(i);
        row = await table.insertRow(0); //TR Element Neue Spalte

        SpielerID1[i] = await row.insertCell(0); //SpielerID
        SpielerName1[i] = await row.insertCell(1); //SpielerName
        SpielArt1[i] = await row.insertCell(2); //Spiel
        Highscore1[i] = await row.insertCell(3); //Score

        SpielerID1[i].innerHTML = i;
        SpielerName1[i].innerHTML = Spielername[i];
        SpielArt1[i].innerHTML = Spiel[i];
        Highscore1[i].innerHTML = Highscore[i];

      }
      //console.log(SpielerName);
      row = await table.insertRow(0);
      var stdID = await row.insertCell(0); //SpielerID
      var stdSN = await row.insertCell(1); //SpielerName
      var stdSP = await row.insertCell(2); //Spiel
      var stdSC = await row.insertCell(3); //Score

      stdID.innerHTML = "ID";
      stdSN.innerHTML = "Spieler";
      stdSP.innerHTML = "Spiel";
      stdSC.innerHTML = "Score";
    }
   //}




  //table.rows[0].cells[0].setAttribute("onclick", "SortierenID();");
  //table.rows[0].cells[1].setAttribute("onclick", "SortierenHighscore();");
  //table.rows[0].cells[2].setAttribute("onclick", "SortierenSpieler();");
  //table.rows[0].cells[3].setAttribute("onclick", "SortierenSpiel();");
}

function Watch(Object, prototype) {
	if (!Object.prototype.watch) {
		Object.defineProperty(Object.prototype, "watch", {
			  enumerable: false
			, configurable: true
			, writable: false
			, value: function (prop, handler) {
				var
				  oldval = this[prop]
				, newval = oldval
				, getter = function () {
					return newval;
				}
				, setter = function (val) {
					oldval = newval;
					return newval = handler.call(this, prop, oldval, val);
				}
				;

				if (delete this[prop]) { // can't watch constants
					Object.defineProperty(this, prop, {
						  get: getter
						, set: setter
						, enumerable: true
						, configurable: true
					});
				}
			}
		});
	}
}

function Unwatch(Object, prototype) {
	// object.unwatch
	if (!Object.prototype.unwatch) {
		Object.defineProperty(Object.prototype, "unwatch", {
			  enumerable: false
			, configurable: true
			, writable: false
			, value: function (prop) {
				var val = this[prop];
				delete this[prop]; // remove accessors
				this[prop] = val;
			}
		});
	}
}

async function Freigeben(svr)
{
  switch (svr) {
		case 1: await dat("UPDATE INUSE SET server1 = FALSE;"); await dat("UPDATE server1 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE, Zug = 1;"); break;
		case 2: await dat("UPDATE INUSE SET server2 = FALSE;"); await dat("UPDATE server2 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE, Zug = 1;"); break;
		case 3: await dat("UPDATE INUSE SET server3 = FALSE;"); await dat("UPDATE server3 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE, Zug = 1;"); break;
		case 4: await dat("UPDATE INUSE SET server4 = FALSE;"); await dat("UPDATE server4 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE, Zug = 1;"); break;
		case 5: await dat("UPDATE INUSE SET server5 = FALSE;"); await dat("UPDATE server5 SET Spieler1Karten = '', Spieler1KartenFarbe = '', Spieler2Karten = '', Spieler2KartenFarbe = '', Spieler1Name = '', Spieler2Name = '', Spieler1IP = '', Spieler2IP = '', Kartenstapel = '', FULL = FALSE, EMPTY = TRUE, SP1Bereit = FALSE, SP2Bereit = FALSE, SP1left = FALSE, SP2left = FALSE, gestartet = FALSE, Zug = 1;"); break;
    default: Fehler(4); //Server konnte nicht freigegeben werden!

  }
  console.warn("Server "+svr+" wurde wieder freigegeben!");
}

function Eingabe(Name, SpielArt, HighscoreLUL)
{
  Spielername.push(Name);
  Spiel.push(SpielArt);
  Highscore.push(HighscoreLUL);
}

async function Senden(inputname,Spiel,score,welcherSpieler)
{
  if (welcherSpieler == 1) {
    score = Spieler2Karten.length;
  }
  else {
    score = Spieler1Karten.length;
  }
  await dat("INSERT INTO HIGHSCORE (Name,Spiel,Highscore) VALUES ('"+inputname+"','"+Spiel+"',"+score+");");
  JSAlert.alert("Vielen Dank, deine Daten wurden gesendet :3");
  location.reload();
}

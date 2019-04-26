const {app, BrowserWindow} = require ('electron');
const path = require('path');
const url = require('url');

//init win
let win;

function createWindow(){
  //BrowserFenster wird geöffnet
  win = new BrowserWindow({width:1920, height: 1080, icon:__dirname+'./img/Icon.png'});


    //Index.html wird geladen
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));

    //Dev-Tools öffnen
    //win.setMenu(null);
   win.webContents.openDevTools();
   win.maximize();

   win.on('closed', () => {
     win = null;
   });
}

//Starte create window funktion
app.on('ready', createWindow);

//Verlasse, wenn alle Fenster geschlossen sind
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
})

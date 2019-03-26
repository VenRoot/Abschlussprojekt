/**********************************************************
 * Hier sollte alles geladen werden und ausgeführt werden. *
 **********************************************************/

// dein blödes Jquery immer als erstes damit alles geht.
import $ from 'jquery'
import jQuery from 'jquery';
window.$ = $;
window.jQuery = jQuery;

import Color from 'jscolor'; // https://www.npmjs.com/package/jscolor

import 'bootstrap'; // https://github.com/twbs/bootstrap
import './lib/fullpage.min.js';
import './page';
import './Hauptmenü';
// import './mysql';
/**********************************
 * Begin Private Area for Module. *
 **********************************/

// @NOTE: This Section is shared through every Instance of this given class.
// - You have been warned. -

/*******************************
 * End Private Area for Module. *
 ********************************/

class MainClass {

  constructor() {
    /**
     * Kannst parameter definieren
     */
  }

  async main() {
    document.getElementById('usernamefeld').innerHTML += Benutzername;
    document.getElementById('Spieler1NameFeldHM').value = Benutzername;
    //await generateTable();
    await CPUTable();
    console.warn('CPUTable');
    $('#foo').hide();
    $('#Übernehmen').hide();
    await Load();
    console.warn('Load');
    await Load3();
    ServerTable();
    console.warn('ServerTable');
    console.warn('generateTable');
    await dat("SELECT * FROM users WHERE username = 'h';");
  }

}

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    new MainClass().main();
});

let Spieler = document.getElementById("Spieler");
let canvas2 = document.getElementById("Canvas");
const interact = require('interactjs');


// returns a window with a document and an svg root node
const window   = require('svgdom')
const SVG      = require('svg.js')(window)
const document = window.document

const obj = require('@svgdotjs/svg.js')
const SVG = (arg) => {
  return obj.SVG(arg)
}

Object.assign(SVG, obj)

// create svg.js instance
const canvas = SVG(document.documentElement)

// use svg.js as normal
canvas.rect(100,100).fill('yellow').move(50,50)

// get your svg as string
console.log(canvas.svg())
// or
console.log(canvas.node.outerHTML)



let startGame = false;

function start()
{
  startGame = true;
  $("#Lay").hide();
}

function ResetGame()
{
  if (startGame) {
    location.reload();
  }
}

if (SVG.supported) {
  var draw = SVG('drawing')
  var rect = draw.rect(100, 100)
} else {
  alert('SVG not supported')
}




interact('.draggable')
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

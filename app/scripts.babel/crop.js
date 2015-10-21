import {extend} from 'lodash';
import {logger, hide, show, center} from './utils.js';
import dom from './dom.js';
import css from './css.js';
import Draggable from './draggable.js';
import Resizeable from './resizeable.js';

const containerStyles = {

  position: 'absolute',
  backgroundColor: 'black',
  zIndex: 10000,
  top: 0,
  left: 0
}

const imageStyles = {

  position: 'absolute',
  top: 0,
  left: 0
}

let image = dom.img({style: css(extend({}, imageStyles, {opacity: 0.5}))});
let canvas = dom.canvas({style: css(imageStyles)});
let container = dom.div({style: css(containerStyles)}, [image, canvas]);

let context = canvas.getContext('2d');

let imageWidth = 0;
let imageHeight = 0;

let x = 0;
let y = 0;

let callback;

let resizeable = new Resizeable(canvas);
let drag = new Draggable(canvas);

resizeable.on('resize', ({width, height})=> resize(width, height));

drag.on('move', ({left, top})=> move(-left, -top));

canvas.addEventListener('dblclick', finish);


function move(_x, _y){

  x = _x;
  y = _y;

  draw();
}


function resize(width, height){

  canvas.width = width;
  canvas.height = height;

  draw();
}


function draw(){

  context.drawImage(image, x, y, imageWidth, imageHeight);
}


function finish(){

  callback(canvas.toDataURL('image/png'))

  hide(container);
}

export default function crop(url, fn){

  callback = fn

  image.src = url;

  show(container);

  image.onload = function(){

    imageWidth = this.width;
    imageHeight = this.height;

    container.style.width = imageWidth + 'px';
    container.style.height = imageHeight + 'px';

    let width = Math.min(imageWidth/2, 200);
    let height = Math.min(imageHeight/2, 200);

    resize(width, height);

    //drag.move((imageWidth - width)/2, (imageHeight - height)/2)
  }
}


document.body.appendChild(container);




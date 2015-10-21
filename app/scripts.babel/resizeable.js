import {EventEmitter} from 'events';
import {preventDefault} from './utils.js';

const {abs} = Math;

const offset = 50;

export default class Resizeable extends EventEmitter{

  constructor(el){

    super();

    let self = this;

    var width = 0;
    var height = 0;

    let startPageX = 0;
    let startPageY = 0;

    el.addEventListener('mousedown', preventDefault(start));
    window.addEventListener('mouseup', preventDefault(stop));

    let drag = preventDefault(function({pageY, pageX}){

      resize(width + pageX - startPageX, height + pageY - startPageY);
    })

    function start(ev){

      let elRect = el.getBoundingClientRect();
      let bodyRect = document.body.getBoundingClientRect();

      width = elRect.width;
      height = elRect.height;

      startPageX = ev.pageX;
      startPageY = ev.pageY;

      let diffX = abs(startPageX - (elRect.left - bodyRect.left + width));
      let diffY = abs(startPageY - (elRect.top - bodyRect.top + height));

      if(diffX < offset && diffY < offset){

        ev.stopImmediatePropagation();
        window.addEventListener('mousemove', drag, true);
      }
    }

    function stop(){

      window.removeEventListener('mousemove', drag, true);
    }


    function resize(width, height){

      el.width = width;
      el.height = height;

      self.emit('resize', {width, height})
    }

  }
}
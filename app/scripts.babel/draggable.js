import {EventEmitter} from 'events';
import {preventDefault} from './utils.js';

export default class Draggable extends EventEmitter{

  constructor(el){

    super();

    let self = this;

    this.el = el;

    let startPageX = 0;
    let startPageY = 0;
    let top = 0;
    let left = 0;


    let drag = preventDefault(function({pageY, pageX}){

      self.move(top + pageY - startPageY, left + pageX - startPageX);
    })

    el.style.position = 'absolute';

    window.addEventListener('mouseup', preventDefault(stop));
    el.addEventListener('mousedown', preventDefault(start));
    el.addEventListener('keydown', preventDefault(keydown))


    function start(ev){

      top = el.offsetTop;
      left = el.offsetLeft;
      startPageX = ev.pageX;
      startPageY = ev.pageY;

      el.focus();

      window.addEventListener('mousemove', drag, true);
    }

    function stop(){

      window.removeEventListener('mousemove', drag, true);
    }

    function keydown(ev){

      const LEFT  = 37;
      const UP    = 38;
      const RIGHT = 39;
      const DOWN  = 40;

      let key = ev.which || ev.keyCode || 0;

      switch(key) {
        case UP:
          self.move(el.offsetTop - 1,  el.offsetLeft)
          break;
        case DOWN:
          self.move(el.offsetTop + 1,  el.offsetLeft)
          break;
        case LEFT:
          self.move(el.offsetTop, el.offsetLeft - 1)
          break;
        case RIGHT:
          self.move(el.offsetTop, el.offsetLeft + 1)
          break;
      }
    }
  }

  move(top, left, emit = true){

    this.el.style.top = top + 'px';
    this.el.style.left = left + 'px';

    if(emit) this.emit('move', {top, left});
  }
}




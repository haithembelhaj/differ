import dom from './dom.js'
import css from './css.js';

let body = document.body;
let html = document.documentElement;

let size = pageSize();

let styles = {
  position: 'absolute',
  cursor: 'move',
  mixBlendMode: 'difference'
}

export default class Differ{

  constructor(url){

    this.url = url;
    this.image = dom.img({src: url, style: css(styles)});

    console.log(size);

    this.image.tabIndex = '1';
    this.image.style.top = size.height / 2 + 'px';
    this.image.style.left = size.width / 2 + 'px';

    new Draggable(this.image);

    body.appendChild(this.image);
  }

  destroy(){

  }
}


class Draggable{


  constructor(el){

    this.el = el;

    let startPageX = 0;
    let startPageY = 0;
    let top = 0;
    let left = 0;

    let drag = preventDefault(function({pageY, pageX}){

      move(top + pageY - startPageY, left + pageX - startPageX);
    })


    el.style.position = 'absolute';

    el.addEventListener('mousedown', preventDefault(start));
    el.addEventListener('mouseup', preventDefault(stop));
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
          move(el.offsetTop - 1,  el.offsetLeft)
          break;
        case DOWN:
          move(el.offsetTop + 1,  el.offsetLeft)
          break;
        case LEFT:
          move(el.offsetTop, el.offsetLeft - 1)
          break;
        case RIGHT:
          move(el.offsetTop, el.offsetLeft + 1)
          break;
      }

    }


    function move(top, left){


      el.style.top = top + 'px';
      el.style.left = left + 'px';
    }

  }
}


function preventDefault(fn){

  return function(ev){

    ev.stopPropagation();
    ev.preventDefault();

    fn(ev);
  }
}

function pageSize(){

  return {
    height : Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ),
    width : Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth )
  }
}
import dom from './dom.js'
import css from './css.js';
import {center, preventDefault} from './utils.js';
import Draggable from './draggable.js';


let modes = ['exclusion', 'difference', 'multiply'];

let styles = {
  position: 'absolute',
  zIndex: 10000,
  cursor: 'move'
}

export default class Differ{

  constructor(url){

    this.url = url;
    this.image = dom.img({src: url, style: css(styles)});

    this.image.tabIndex = '1';

    this.mode = 0;

    this.drag = new Draggable(this.image);

    document.body.appendChild(this.image);

    center(this.image);

    this.changeBlend();

    this.image.addEventListener('keydown', (ev)=>{

      ev.preventDefault();

      let key = ev.which || ev.keyCode || 0;

      if(key === 77){

        this.changeBlend();
      }
    })

  }

  destroy(){

    this.drag.destroy();
  }

  changeBlend(){

    this.image.style.mixBlendMode = modes[this.mode++ % modes.length];
  }
}
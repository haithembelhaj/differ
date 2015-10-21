import dom from './dom.js';
import css from './css.js';
import {preventDefault, show, hide} from './utils.js';

const styles = {

  position: 'fixed',
  display: 'none',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: 9999,
  backgroundColor: 'rgba(0,0,0,0.7)'
}

let callback = null;

let reader = new FileReader();

let dropZone = dom.div({style: css(styles)});

dropZone.addEventListener('dragover', preventDefault(handleDragOver));
dropZone.addEventListener('drop', preventDefault(handleFileSelect));

document.body.appendChild(dropZone);

reader.onload = e => {

  callback(e.target.result);

}

export default function drop(fn){

  callback = fn;

  show(dropZone);
}

function handleFileSelect(ev){

  let files = ev.dataTransfer.files;

  reader.readAsDataURL(files[0]);

  hide(dropZone);
}

function handleDragOver(ev) {

  ev.dataTransfer.dropEffect = 'copy';
}
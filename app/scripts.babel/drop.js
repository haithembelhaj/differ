import dom from './dom.js';
import css from './css.js';

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

dropZone.addEventListener('dragover', stopPropagation(handleDragOver));
dropZone.addEventListener('drop', stopPropagation(handleFileSelect));

document.body.appendChild(dropZone);

reader.onload = e => callback(e.target.result)

export function activate(fn){

  callback = fn;

  dropZone.style.display = 'block';
}

function handleFileSelect(ev){

  let files = ev.dataTransfer.files;

  reader.readAsDataURL(files[0]);

  dropZone.style.display = 'none';
}

function handleDragOver(ev) {

  ev.dataTransfer.dropEffect = 'copy';
}


function stopPropagation(fn){

  return function(ev){

    ev.stopPropagation();
    ev.preventDefault();

    fn(ev);
  }
}
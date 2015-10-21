export function preventDefault(fn){

  return function(ev){

    ev.stopPropagation();
    ev.preventDefault();

    fn(ev);

    return false;
  }
}


export function instance(c){

  return function (...args){

    return new c(...args);
  }
}


export function logger(fn){

  return function(...args){

    console.log(fn.name, ...args)

    fn(...args);
  }
}

export function hide(el){

  el.style.display = 'none';
}

export function show(el){

  el.style.display = 'block';
}


export function center(el){

  let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  let bodyRect = document.body.getBoundingClientRect();
  let elRect = el.getBoundingClientRect();


  el.style.left = (w/2 - bodyRect.left - elRect.width/2) + 'px';
  el.style.top = (h/2 - bodyRect.top - elRect.height/2) + 'px';

  return el;
}
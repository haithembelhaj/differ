chrome.runtime.onMessage.addListener( () =>{

  import Differ from './differ.js';
  import drop from './drop.js';
  import crop from './crop.js';

  drop(url => crop(url, (image) => new Differ(image)));
})


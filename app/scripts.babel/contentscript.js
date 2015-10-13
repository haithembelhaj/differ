import Differ from './differ.js';
import * as drop from './drop.js';

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) =>{

  drop.activate((url)=>{

    new Differ(url);
  })
})


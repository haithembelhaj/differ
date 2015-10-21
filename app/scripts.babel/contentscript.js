import {instance} from './utils.js';
import Differ from './differ.js';
import drop from './drop.js';
import crop from './crop.js';

chrome.runtime.onMessage.addListener( () =>{

  drop(url => crop(url, (image) => new Differ(image)));
})


import * as _ from 'lodash';

export default function css(obj){

  return Object.keys(obj).reduce((result, key)=> `${result}${_.kebabCase(key)}: ${obj[key]};`, '')
}
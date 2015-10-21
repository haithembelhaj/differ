(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var _bind = Function.prototype.bind;
exports.preventDefault = preventDefault;
exports.instance = instance;
exports.logger = logger;
exports.hide = hide;
exports.show = show;
exports.center = center;

function preventDefault(fn) {

  return function (ev) {

    ev.stopPropagation();
    ev.preventDefault();

    fn(ev);

    return false;
  };
}

function instance(c) {

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new (_bind.apply(c, [null].concat(args)))();
  };
}

function logger(fn) {

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    console.log.apply(console, [fn.name].concat(args));

    fn.apply(undefined, args);
  };
}

function hide(el) {

  el.style.display = 'none';
}

function show(el) {

  el.style.display = 'block';
}

function center(el) {

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  var bodyRect = document.body.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();

  el.style.left = w / 2 - bodyRect.left - elRect.width / 2 + 'px';
  el.style.top = h / 2 - bodyRect.top - elRect.height / 2 + 'px';

  return el;
}

},{}]},{},[1]);

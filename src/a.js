(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.dll = factory());
}(this, (function () { 'use strict';

  var foo = "hello world!";

  var name = "rollup-v0.1";
  var version = "1.0.0";

  var cl = function cl() {
    console.log(foo);
    console.log("version:".concat(version));
    console.log("name:".concat(name));
  };
  var main = {
    cl: cl,
    foo: foo,
    version: version,
    name: name
  };

  var aa = "aa";
  window.main = main;
  var index = {
    main: main,
    aa: aa,
    cl: cl // vue: Vue

  };

  return index;

})));

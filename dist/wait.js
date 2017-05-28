/*!
* wait.js 2.1.0 - JavaScript library to easily delay and chain class functions.
*
* @author       maoosi <hello@sylvainsimao.fr>
* @homepage     https://github.com/maoosi/wait.js#readme
* @copyright    Copyright (c) 2017 maoosi <hello@sylvainsimao.fr>
* @license      MIT
* @version      2.1.0
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Wait=e()}(this,function(){"use strict";var t=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},e=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),n=function(){function n(){t(this,n),this.waitQueue=[],this.waitExecution=!1}return e(n,[{key:"handle",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return this.waitQueue.push({func:e,timeout:this._isAsyncFunc(e)?"async":n}),this.waitExecution||this._next(),t}},{key:"pause",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};return this.handle(t,n,e)}},{key:"_isAsyncFunc",value:function(t){return t.toString().search("done()")>-1}},{key:"_exec",value:function(t){var e=this;t.call(this,function(){e._next()})}},{key:"_next",value:function(){var t=this;if(this.waitQueue.length>0){this.waitExecution=!0;var e=this.waitQueue.shift(),n=e.func,i=e.timeout;"async"===i?this._exec(n):i!==!1?(this._exec(n),setTimeout(function(){t._next()},i)):(this._exec(n),this._next())}else this.waitExecution=!1}}]),n}(),i=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];return new(Function.prototype.bind.apply(n,[null].concat(e)))};return i});
//# sourceMappingURL=wait.js.map

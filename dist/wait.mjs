/*!
* wait.js 2.1.0 - JavaScript library to easily delay and chain class functions.
*
* @author       maoosi <hello@sylvainsimao.fr>
* @homepage     https://github.com/maoosi/wait.js#readme
* @copyright    Copyright (c) 2017 maoosi <hello@sylvainsimao.fr>
* @license      MIT
* @version      2.1.0
*/
var classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),Wait=function(){function t(){classCallCheck(this,t),this.waitQueue=[],this.waitExecution=!1}return createClass(t,[{key:"handle",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return this.waitQueue.push({func:e,timeout:this._isAsyncFunc(e)?"async":n}),this.waitExecution||this._next(),t}},{key:"pause",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};return this.handle(t,n,e)}},{key:"_isAsyncFunc",value:function(t){return t.toString().search("done()")>-1}},{key:"_exec",value:function(t){var e=this;t.call(this,function(){e._next()})}},{key:"_next",value:function(){var t=this;if(this.waitQueue.length>0){this.waitExecution=!0;var e=this.waitQueue.shift(),n=e.func,i=e.timeout;"async"===i?this._exec(n):i!==!1?(this._exec(n),setTimeout(function(){t._next()},i)):(this._exec(n),this._next())}else this.waitExecution=!1}}]),t}(),wait=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return new(Function.prototype.bind.apply(Wait,[null].concat(e)))};export default wait;
//# sourceMappingURL=wait.mjs.map

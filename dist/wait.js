/*!
* wait.js 1.0.0 - Javascript library to easily delay and chain functions.
* Copyright (c) 2017 maoosi <hello@sylvainsimao.fr> - https://github.com/maoosi/wait.js
* License: MIT
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Wait = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Wait = function () {
    function Wait() {
        classCallCheck(this, Wait);

        // initiate wait vars
        this.waitQueue = [];
        this.waitTimer = false;
        this.waitExecution = false;
    }

    createClass(Wait, [{
        key: 'handle',
        value: function handle(func) {
            var milliseconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // handle wait
            this.waitQueue.push({
                'func': func,
                'timeout': milliseconds
            });

            if (!this.waitExecution) {
                this.next();
            }
        }
    }, {
        key: 'next',
        value: function next() {
            var _this = this;

            // execute next
            if (this.waitQueue.length > 0) {
                var c = this.waitQueue.shift();
                var f = c['func'];
                var t = c['timeout'];

                if (t !== false) {
                    f();
                    this.waitExecution = true;
                    this.waitTimer = setTimeout(function () {
                        _this.next();
                    }, t);
                } else {
                    f();
                    this.waitExecution = false;
                    this.next();
                }
            }
        }
    }]);
    return Wait;
}();

return Wait;

})));

# Wait.js

🖇️ JavaScript library to easily delay and chain class functions.

[![Gemnasium](https://img.shields.io/gemnasium/maoosi/wait.js.svg)](https://github.com/maoosi/wait.js) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/maoosi/wait.js/master/LICENSE.md) [![GitHub release](https://img.shields.io/github/release/maoosi/wait.js.svg)](https://github.com/maoosi/wait.js) [![GitHub issues](https://img.shields.io/github/issues/maoosi/wait.js.svg)](https://github.com/maoosi/wait.js/issues)


## Installation

```bash
npm i wait.js --save
```


## Usage

Plug `wait.js` into your class:

```javascript
import Wait from 'wait.js'

class MyClass {
    // step-1. Instantiate Wait.js and return "this" from your constructor:
    constructor () {
        this.w = Wait()
        return this
    }

    // step-2. Encapsulate each chainable function into the .handle() function:
    foo () {
        return this.w.handle(this, () => {
            /* Code here */
        })
    }
    bar () {
        return this.w.handle(this, () => {
            /* Code here */
        })
    }

    // step-3. Add a .pause() feature to your class:
    wait (milliseconds) {
        return this.w.pause(this, milliseconds)
    }
}

// step-4. It just works! You can now chain and delay your class functions:
const c = new MyClass()
c.foo().wait(2000).bar().foo()
```


## Async functions

**Wait.js** also provides the ability to deal with async functions, by manually triggering the next execution:

```javascript
import Wait from 'wait.js'

class MyClass {
    //..

    async () {
        // step-1. Add a "done" parameter to the encapsulating function
        // step-2. Manually call .done() when your async function is done
        return this.w.handle(this, (done) => {
            done()
        })
    }

    //..
}

// step-3. It just works! You can now chain and delay async functions:
const c = new MyClass()
c.foo().wait(2000).async().bar()
```


## Contribution

```bash
npm run watch
npm run test
```


## License

[MIT](https://github.com/maoosi/wait.js/blob/master/LICENSE.md) © 2017 Sylvain Simao

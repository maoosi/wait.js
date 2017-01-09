# Wait.js

Javascript library to easily delay and chain functions.

## Installation

> WIP, not published yet

```bash
npm i wait.js --save
```

## Usage

Plug `wait.js` into your class:

```javascript
import Wait from 'wait.js'

export default class MyClass {

    constructor () {
        this.waitter = new Wait()
    }
    
    wait (milliseconds = 0) {
        this.waitter.handle(() => { /* Your code here */ }, milliseconds)
        return this
    }
    
    foo () {
        this.waitter.handle(() => { /* Your code here */ })
        return this
    }
    
    bar () {
        this.waitter.handle(() => { /* Your code here */ })
        return this
    }
    
}
```

It just works! You can now chain and delay your class methods:

```javascript
const myclass = new MyClass()

myclass
    .foo()
    .wait(2000)
    .bar()
    .wait(500)
    .bar()
    .foo()
    .wait(1000)
    .bar()
    // ..
```

## License

[MIT](https://github.com/maoosi/wait.js/blob/master/LICENSE.md) © 2017 Sylvain Simao

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

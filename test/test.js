import { strictEqual } from 'assert'
import Wait from '../'

// Testing Tracker
var mochaTracker = false


// Testing Class
class MyClass {
    constructor () {
        this.w = Wait()
        return this
    }
    foo () {
        return this.w.handle(this, () => {
            mochaTracker = 'foo'
        })
    }
    bar () {
        return this.w.handle(this, () => {
            mochaTracker = 'bar'
        })
    }
    async () {
        return this.w.handle(this, (done) => {
            mochaTracker = 'async'
            setTimeout(() => { done() }, 1000)
        })
    }
    wait (milliseconds) {
        return this.w.pause(this, milliseconds)
    }
}


// Tests
describe('Wait.js', () => {

    describe('Chainable functions', function () {

        this.timeout(5100)

        const myclass = new MyClass()
        myclass.foo().wait(2000).bar().wait(2000).async().foo()

        // Immediate call
        it('Should call foo() immediatly', () => {
            strictEqual(mochaTracker, 'foo')
        })

        // After 1.5sec
        it('Should wait() for 2s', (done) => {
            setTimeout(() => {
                strictEqual(mochaTracker, 'foo')
                done()
            }, 2000 - 500)
        })

        // After 2sec
        it('Should call bar() after 2s', (done) => {
            setTimeout(() => {
                strictEqual(mochaTracker, 'bar')
                done()
            }, 500)
        })

        // After 3.5sec
        it('Should wait() for 2s', (done) => {
            setTimeout(() => {
                strictEqual(mochaTracker, 'bar')
                done()
            }, 2000 - 500)
        })

        // After 4sec
        it('Should call async()', (done) => {
            setTimeout(() => {
                strictEqual(mochaTracker, 'async')
                done()
            }, 500)
        })

        // After 4.5sec
        it('Should not call foo() before async is done()', (done) => {
            setTimeout(() => {
                strictEqual(mochaTracker, 'async')
                done()
            }, 500)
        })

        // After 5sec
        it('Should call foo() after async is done()', (done) => {
            setTimeout(() => {
                strictEqual(mochaTracker, 'foo')
                done()
            }, 500)
        })

    })

})

class Wait {

    constructor () {
    // initiate wait vars
        this.waitQueue = []
        this.waitExecution = false
    }

    handle (context, func, milliseconds = false) {
    // handle wait
        this.waitQueue.push({
            'func': func,
            'timeout': this._isAsyncFunc(func) ? 'async' : milliseconds
        })

        if (!this.waitExecution) this._next()

        return context
    }

    pause (context, milliseconds, func = () => {}) {
    // handle wait pause
        return this.handle(context, func, milliseconds)
    }

    _isAsyncFunc (func) {
    // does function contains done()?
        return func.toString().search('done()') > -1
    }

    _exec (func) {
    // execute the function
        func.call(this, (() => { this._next() }))
    }

    _next () {
    // execute next
        if (this.waitQueue.length > 0) {
            this.waitExecution = true

            let c = this.waitQueue.shift()
            let f = c['func']
            let t = c['timeout']

            if (t === 'async') {
                this._exec(f)
            } else if (t !== false) {
                this._exec(f)
                setTimeout(() => { this._next() }, t)
            } else {
                this._exec(f)
                this._next()
            }
        } else {
            this.waitExecution = false
        }
    }

}

export default (...args) => { return new Wait(...args) }

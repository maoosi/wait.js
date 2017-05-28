# Changelog


## v3.0.0

- The `new` keyword is not required anymore. `new Wait()` changed to `Wait()`.
- The `.handle()` function now directly return the context passed as first parameter `.handle(this, () => {})`.
- New approach for delay/pause with `.pause(this, milliseconds)`.
- Async functions are now supported with `(done) => { done() }`.
- Dev workflow moved from `Gulp` to `Rollup`.
- Documentation enhancement.
- Automated tests added.


## v2.0.0

- First release

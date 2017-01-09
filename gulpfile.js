// imports

const pkg      = require('./package.json')
const del      = require('del')
const fs       = require('fs')
const gulp     = require('gulp')
const notifier = require('node-notifier')
const rollup   = require('rollup')
const babel    = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve  = require('rollup-plugin-node-resolve')

// error handler

const onError = function(error) {
    notifier.notify({
        'title': 'Error',
        'message': 'Compilation failure.'
    })

    console.log(error)
}

// clean

gulp.task('clean', () => {
    return del(
        'dist/**.js',
        '!dist'
    )
})

// attribution

const attribution =
`/*!
* wait.js ${ pkg.version } - ${ pkg.description }
* Copyright (c) ${ new Date().getFullYear() } ${ pkg.author } - ${ pkg.homepage }
* License: ${ pkg.license }
*/
`

// js

const read = {
    entry: 'src/wait.js',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs(),
        babel()
    ]
}

const write = {
    umd: {
        format: 'umd',
        exports: 'default',
        moduleName: 'Wait',
        banner: attribution,
        sourceMap: true
    },
    module: {
        format: 'es',
        banner: attribution
    }
}

gulp.task('js', () => {
    return rollup
    .rollup(read)
    .then(bundle => {
        // generate UMD and ES module from bundle
        const umd = bundle.generate(write.umd)
        const module = bundle.generate(write.module)

        // write JS files
        fs.writeFileSync(pkg.main, umd.code)
        fs.writeFileSync(pkg.module, module.code)

        // write sourcemap
        fs.writeFileSync('dist/maps/wait.js.map', umd.map.toString())
    })
    .catch(onError)
})

// watch

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['js'])
})

// build and default tasks

const exists = path => {
    try {
        return fs.statSync(path).isDirectory()
    } catch(error) {}

    return false
}

gulp.task('build', ['clean'], () => {
    // create dist directories
    if(!exists('dist')) fs.mkdirSync('dist')
    if(!exists('dist/maps')) fs.mkdirSync('dist/maps')

    // run the tasks
    gulp.start('js')
})

gulp.task('default', ['build', 'watch'])

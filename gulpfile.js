'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var testServer = require('karma').Server;
var BROWSER_SYNC_LOAD_DELAY = 1000;

gulp.task('default', ['nodemon'], function () {
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'server/server.js',
        ext: 'js json'
    })
    .on('start', function onStart() {
        if (!called) {
            called = true;
            cb();
            setTimeout(function initBrowserSync() {
                browserSync.init({
                    proxy: 'http://localhost:3000',
                    port: 4000
                });
                gulp.watch("client/**/*").on('change', browserSync.reload);
            }, BROWSER_SYNC_LOAD_DELAY);
        }
    })
    .on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, BROWSER_SYNC_LOAD_DELAY);
    });
});

gulp.task('test', function (done) {
    return new testServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function (done) {
    new Server({
       configFile: __dirname + '/karma.conf.js',
    }, done).start();
});

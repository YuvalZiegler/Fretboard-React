var gulp = require('gulp');
var mocha = require('gulp-mocha');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var handleErrors = require('../util/handleErrors');
var config = require('../config').test;
var gutil  = require('gulp-util');

gulp.task('mocha', function () {
    if ( config.runInBrowser ){
      gutil.log('Test set up to run in browser: ', gutil.colors.green("http://localhost:3000/runner.html") );
    } else {
      gutil.log(config.src, gutil.colors.green("Running Unit Tests") )
      return gulp.src(  config.src, {read: false})
            .pipe( mocha({reporter: config.reporter})) 
            .on('error',   handleErrors);
        
    }
});
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var handleErrors = require('../util/handleErrors');
var config = require('../config').test;
var gutil        = require('gulp-util');

gulp.task('mocha', function () {
    if(config.runInBrowser){
        gutil.log('Test set up to run in browser: ', gutil.colors.green("http://localhost:3000/tests.html") );
    } else {
      return gulp.src(config.src, {read: false})
                  .pipe(mocha({reporter: 'HTML'}))
                  .on('error', handleErrors);
    }
});
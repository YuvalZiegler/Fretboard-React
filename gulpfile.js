// Gulp dependencies
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');

var handleError = require('./gulp/handleError');

/** 
  Use Browserify to bundle up our tests.
  gulp test --watch --tests './tests/component_to_test.js'
  Thanks to - http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/ 
*/
gulp.task('test', function () {
    console.log("============= ",watchify.args ," =============")
    var componentToTestPath = gutil.env.tests || "./tests/test.js";
    var bundler = browserify(componentToTestPath, watchify.args);

    if(gutil.env.watch) {
        livereload.listen();
        bundler = watchify(bundler);
    }

    bundler.transform(reactify);

    var rebundle = function() {
        bundler.bundle()
            .on('error', handleError('Browserify'))
            .pipe(source(componentToTestPath))
            .pipe(gulp.dest('./.tmp/test.js'))
            .pipe(gulpif(gutil.env.watch, livereload()));
    };

    bundler.on('update', rebundle);

    return rebundle();
});
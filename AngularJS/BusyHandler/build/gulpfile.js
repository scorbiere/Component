var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

gulp.task('bundle-scripts', function () {
  var jsPath = {jsSrc:['../src/**/*module.js', '../src/**/*.js'], jsDest:'../output', destName:'busyHandler.js'};
  //normal file
  gulp.src(jsPath.jsSrc)
    .pipe(concat(jsPath.destName))
    .pipe(gulp.dest(jsPath.jsDest))
  //min file
  //gulp.src(jsPath.jsDest)
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(jsPath.jsDest));
});

// default gulp task
gulp.task('default', ['bundle-scripts'], function() {
  // watch for JS changes
  gulp.watch('../src/**/*.js', ['bundle-scripts']);
});
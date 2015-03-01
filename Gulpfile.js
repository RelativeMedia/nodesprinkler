'use strict';

var gulp = require('gulp'),
    util = require('gulp-util'),
    jshint = require('gulp-jshint'),
    // source = require('vinyl-source-stream'),
    // browserify = require('browserify'),
    // sass = require('gulp-sass'),
    mocha = require('gulp-mocha'),
    // autoprefixer = require('gulp-autoprefixer'),
    // refresh = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');

gulp.task('serve', function () {

  nodemon({ script: 'index.js', ext: 'json js', ignore: ['public/*', 'client/*'] })
  .on('change', ['lint'])
  .on('restart', function () {
  });

});

gulp.task('lint', function() {
  gulp.src('api/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('test:api', function(){
    return gulp.src(['test/api/**/*.spec.js'], {read: false})
    .pipe(mocha());
});

// Dev task
gulp.task('watch', ['serve', 'lint'], function(){

  gulp.watch(['test/api/**/*.spec.js', 'api/**/*.js'], ['test:api']);
});

gulp.task('dev', ['watch'], function() {

});

gulp.task('default', ['dev']);

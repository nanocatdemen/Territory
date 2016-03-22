// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var util = require('gulp-util');

var sources = [
  'src/js/cubeCoordinateSet.js',
  'src/js/hexagon.js',
  'src/js/grid.js',
  'src/config.js',
  'src/main.js'
];

var mimetype = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain',
  '.html': 'text/html'
};

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(sources)
    .pipe(concat('territory.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('territory.min.js'))
    .pipe(uglify().on('error', util.log))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(sources, ['scripts']);
});

// Default Task
gulp.task('default', ['scripts', 'watch']);

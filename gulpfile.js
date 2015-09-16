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
  'src/js/gridExample.js',
  'src/js/event.js'
];

var mimetype = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain',
  '.html': 'text/html'
};

// Web server
gulp.task('serve', function() {
  var fs = require('fs');
  var path = require('path');

  connect.server({
    port: 8000,
    livereload: true,
    middleware: function(app, opt) {
      return [function(request, response, next) {
        var basename = path.basename(request.url);
        var ext = path.extname(basename);

        // Check if /dist/basename exists otherwise return the file
        fs.readFile(path.join('dist', basename), function(err, data) {
          if (err) {
            return next();
          }

          if (ext in mimetype) {
            response.setHeader('Content-Type', mimetype[ext]);
          }

          response.end(data);
        });
      }];
    }
  });
});

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
gulp.task('default', ['scripts', 'serve', 'watch']);

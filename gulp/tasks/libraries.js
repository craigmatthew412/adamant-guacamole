'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var browserSync = require('browser-sync');

gulp.task('libraries', function() {

  return gulp.src(config.libraries.src)
    .pipe(changed(config.libraries.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.libraries.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));

});

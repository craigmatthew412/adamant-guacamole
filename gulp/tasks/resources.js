'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var browserSync = require('browser-sync');

gulp.task('resources', function() {

  return gulp.src(config.resources.src)
    .pipe(changed(config.resources.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.resources.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));

});

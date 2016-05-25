'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('lint', function() {
  return runSequence('lint-jshint', 'lint-jscs');
});
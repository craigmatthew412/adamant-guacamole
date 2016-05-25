'use strict';

var config = require('../config');
var gulp   = require('gulp');
var jscs   = require('gulp-jscs');

gulp.task('lint-jscs', function() {
	return gulp.src(config.scripts.src)
		.pipe(jscs())
		.pipe(jscs.reporter());
});
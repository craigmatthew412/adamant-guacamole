'use strict';

var config      = require('../config').apache;
var changed     = require('gulp-changed');
var gulp        = require('gulp');

gulp.task('apache', function() {
	return gulp.src(config.src)
		.pipe(changed(config.dest)) // Ignore unchanged files
		.pipe(gulp.dest(config.dest));
});

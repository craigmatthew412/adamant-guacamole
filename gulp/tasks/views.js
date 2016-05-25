'use strict';

var config        = require('../config');
var gulp          = require('gulp');
var htmlmin       = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');

// Views task
gulp.task('views', function() {
    // Put our index.html in the dist folder
    gulp.src('app/index.html')
        .pipe(gulp.dest(config.dist.root));

    // Process any other view files from app/views
    return gulp.src(config.views.src)
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest(config.views.dest));
});
var gulp = require('gulp');
var gfile = require('gulp-file'); // for virtual files from string buffers
var gutil = require('gulp-util');
var modify = require('gulp-modify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var fs = require('fs');
var del = require('del');

// Copy content folder to dist folder
gulp.task('content', [ 'content:copy' ], function() {
	gutil.log('content copy');
});

gulp.task('content:clean', function() {
	return del([
		'dist/content/'
	]);
});

gulp.task('content:copy', function() {
	return gulp.src('**/content/**')
			.pipe(gulp.dest('dist/b/out/'));
});
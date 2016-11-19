'use strict'

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
		sass = require('gulp-sass'),
		maps = require('gulp-sourcemaps'),
		 del = require('del');

gulp.task("concatScripts", function(){
		return gulp.src([
			'src/javascript/knockout-3.4.0.js', 
			'node_modules/jquery/dist/jquery.min.js',
			'src/javascript/bourbon-refills.js',
			'src/javascript/main.js'])
		.pipe(maps.init())
		.pipe(concat('app.js'))
		.pipe(maps.write('./'))		
		.pipe(gulp.dest('js'));
});


gulp.task('compileSass', function(){
		return gulp.src("src/sass/styles.scss")
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'));
})

gulp.task('watchFiles', function() {
	gulp.watch('src/sass/**/*.scss', ['compileSass']);
	gulp.watch('src/javascript/main.js', ['concatScripts'])
})
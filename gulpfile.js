var map = require('map-stream');
var gulp = require('gulp');
var debug = require('gulp-debug');
var del = require('del');
var react = require('gulp-react');
var less = require('gulp-less');
var nodeunit = require('gulp-nodeunit');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var JSV = require("JSV").JSV;
var fs = require('fs');

var outputDir = 'cleancodegame.github.io/'

function handleError(err) {
  console.log(err.toString());
  console.log("\007");
  this.emit('end');
}

gulp.task('clean', function(done) {
	try{
		del([outputDir + '/**/*'], done);
	} catch(e){
		console.log(e);
	}
});

gulp.task("html", function(){
	return gulp.src('src/*.html')
		.pipe(gulp.dest(outputDir));
});

gulp.task("img", function(){
	return gulp.src('img/*')
		.pipe(gulp.dest(outputDir + '/img'));
});

gulp.task("web.config", function(){
	return gulp.src('src/web.config')
		.pipe(gulp.dest(outputDir));
});

gulp.task("web.config", function(){
	return gulp.src('src/favicon.ico')
		.pipe(gulp.dest(outputDir));
});


gulp.task("less", function(){
	return gulp.src('src/*.less')
		.pipe(less())
		.on('error', handleError)
		.pipe(gulp.dest(outputDir));
});

gulp.task("jsx", function(){
	return gulp.src('src/jsx/*.jsx')
        .pipe(react())
   		.on('error', handleError)
        .pipe(gulp.dest('src/js'));
});

gulp.task("browserify", ['jsx'], function(){
	return browserify({
			entries: './src/js/AppView.js',
			'ignore-missing': true,
		})
		.exclude('lodash')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(outputDir))
		.on('error', handleError);
});

gulp.task("js-with-tests", ['browserify'], function(){
	return gulp.src('src/js/tests.js')
		.pipe(nodeunit())
		.on('error', handleError);
});

gulp.task("default", ['clean'], function(){
	gulp.start('less', 'js-with-tests', 'browserify', 'html', 'img', 'web.config');
});

gulp.task('watch', ['default'], function(){
	gulp.watch('src/jsx/*.jsx', ['js-with-tests']);
	gulp.watch('src/*.less', ['less']);
	gulp.watch('src/*.html', ['html']);
	gulp.watch('img/*', ['img']);
	gulp.watch('src/web.config', ['web.config']);
	gulp.watch('src/favicon.ico', ['favicon']);
});


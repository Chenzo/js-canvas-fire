/*

Default watch command:
		$ gulp

Update CacheBuster:
		$ gulp updateCacheBuster


*/





var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	//uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    pump = require('pump'),
	//wait = require('gulp-wait'),
    replace = require('gulp-replace');

var browserSync = require('browser-sync').create();

var webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./src/webpack/webpack.config.js'),
    webpackConfigUgly = require('./src/webpack/webpack.config.uglify.js');
var named = require('vinyl-named');


//For Options
var minimist = require('minimist'),
    gulpif = require('gulp-if');
var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'production' }
};
var options = minimist(process.argv.slice(2), knownOptions);

//Task - compiles SCSS files into a single compressed CSS file with a sourcemap
gulp.task('styles', function() {
    gulp.src('./src/scss/**/*.scss')
		//.pipe(wait(300))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./www/css/'))
        .pipe(browserSync.stream());        
});



//Task - finds and updates chacheBusterNumber PHP variable in global with current time.
gulp.task('updateCacheBuster', function(){
    var timeInMs = Date.now();
    console.log("refreshing cacheBuster with timeStamp: " + timeInMs);
  	gulp.src(['./www/includes/globals.php'])
	    .pipe(replace(/\$cacheBusterNumber="\d+\";/g, '$cacheBusterNumber="' +  timeInMs + '";'))
	    .pipe(gulp.dest('./www/includes/'))
});



gulp.task('javascripting', function() {
    gulp.src('./src/js/*.js')
      .pipe(named()) //swaps in individual files
      .pipe(webpackStream(gulpif(options.env === 'production', webpackConfigUgly, webpackConfig)), webpack).on('error', console.error.bind(console))
      .pipe(gulp.dest('./www/js/'));
  });




gulp.task('js', ['javascripting'], function() {
    console.log("----------------- > javascripting");
});


gulp.task('updateCB', ['updateCacheBuster'], function() {
    console.log("----------------- > Updated Cache Buster!!");
});


/* 

Default Watch Task
------------------
runs the sass and javascript commands on change in the SRC folder

*/
gulp.task('defaultasdasdsad', ['styles', 'javascripting', 'updateCacheBuster'] ,function() {
	browserSync.init({
	    proxy: 'http://localhost:8088'
	});
	//gulp.watch('./src/js/**/*.js',['js', 'updateCacheBuster']);
	gulp.watch('./src/js/*.js',['javascripting']);
    gulp.watch('./src/scss/**/*.scss',['styles', 'updateCacheBuster']);
    gulp.watch("./www/js/**/*.js").on('change', browserSync.reload);
});


gulp.task('default', ['javascripting'] ,function() {
	browserSync.init({
        proxy: 'http://localhost:8088',
        files: ['./www/css/**/*.css']
    });
    //gulp.watch('./src/scss/**/*.scss',['stylesRuby']);
    gulp.watch('./src/js/**/*.js',['javascripting']);
    gulp.watch("./src/js/**/*.js").on('change', browserSync.reload);
});

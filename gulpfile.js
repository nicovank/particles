const gulp 			= require("gulp");

const browserify 	= require("browserify");
const babelify 		= require("babelify");
const source 		= require("vinyl-source-stream");
const buffer 		= require("vinyl-buffer");
const uglify 		= require("gulp-uglify");
const sourcemaps 	= require("gulp-sourcemaps");


gulp.task("build", function () {
	// Entry point of your application
	return browserify({ entries: "./lib/index.js", debug: true })
		.transform("babelify", { presets: ["es2015"] })
		.bundle()
		// Output file
		.pipe(source("particles.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write("./maps"))
		.pipe(gulp.dest("./dist"));
});

gulp.task("watch", ["build"], function () {
	gulp.watch("./lib/**/*.js", ["build"]);
});

gulp.task("default", ["watch"]);
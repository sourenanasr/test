var gulp            = require("gulp");
var babelify        = require("babelify");
var browserify      = require("browserify");
var source          = require("vinyl-source-stream");
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var flatten         = require('gulp-flatten');
var rename          = require('gulp-rename');
var swig            = require('gulp-swig');

const paths = {
  dist: './public'
};

gulp.task("script", function(){
  return browserify({entries: ["./app/assets/js/initialize.js"]})
      .transform(babelify)
      .bundle()
      .pipe(source("app.js"))
      .pipe(gulp.dest(paths.dist+"/assets/js"));
});

gulp.task("statics", function(){
  var images = gulp.src("./app/assets/images/**/*.*")
      .pipe(gulp.dest(paths.dist+"/assets/images/"));
  var docs = gulp.src("./app/assets/docs/**/*.*")
          .pipe(gulp.dest(paths.dist+"/assets/docs/"));

  return [images, docs];
});

gulp.task("stylesheet", function() {
  return gulp.src('./app/assets/stylesheets/**/*.s*ss')
      .pipe(sass().on('error', sass.logError))
      .pipe(flatten())
      .pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9']))
      .pipe(rename("app.css"))
      .pipe(gulp.dest(paths.dist+"/assets/css"))
});

gulp.task("swig", function(){
  return gulp.src(["./app/**/*.html","!./app/**/_*.html"])
      .pipe(swig())
      .pipe(gulp.dest(paths.dist));
});


gulp.task("build", ["script", "statics", "stylesheet", "swig"]);

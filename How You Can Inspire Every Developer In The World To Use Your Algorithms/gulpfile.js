var gulp = require('gulp');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var spawn = require('child_process').spawn;

gulp.task('sass', function () {
  return gulp.src('./styles/source/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles'));
});

gulp.task('lint', function() {
  return gulp.src(['./js/*.js', '*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('autoreload', function() {
  var process;

  function restart() {
    if (process) {
      process.kill();
    }
    process = spawn('gulp', ['default'], {stdio: 'inherit'});
  }

  gulp.watch('gulpfile.js', restart);
  restart();
});


gulp.task('watch', function() {
  gulp.watch('./styles/source/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['lint', livereload.changed]);
  gulp.watch('./styles/*.css').on('change', livereload.changed);
  gulp.watch('*.html').on('change', livereload.changed);
});

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
    }));
});

gulp.task('open', function() {
  var options = {
    url: 'http://localhost:8000',
    app: 'google-chrome'
  };
  gulp.src('./index.html')
  .pipe(open('', options));
});

gulp.task('default', ['sass', 'lint', 'watch', 'serve', 'open']);

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src('builds/angularregistration_start/js/**/*');
});

gulp.task('html', function() {
  gulp.src('builds/angularregistration_start/*.html');
});

gulp.task('css', function() {
  gulp.src('builds/angularregistration_start/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch('builds/angularregistration_start/js/**/*', ['js']);
  gulp.watch('builds/angularregistration_start/css/*.css', ['css']);
  gulp.watch(['builds/angularregistration_start/*.html',
    'builds/angularregistration_start/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('builds/angularregistration_start/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);

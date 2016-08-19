var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');

gulp.task('less', function() {
  return gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('less/*.less', ['less']);
});

gulp.task('default', ['watch']);

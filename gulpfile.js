const gulp = require('gulp');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');

gulp.task('html', () => {
  return gulp.src('./src/public/**/*.html')
    .pipe(livereload());
});

gulp.task('js', () => {
  return gulp.src('./src/public/**/*.js')
    .pipe(livereload());
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('./src/public/**/*.html', ['html']);
  gulp.watch('./src/public/**/*.js', ['js']);
});

gulp.task('server', () => {
  return nodemon({
    script: './src/server/app.js',
    ignore: './sr/public/',
  });
});

gulp.task('serve', ['server', 'watch']);

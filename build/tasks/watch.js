var gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['lint']);
});
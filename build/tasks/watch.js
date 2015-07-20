var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util');

gulp.task('watch', function () {

    var tasks = Object.keys(gutil.env)
    tasks.unshift();
    tasks.shift('lint');

    gulp.watch('src/**/*.js', tasks);
});
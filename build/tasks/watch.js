var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util');

gulp.task('watch', function () {

    var tasks = ['lint'];

    if (gutil.env.test) {
        tasks.push('test');
    }

    if (gutil.env.benchmark) {
        tasks.push('benchmark');
    }

    gulp.watch(['src/**/*.js', 'test/spec/**/*.js'], tasks);
});
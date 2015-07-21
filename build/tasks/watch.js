var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util');

gulp.task('watch', function () {

    var tasks = ['lint'];

    if (gutil.env.test) {
        tasks.push('test');
    }

    gulp.watch('src/**/*.js', tasks);
});
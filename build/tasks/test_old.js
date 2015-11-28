var basePath = '../../../',
    gutil = require('gulp-util');

var gulp = require('gulp'),
    jasmine = require('gulp-jasmine');

var Server = require('karma').Server;

gulp.task('jasmine', function () {
    return gulp.src('test/**/*.js')
        .pipe(jasmine());
});

gulp.task('test_old', function (done) {
    new Server({
        configFile: basePath + 'test/karma.conf.js'
    }, done).start();
});
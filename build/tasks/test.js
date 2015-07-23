var basePath = '../../../'

var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    benchmark = require('gulp-benchmark');

var Server = require('karma').Server;

gulp.task('jasmine', function () {
    return gulp.src('test/**/*.js')
        .pipe(jasmine());
});

gulp.task('benchmark', function () {
    return gulp.src('test/**/*.js', {
            read: false
        })
        .pipe(benchmark({
            reporters: [
                benchmark.reporters.etalon(),
                benchmark.reporters.fastest()
            ]
        }));
});

gulp.task('test', function (done) {
    new Server({
        configFile: basePath + 'test/karma.conf.js'
    }, done).start();
});
var gulp = require('gulp'),
    benchmark = require('gulp-benchmark'),
    Server = require('karma').Server;

gulp.task('benchmark', function (done) {
    new Server({
        configFile: '../../../test/benchmark.conf.js'
    }, done).start()
});

gulp.task('quick-compare', function () {
    return gulp.src('test/quickcompare.js', {read: false})
        .pipe(benchmark());
});

var gulp = require('gulp'),
    Server = require('karma').Server;

gulp.task('benchmark', function (done) {
    new Server({
        configFile: '../../../test/benchmark.conf.js'
    }, done).start()
});

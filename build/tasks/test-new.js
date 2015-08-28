var gulp = require('gulp'),
    karma = require('gulp-karma'),
    gutil = require('gulp-util');

gulp.task('test-new', function () {
    var files = [
        'node_modules/jquery/dist/jquery.js',
        'pub/dollar.js',
        'test-new/mock_dom.html',
        'test-new/mock_dom.js',
        'test-new/spec_helpers.js',
        'test-new/spec/*.js'
    ];

    // Be sure to return the stream
    return gulp.src(files)
        .pipe(karma({
            configFile: 'test-new/karma.conf.js',
            action: 'run',
            env: gutil.env
        }))
        .on('error', function (err) {
            gutil.beep();
        });
});

var gulp = require('gulp'),
    karma = require('gulp-karma'),
    gutil = require('gulp-util');

function getTestFiles () {

    var dirPrefix = 'test-new/spec/',
        test;

    if (test = gutil.env.run) {
        return dirPrefix + test + '.js';
    } else {
        return dirPrefix + '*.js';
    }
}

gulp.task('test-new', function () {
    var files = [
        'node_modules/jquery/dist/jquery.js',
        'pub/dollar.js',
        'test-new/mock_dom.html',
        'test-new/mock_dom.js',
        'test-new/spec_helpers.js',
        getTestFiles()
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

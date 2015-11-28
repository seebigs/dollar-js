var gulp = require('gulp'),
    karma = require('gulp-karma'),
    gutil = require('gulp-util'),
    Server = require('karma').Server;

// function getTestFiles () {

//     var dirPrefix = 'test/spec/',
//         test;

//     if (test = gutil.env.run) {
//         return dirPrefix + test + '.js';
//     } else {
//         return dirPrefix + '*.js';
//     }
// }

function getTestFiles () {

    var toRun = gutil.env.run;

    if (toRun) {
        if (toRun.indexOf('/') !== -1) {
            toRun = 'test/spec/' + toRun + '.js'
        } else {
            toRun = 'test/spec/' + toRun + '/*.js';
        }
    } else {
        toRun = 'test/spec/**/**/*.js';
    }

    return toRun

    // return testFiles.map( function (filePath) {
    //     return filePath = basePath + filePath;
    // });
    
}

// gulp.task('test', function (done) {
//     new Server({
//         configFile: '../../../test/karma.conf.js'
//     }, done).start();
// });

gulp.task('test', function (done) {

    var files = [
        'node_modules/jquery/dist/jquery.js',
        'pub/dollar.js',
        'test/mock_dom.html',
        'test/mock_dom.js',
        'test/spec_helpers.js',
        getTestFiles()
    ];

    // Be sure to return the stream
    return gulp.src(files)
        .pipe(karma({
            configFile: 'test/karma.conf.js',
            action: 'run',
            env: gutil.env
        }))
        .on('error', function (err) {
            gutil.beep();
        });
});

gulp.task('quickcompare', function (done) {
    return new Server({
        configFile: '../../../test/quickcompare/quick.karma.conf.js'
    }, done).start();
});

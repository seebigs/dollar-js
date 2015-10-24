var config = require('../config'),
    gulp   = require('gulp'),
    eslint = require('gulp-eslint'),
    gutil  = require('gulp-util');

gulp.task('lint', ['dollar'], function() {
    var inputs = [
        config.paths.src.modules + '/*.js'
    ];

    return gulp.src(inputs)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('lint-tests', function() {
    var inputs = [
        config.paths.test + '/../test-new/**/*.js',
        '!**/quickcompare/*.js'
    ];

    return gulp.src(inputs)
        .pipe(eslint({
            env: {
                jasmine: true,
                jquery: true
            },
            globals: {
                SPEC: false
            },
            rules: {
                'no-loop-func': 0
            }
        }))
        .pipe(eslint.format());
});

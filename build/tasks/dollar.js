var config  = require('../config'),
    gulp    = require('gulp'),
    gulpif  = require('gulp-if'),
    include = require('gulp-file-include'),
    gutil   = require('gulp-util'),
    wrap    = require('gulp-wrap');

function stringSrc(path, string) {
    var src = require('stream').Readable({
        objectMode: true
    });
    src._read = function () {
        this.push(new gutil.File({
            cwd: '',
            base: '',
            path: path,
            contents: new Buffer(string)
        }));
        this.push(null);
    }
    return src;
}

gulp.task('dollar', function () {
    var path = config.paths.pub,
        filename = 'dollar.js',
        wrapProd = config.paths.src.wrap + '/prod.js',
        wrapDev  = config.paths.src.wrap + '/dev.js';

    if (gutil.env.output) {
        var p = gutil.env.output.split('/'),
            pLen = p.length;

        if (pLen > 1 && p[pLen-1].indexOf('.js') > 0) {
            filename = p.pop();
        }

        path = p.join('/');
    }

    var includes = gutil.env.include ? gutil.env.include.split(',') : config.include,
        contents = "@include('$.js')\n";

    includes.map(function (inc) {
        contents += "@include('" + inc + ".js')\n";
    });

    contents += "@include('../exports/detect.js')";

    return stringSrc(filename, contents)
            .pipe(include({
              prefix: '@',
              basepath: config.paths.src.modules
            }))
            .on('error', config.onError)
            .pipe(gulpif(config.isDev(), wrap({src:wrapDev}), wrap({src:wrapProd})))
            .pipe(gulpif(config.isProd(), config.makeUgly(gulp.currentTask.name)))
            .pipe(gulp.dest(path));
});

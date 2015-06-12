var fs     = require('fs'),
    gulp   = require('gulp'),
    uglify = require('gulp-uglify')
    gutil  = require('gulp-util'),
    time   = require('pretty-hrtime');

gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function(task) {
    this.currentTask = task;
    this.__runTask(task);
}

module.exports = {

    /* STRUCTURE */

    paths: {
        src: {
            modules: './src/dollar',
            wrap: './src/wrap'
        },
        pub: './pub',
        docs: './docs'
    },

    include: [
        'base'
    ],

    /* PLUGIN SETTINGS */

    uglify: {},

    /* HELPERS */

    isDev: function () {
        return !gutil.env.prod;
    },

    isProd: function () {
        return !!gutil.env.prod;
    },

    getVersion: function (fullpath) {
        var path = fullpath.split('/');
        var name = path.pop();
        path = path.join('/');
        name = name.split('.');
        name.pop();
        name = name.join('.');

        try {
            var v = fs.readFileSync(path + '/' + name + '.version', 'utf8');
            return v ? '/'+v : '';
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.log(err);
            }
            return '';
        }
    },

    makeUgly: function (taskName) {
        var start = process.hrtime();
        return uglify(this.uglify)
                .on('end', function() {
                    gutil.log( "Uglify   '" + gutil.colors.cyan(taskName) + "' " + gutil.colors.magenta(time(process.hrtime(start))) );
                })
    },

    onError: function(err){
        gutil.log( gutil.colors.red(err.toString()) );
        this.emit('end');
        gutil.beep();
        process.exit();
    },

    onErrorQuiet: function (error) {
        gutil.beep();
    }

};

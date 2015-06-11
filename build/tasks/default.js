var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    time  = require('pretty-hrtime');

var gulp_start_time = process.hrtime();

gulp.task('default', ['lint'], function () {

    var t = time(process.hrtime(gulp_start_time));

    setTimeout(function(){
        console.log('');
        console.log(
            gutil.colors.green('DollarJS build finished: ') + gutil.colors.magenta(t)
        );
        console.log('');
    }, 200);

});


var bundl = require('bundl');
var benchmark = require('bundl-benchmark');

var bundlOptions = {
    targetDir: './test'
};

var benchmarkOptions = {
    beforeEach: function () {},
    maxTime: 2,
    redWhen: 'jQuery'
};

bundl.task('benchmark', function (done) {
    var category = bundl.args.category || '**';
    var run = bundl.args.run;

    bundl([
        'helpers/global_modules_min.js',
        'helpers/benchmark.js',
        'helpers/selectors.js',
        'benchmark/' + category + '/' + (run ? run : '*') + '.js'
    ], bundlOptions)
        .then(benchmark(benchmarkOptions))
        .all(done);
});

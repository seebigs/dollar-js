
var bundl = require('bundl');
var benchmark = require('bundl-benchmark');
var fs = require('fs');
var Module = require('module');

Module._extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var bundlOptions = {
    srcDir: '../test',
    quiet: true
};

var benchmarkOptions = {
    beforeEach: function () {},
    maxTime: 2,
    redWhen: 'jQuery'
};

bundl.task('benchmark', function (done) {
    var category = bundl.args.category;
    var run = bundl.args.run || '';

    bundl([
        'helpers/global_modules_min.js',
        'helpers/benchmark.js',
        'helpers/selectors.js',
        'benchmark/' + (category ? category + '/' : '**/*' + run) + '*.js'
    ], bundlOptions)
        .then(benchmark(benchmarkOptions))
        .go(done);
});

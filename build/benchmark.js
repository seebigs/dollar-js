
var Bundl = require('bundl');
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

Bundl.setTask('benchmark', function (done) {
    var category = Bundl.cliArgs.category;
    var run = Bundl.cliArgs.run || '';

    new Bundl([
        'helpers/global_modules_min.js',
        'helpers/benchmark.js',
        'helpers/selectors.js',
        'benchmark/' + (category ? category + '/' : '**/*' + run) + '*.js'
    ], bundlOptions)
        .src(benchmark(benchmarkOptions))
        .go(done);
});

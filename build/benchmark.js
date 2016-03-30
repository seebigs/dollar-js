
var bundl = require('../../node-example/node_dev/bundl');
var benchmark = require('../../node-example/node_dev/bundl-benchmark');

var bundlOptions = {
    targetDir: './test'
};

var benchmarkOptions = {
    beforeEach: function () {
        console.log('before');
    }
};

bundl.task('benchmark', function (done) {
    var category = bundl.args.category || '**';

    bundl([
        'helpers/global_modules_min.js',
        'benchmark/' + category + '/*.js'
    ], bundlOptions)
        .then(benchmark(benchmarkOptions))
        .all(done);
});

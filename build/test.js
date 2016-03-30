
var bundl = require('../../node-example/node_dev/bundl');
var jasmine = require('../../node-example/node_dev/bundl-jasmine-node');

var bundlOptions = {
    targetDir: './test'
};

bundl.task('test', function (done) {
    bundl.run('dollar').then('test:unit').then(done);
});

bundl.task('test:unit', function (done) {
    var category = bundl.args.category || '**';

    bundl([
        'helpers/global_modules.js',
        'helpers/spec.js',
        'helpers/jasmine.js',
        'spec/' + category + '/*.js'
    ], bundlOptions)
        .then(jasmine({ slowThreshold: 600 }))
        .all(done);
});

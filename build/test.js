
var bundl = require('bundl');
var jasmine = require('bundl-jasmine-node');

var bundlOptions = {
    targetDir: './test'
};

bundl.task('test', function (done) {
    bundl.run('dollar').then('test:unit').then('lint').then(done);
});

bundl.task('test:unit', function (done) {
    var category = bundl.args.category;
    var run = bundl.args.run || '';

    bundl([
        'helpers/global_modules.js',
        'helpers/selectors.js',
        'helpers/jasmine.js',
        'spec/' + (category ? category + '/' : '**/*' + run) + '*.js'
    ], bundlOptions)
        .then(jasmine({ slowThreshold: 700 }))
        .all(done);
});

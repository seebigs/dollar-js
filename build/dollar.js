var bundl = require('../../node-example/node_dev/bundl');

var minify = require('../../node-example/node_dev/bundl-minify');
var rename = require('../../node-example/node_dev/bundl-rename');
var wrap = require('../../node-example/node_dev/bundl-wrap');
var write = require('../../node-example/node_dev/bundl-write');

var options = {
    targetDir: 'src/dollar',
    outputDir: 'prebuilt'
};

var wrapOptions = {
    file: 'src/wrap/safe.js'
};

var lib = [

    '$.js',

    // core
    'core/*.js',

    // submodules
    'filter/*.js',
    'mutate/*.js',
    'readwrite/*.js',
    'style/*.js',
    'traverse/*.js',
    'trigger/*.js',

    // exports
    '../export/detect.js'

];

bundl.task('dollar', function (done) {
    var b = bundl({ 'dollar.js': lib }, options)
        .then(wrap(wrapOptions))
        .then(write())
        .then(minify())
        .then(rename({ 'dollar.js': 'dollar.min.js' }))
        .then(write());

    if (bundl.args.live) {
        b.server({
            port: '5555',
            rebuild: 'changed',
            watch: './'
        });

    } else {
        b.all(done);
    }
});

var bundl = require('../../node-example/node_dev/bundl');

var minify = require('../../node-example/node_dev/bundl-minify');
var rename = require('../../node-example/node_dev/bundl-rename');
var wrap = require('bundl-wrap');
var write = require('bundl-write');

var options = {
    targetDir: 'src/dollar',
    outputDir: 'prebuilt'
};

var wrapOptions = {
    file: 'src/wrap/safe.js'
};

var libCore = [
    '$.js',
    'core/*.js'
];

var libSubmodules = [
    'animate/*.js',
    'filter/*.js',
    'mutate/*.js',
    'readwrite/*.js',
    'style/*.js',
    'traverse/*.js',
    'trigger/*.js'
];

var libCompat = [
    'compat/*.js'
];

var libExports = [
    '../export/detect.js'
];

function modulesToInclude () {
    var use = [].concat(libCore);

    if (bundl.args.compat) {
        var compats = bundl.args.compat.split(',');
        compats.forEach(function (compat) {
            use.push('compat/' + compat + '.js');
        });
    }

    if (bundl.args.modules) {
        var mods = bundl.args.modules.split(',');
        mods.forEach(function (mod) {
            if (mod !== 'core') {
                use.push(mod + '/*.js');
            }
        });

    } else {
        use = use.concat(libSubmodules);
    }

    use = use.concat(libCompat);

    return use.concat(libExports);
}

bundl.task('dollar', function (done) {
    var numDone = 0;
    function oneDone () {
        numDone++;
        if (numDone >= 2) {
            done();
        }
    }

    var lib = modulesToInclude();

    if (bundl.args.debug) {
        console.log('Modules To Include: ');
        console.log(lib);
    }

    var full = bundl({ 'dollar.js': lib }, options)
        .then(wrap(wrapOptions))
        .then(write());

    var min = bundl({ 'dollar.min.js': lib }, options)
        .then(wrap(wrapOptions))
        .then(minify({ output: { comments: /DollarJS --/i } }))
        .then(write());

    if (bundl.args.live) {
        full.webserver({
            port: '5555',
            rebuild: 'changed',
            watch: './'
        });

    } else {
        full.all(oneDone);
        min.all(oneDone);
    }
});

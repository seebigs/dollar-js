var bundl = require('bundl');

var minify = require('bundl-minify');
var packageJSON = require('../package.json');
var rename = require('bundl-rename');
var wrap = require('bundl-wrap');
var write = require('bundl-write');

var options = {
    srcDir: '../src/dollar',
    outputDir: '../prebuilt',
    quiet: true
};

var minifyOptions = {
    uglify: {
        output: { comments: /^!/i },
        compress: {
            reduce_vars: false
        }
    }
};

var wrapOptions = {
    data: {
        version: packageJSON.version
    },
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
    var lib = modulesToInclude();

    if (bundl.args.debug) {
        console.log('Modules To Include: ');
        console.log(lib);
    }

    var b = bundl({ 'dollar.js': lib }, options)
        .then(wrap(wrapOptions))
        .then(write())
        .then(minify(minifyOptions))
        .then(rename('.min.js'))
        .then(write());

    if (bundl.args.live) {
        b.webserver({
            port: '5555',
            rebuild: 'changed',
            watch: './'
        });

    } else {
        b.go(done);
    }
});

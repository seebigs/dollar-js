var Bundl = require('bundl');

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
        output: {
            comments: '/^!/'
        },
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

    if (Bundl.cliArgs.compat) {
        var compats = Bundl.cliArgs.compat.split(',');
        compats.forEach(function (compat) {
            use.push('compat/' + compat + '.js');
        });
    }

    if (Bundl.cliArgs.modules) {
        var mods = Bundl.cliArgs.modules.split(',');
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

Bundl.setTask('dollar', function (done) {
    var lib = modulesToInclude();

    if (Bundl.cliArgs.debug) {
        console.log('Modules To Include: ');
        console.log(lib);
    }

    var b = new Bundl({ 'dollar.js': lib }, options)
        .then(wrap(wrapOptions))
        .then(write())
        .then(minify(minifyOptions))
        .then(rename('.min.js'))
        .then(write());

    if (Bundl.cliArgs.live) {
        b.webserver({
            port: '5555',
            rebuild: 'changed',
            watch: './'
        });

    } else {
        b.go(done);
    }
});

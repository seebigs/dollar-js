/**
 * Config for karma tests
 * http://karma-runner.github.io/0.8/config/configuration-file.html
 */

// var env = JSON.parse(process.argv[2]).env;
var env = require('gulp-util').env;

module.exports = function (config) {
    
    config.set({

        reporters: ['mocha'],

        frameworks: ['jasmine'],

        files: getTestFiles(env.run),

        client: {
            useIframe: env.browser ? env.browser.contains('iframe') : false,
        },

        autoWatch: env.watch ? true : false,

        browsers: parseBrowsers(env.browser),

        captureTimeout: 10000,

        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        reportSlowerThan: 500,

        logLevel: env.debug ? 'INFO' : 'WARN'

    });

};

function getTestFiles (toRun) {

    var basePath = __dirname + '/../';
    var testFiles = [
        'node_modules/jquery/dist/jquery.js',
        'pub/dollar.js',
        'test/mock_dom.html',
        'test/mock_dom.js',
        'test/spec_helpers.js'
    ];

    toRun = toRun ? ('test/spec/' + toRun + '.js') : 'test/spec/**/**/*.js';
    testFiles.push(toRun);

    return testFiles.map( function (filePath) {
        return filePath = basePath + filePath;
    });
}

function parseBrowsers (browsers) {
    return browsers ? 
        browsers.split(',').map( function (b) {
            return usePhantom(b = capitalize(b)) ? 'PhantomJS' : b;
        }) : 
        ['PhantomJS'];
}

function usePhantom (browser) {
    browser = capitalize(browser);
    return browser === 'Phantom' || browser === 'Phantomjs' || browser === 'PhantomJs' || browser === 'PhantomJS';
}

function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

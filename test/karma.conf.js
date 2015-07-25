var gutil = require('gulp-util');

var basePath = __dirname + '/../';
var testFiles = [
    'node_modules/jquery/dist/jquery.js',
    'pub/dollar.js',
    'test/mock_dom.js',
    'test/spec/spec_helpers.js'
];

if (gutil.env.run) {
    testFiles.push('/test/spec/' + gutil.env.run);
} else {
    testFiles.push('/test/spec/**/*.js')
}

testFiles = testFiles.map( function (filePath) {
    return filePath = basePath + filePath;
});

module.exports = function (config, fileArray) {

    config.set({

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: testFiles,

        client: {
            // karma normally runs tests within an iframe, but we have tests that use window.scrollX methods so we want to disable that
            useIframe: false,

            // console.log and other logging functions are supported and printed in output.
            captureConsole: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // can be overriden using a grunt command line argument e.g. grunt test --browser=Chrome,Firefox
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: gutil.env.debug ? gutil.env.debug == 'false' : true,

        captureTimeout: 200000
    });
};
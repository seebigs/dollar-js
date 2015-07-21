// sets up a karma config using fileArray parameter

var basePath = __dirname + '/../';

console.log(basePath);


var gutil = require('gulp-util');

var testFiles = [
    'node_modules/jquery/dist/jquery.js',
    'pub/dollar.js'
];

if (gutil.env.run) {
    testFiles.push('/test/spec/' + gutil.env.run);
} else {
    testFiles.push('/test/spec/**/*.js')
}

testFiles = testFiles.map( function (filePath) {
    return filePath = basePath + filePath;
});

module.exports = function(config, fileArray) {
    
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
        singleRun: gutil.env.debug ? gutil.env.debug.toLowerCase() === 'false' : true

        //browserNoActivityTimeout: 60000
    });

    // var fs = require('fs');

    // testFiles.forEach(function (file) {
    //     if (!fs.existsSync(__dirname + '/' + config.basePath + '/' + file)) {
    //         throw new Error("File specified in test config file does not exist: " + file);
    //     }
    // })
};
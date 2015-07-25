var gutil = require('gulp-util');

var basePath = __dirname + '/../';
var testFiles = [
    'node_modules/sizzle/dist/sizzle.js',
    'node_modules/jquery/dist/jquery.js',
    'pub/dollar.js',
    'test/spec/mock_dom.js',
    'test/benchmarks/benchmark_helpers.js'
];

if (gutil.env.run) {
    testFiles.push('/test/benchmarks/' + gutil.env.run);
} else {
    testFiles.push('/test/benchmarks/**/*.js')
}

testFiles = testFiles.map( function (filePath) {
    return filePath = basePath + filePath;
});

module.exports = function (config) {
    config.set({

        frameworks: ['benchmark'],

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots', 'progress'
        // CLI --reporters progress
        reporters: ['benchmark'],

        // list of files / patterns to load in the browser
        files: testFiles,

        // list of files to exclude
        exclude: [],

        // web server port
        // CLI --port 9876
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // CLI --log-level debug
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
        browsers: [
            'Chrome'
        ],

        // Serve html files using html2js
        preprocessors: {
            '**/*.html': ['html2js']
        },

        // Configure the jUnit reporter
        junitReporter: {
            outputFile: 'results/junit-benchmark-results.xml',
            suite: 'unit'
        },

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 60000,

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        // singleRun: false,
        singleRun: true,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 2000,

        browserNoActivityTimeout: 300000
    });
};
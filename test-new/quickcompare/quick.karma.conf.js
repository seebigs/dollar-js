/**
 * Config for quickcompare tests
 * http://karma-runner.github.io/0.8/config/configuration-file.html
 */

var testFiles = [
    'test-new/quickcompare/quick_mock_dom.js',
    'test-new/quickcompare/quick.js'
];

module.exports = function (config) {

    config.set({

        basePath: process.cwd(),

        files: testFiles,

        reporters: ['benchmark'],

        frameworks: ['benchmark'],

        autoWatch: false,

        browsers: ['PhantomJS'],

        client: {
            useIframe: false
        },

        captureTimeout: 10000,

        singleRun: true,

        reportSlowerThan: 500,

        logLevel: 'WARN'

    });

};

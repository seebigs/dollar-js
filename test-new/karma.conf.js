/**
 * Config for karma tests
 * http://karma-runner.github.io/0.8/config/configuration-file.html
 */

var env = JSON.parse(process.argv[2]).env;

function getBrowsers () {
    if (!env.browser) {
        return ['PhantomJS'];
    }

    var ret = [],
        blist = env.browser.split(',');

    for (var i = 0, len = blist.length; i < len; i++) {
        ret.push(blist[i]);
    }

    return ret;
}


module.exports = function (config) {

    config.set({

        reporters: ['mocha'],

        frameworks: ['jasmine'],

        autoWatch: false,

        browsers: getBrowsers(),

        captureTimeout: 10000,

        singleRun: env.debug,

        reportSlowerThan: 500,

        logLevel: env.debug ? 'INFO' : 'WARN'

    });

};

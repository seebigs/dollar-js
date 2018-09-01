
var Bundl = require('bundl');
var FeatherTestBrowser = require('feather-test-browser');
var matchers = require('../test/helpers/matchers.js');

Bundl.setTask('test', function (done) {
    Bundl.runTask('dollar').then('lint').then('docs').then('test:unit').then(done);
});

Bundl.setTask('test:unit', function (done) {
    var category = Bundl.cliArgs.category;
    var run = Bundl.cliArgs.run || '';

    var featherTest = new FeatherTestBrowser({
        destDir: __dirname + '/../docs/test',
        helpers: [
            '../test/helpers/global_modules.js',
            '../test/helpers/selectors.js'
        ],
        customMatchers: matchers,
        beforeEach: function () {
            document.body.innerHTML = origHTML;
        },
        specs: '../test/specs/' + (category || '') + (run || ''),
        reporterTargetElement: '#results'
    });

    featherTest.run(done);
});

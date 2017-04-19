
var bundl = require('bundl');
var FeatherTest = require('../../feather-test'); // FIXME
var matchers = require('../test/helpers/matchers.js');

bundl.task('test', function (done) {
    bundl.run('dollar').then('lint').then('test:unit').then(done);
});

bundl.task('test:unit', function (done) {
    var category = bundl.args.category;
    var run = bundl.args.run || '';

    var featherTest = new FeatherTest({
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

    featherTest.browser(done);
});

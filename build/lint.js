
var bundl = require('../../node-example/node_dev/bundl');
var eslint = require('../../node-example/node_dev/bundl-eslint');

bundl.task('lint', function () {
    var options = {};

    if (bundl.args.modules) {
        options = {
            rules: {
                "no-unused-vars": 0
            }
        };
    }

    return bundl('prebuilt/dollar.js')
        .then(eslint(options))
        .all();
});

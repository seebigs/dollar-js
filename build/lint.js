
var bundl = require('../../node-example/node_dev/bundl');
var eslint = require('../../node-example/node_dev/bundl-eslint');

bundl.task('lint', function () {
    return bundl('prebuilt/dollar.js')
        .then(eslint())
        .all();
});

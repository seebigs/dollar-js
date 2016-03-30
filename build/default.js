
var bundl = require('../../node-example/node_dev/bundl');

bundl.task('default', function (done) {
    bundl.run('dollar').then('lint').then(done);
});

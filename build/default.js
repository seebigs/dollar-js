
var bundl = require('bundl');

bundl.task('default', function (done) {
    bundl.run('dollar').then('lint').then(done);
});

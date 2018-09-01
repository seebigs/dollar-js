
var Bundl = require('bundl');

Bundl.setTask('default', function (done) {
    Bundl.runTask('dollar').then('lint').then('docs').then(done);
});

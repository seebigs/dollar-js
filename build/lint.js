
var Bundl = require('bundl');
var eslint = require('bundl-eslint');

Bundl.setTask('lint', function () {
    var options = {};

    if (Bundl.cliArgs.modules) {
        options = {
            rules: {
                "no-unused-vars": 0
            }
        };
    }

    return new Bundl('../prebuilt/dollar.js', { quiet: true })
        .src(eslint(options))
        .go();
});

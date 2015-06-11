var requireDir = require('require-dir');

process.on('uncaughtException', function (err) {
    console.log(err);
    process.exit(1);
});

requireDir('./build/tasks', { recurse: true });

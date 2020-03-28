
var Bundl = require('bundl');
var bytes = require('bytes');
var consoleTable = require('console.table');
var fs = require('fs');
var path = require('path');
var utils = require('seebigs-utils');

Bundl.setTask('compare', function (done) {
    var toTable = [];

    // var finalFiles = utils.listFiles(__dirname + '/../node_modules/jquery/dist');
    var finalFiles = [
        path.resolve(__dirname + '/../node_modules/jquery/dist/jquery.js'),
        path.resolve(__dirname + '/../node_modules/jquery/dist/jquery.min.js'),
        path.resolve(__dirname + '/../node_modules/jquery/dist/jquery.slim.js'),
        path.resolve(__dirname + '/../node_modules/jquery/dist/jquery.slim.min.js'),
    ];
    finalFiles = finalFiles.concat(utils.listFiles(__dirname + '/../prebuilt'));

    finalFiles.forEach(function (ff) {
        var stats = fs.statSync(ff);
        toTable.push({
            bundle: ff.split('/').pop(),
            size: stats.size,
            readable: bytes(stats.size)
        });
    });

    toTable.sort(function (a, b) {
        if (a.size > b.size) {
            return 1;
        } else {
            return -1;
        }
    });

    console.log();
    console.table(toTable);
});

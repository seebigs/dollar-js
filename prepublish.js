
var fs = require('fs');
var version = require('./package.json').version;
var filename = './prebuilt/dollar.js';

try {
    var prebuilt = fs.readFileSync(filename, 'utf8').split('\n');
    if (prebuilt[1].indexOf('DollarJS ' + version) === -1) {
        console.log('\nERROR: ' + filename + ' does not match package.json version:' + version + '\n');
        process.exit(1);
    }
} catch (e) {

}

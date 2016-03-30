/**
 * Inject mock_dom.html into test context
 */

var fs = require('fs');
var path = require('path');

function getExternal (filepath) {
    var subpath = path.resolve(path.join(__dirname, filepath));
    var contents = fs.readFileSync(subpath, 'utf8');
    // return contents.replace(new RegExp('[\n\r\t]+ *', 'g'), '');
    return contents;
}

module.exports = getExternal('mock_dom.html');

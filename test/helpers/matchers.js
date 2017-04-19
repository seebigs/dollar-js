
function arrayOfNodesToString (arr) {
    var ret = '[\n',
        str, node, id, cl;

    for (var i = 0, len = arr.length; i < len; i++) {
        str = '';
        node = arr[i];
        id = node.id;
        cl = node.className;
        str += node.nodeName.toLowerCase() + (id ? '#' + id : '') + (cl ? '.' + cl : '');
        ret += str ? (i > 0 ? '\n' : '') + '   <' + str + '>' : '';
    }

    return ret + '\n]';
}

module.exports = [
    {
        name: 'toMatchElements',
        message: 'to match elements',
        matcher: function (expected, actual, utils) {
            var dollar = actual.get();

            var dom = [];
            if (typeof expected === 'string') {
                dom = Array.prototype.slice.call(document.querySelectorAll(expected));
            } else if (Array.isArray(expected)) {
                dom = expected;
            } else if (expected.length) {
                dom = expected.get();
            }

            return utils.deepMatch(dom, dollar);
        }
    }
];

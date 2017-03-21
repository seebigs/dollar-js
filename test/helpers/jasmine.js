
beforeEach(function () {
    document.body.innerHTML = origHTML;

    jasmine.addMatchers({

        toMatchElements: function (util, customEqualityTesters) {

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

            return {
                compare: function (actual, expected) {
                    var dollar = actual.get();

                    var dom = [];
                    if (typeof expected === 'string') {
                        dom = Array.prototype.slice.call(document.querySelectorAll(expected));
                    } else if (Array.isArray(expected)) {
                        dom = expected;
                    } else if (expected.length) {
                        dom = expected.get();
                    }

                    var result = { pass: false };

                    if (dom.length) {
                        result.pass = util.equals(dollar, dom, customEqualityTesters);

                        if (result.pass) {
                            result.message = 'Expected ' + arrayOfNodesToString(dollar) + ' NOT to match ' + arrayOfNodesToString(dom);
                        } else {
                            result.message = 'Expected ' + arrayOfNodesToString(dollar) + '\nto match ' + arrayOfNodesToString(dom);
                        }

                    } else {
                        result.message = 'Expected selector to match at least one element';
                    }

                    return result;
                }
            };
        }

    });
});

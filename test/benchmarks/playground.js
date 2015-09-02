var nodeList = document.getElementsByTagName('div'),
    arrProto = Array.prototype,
    arrPush = Array.prototype.push,
    arrSlice = Array.prototype.slice,
    strType = 'string',
    mergeArr = function (first, second) {
        var len = +second.length,
            j = 0,
            i = first.length;

        for (; j < len; j++) {
            first[i++] = second[j];
        }

        first.length = i;

        return first;
    },
    sel = '#test_test',
    parseHTML = function (selector) {
        var singleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(selector);

        // HANDLE: '<div></div>', etc.
        if (singleTag) {
            return [document.createElement(singleTag[1])];
        // HANDLE: '<div><p></p></div>', etc.
        } else {
            var disposableContainer = document.createElement('div');
            disposableContainer.innerHTML = selector;
            return disposableContainer.children;
        }
    }

suite('playground', function () {

    benchmark('jQuery init', function () {
        jQuery('div');
    });

    benchmark('dollar init', function () {
        $('div');
    });
});

// suite('playground', function () {

//     benchmark('jQuery init', function () {
//         selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3
//     });

//     benchmark('dollar init', function () {
//        /^(?:\s*#([\w-]*))$/.test(selector)
//     });
// });
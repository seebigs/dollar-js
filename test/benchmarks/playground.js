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

var res = [],
    node = nodeList[0];

suite('playground', function () {

    var selector = '#container',
        docConstruct = document,
        docElement = document.documentElement, 
        context = nodeList[0];

    benchmark('2', function () {
        var result = docConstruct.getElementById(selector);
        // if (result && context !== result && context === docElement || context.contains(result)) {
        //     results[0] = result;
        // }

        // return result;
        
        context.contains(result)
    });

    benchmark('1', function () {
        var result = docConstruct.getElementById(selector);
        // if (result && context !== result && context.contains(result)) {
        //     results[0] = result;
        // }

        // return result;
        
        context === docElement
    });

});

// suite('playground', function () {

//     benchmark('jQuery - ID', function () {
//         jQuery('#container');
//     });

//     benchmark('dollar - ID', function () {
//        $('#container');
//     });

//     benchmark('jQuery - class', function () {
//         jQuery('.li');
//     });

//     benchmark('dollar - class', function () {
//        $('.li');
//     });

//     benchmark('jQuery - tag', function () {
//         jQuery('div');
//     });

//     benchmark('dollar - tag', function () {
//        $('div');
//     });

//     benchmark('jQuery - single html tag', function () {
//         jQuery('<div></div>');
//     });

//     benchmark('dollar - single html tag', function () {
//        $('<div></div>');
//     });

//     benchmark('jQuery - multiple html tags', function () {
//         jQuery('<div><p></p></div>');
//     });

//     benchmark('dollar - multiple html tags', function () {
//        $('<div><p></p></div>');
//     });
// });
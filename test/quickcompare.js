
var arrProto = Array.prototype,
    arrPush = arrProto.push,
    arrSlice = arrProto.slice;

// Set your test variations

var testArgs = [[1,2,3],[7,8,9]];

var tests = [

    function (jumbled) {
        var iterable = Object(jumbled),
            distinct = [];

        if (!iterable.length) {
            return jumbled;
        }

        for (var i = 0, len = iterable.length; i < len; i++) {
            if (distinct.indexOf(iterable[i]) === -1) {
                distinct.push(iterable[i]);
            }
        }

        return distinct;
    },

    function (jumbled) {
        var iterable = Object(jumbled),
            distinct = [];

        if (!iterable.length) {
            return jumbled;
        }

        for (var i = 0, len = iterable.length; i < len; i++) {
            if (distinct.indexOf(iterable[i]) === -1) {
                distinct[distinct.length] = iterable[i];
            }
        }

        return distinct;
    }

];



function clone (collection) {
    var ret = [];

    for (var i = 0, len = collection.length; i < len; i++) {
        ret[i] = collection[i];
    }

    return ret;
}

var testsLoop = [];

for (var i = 0, len = tests.length; i < len; i++) {

    // run once to check for errors
    // tests[i].apply(null, args);

    testsLoop[i] = (function (t,a) {
        return function () {
            t.apply(null, a);
        };
    })(tests[i], clone(testArgs));
}


// var testsExample = [
//
//     function () {
//         /o/.test('Hello World!');
//     },
//
//     function () {
//         'Hello World!'.indexOf('o') > -1;
//     },
//
//     function () {
//         bob();
//         !!'Hello World!'.match(/o/);
//     }
//
// ];

module.exports = {
    name: 'Playground',
    maxTime: 2,
    tests: testsLoop
};

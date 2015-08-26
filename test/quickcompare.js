
var undefined = void 0,
    objProto = Object.prototype,
    objToString = objProto.toString,
    objHasProp = objProto.hasOwnProperty,
    arrProto = Array.prototype,
    arrPush = arrProto.push,
    arrSlice = arrProto.slice;

var foo;

// Set your test variations

var testArgs = [];

var tests = [

    function () {
        foo === undefined;
    },

    function () {
        typeof foo === 'undefined';
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
    tests[i].apply(null, clone(testArgs));

    // loop tests
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

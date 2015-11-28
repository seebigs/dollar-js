
var foo = document.getElementById('quick-container'),
    bar = document.getElementById('quick-elem');

function polyContains (node, has) {
    while (has = has.parentNode) {
        if (has === node) {
            return true;
        }
    }
    return false;
}

// Set your test variations

var testArgs = [];

var tests = [

    function () {
        foo.contains(bar);
    },

    function () {
        foo.contains ? foo.contains(bar) : polyContains(foo, bar);
    }

];



function clone (collection) {
    var ret = [];

    for (var i = 0, len = collection.length; i < len; i++) {
        ret[i] = collection[i];
    }

    return ret;
}

function addTestsToSuite () {
    for (var i = 0, len = tests.length; i < len; i++) {
        // run once to check for errors
        tests[i].apply(null, clone(testArgs));

        // add benchmark
        benchmark( 'TEST ' + (i+1), (function (t,a) {
            return function () {
                t.apply(null, a);
            };
        })(tests[i], clone(testArgs)) );
    }
}

suite('quickcompare', addTestsToSuite);

!(function(global, window, document){

require([
[(function (require, module, exports) {


/**
 * Run your specs
 */

var runInBrowser = require(4);

require.cache.clear();

var FeatherTestSpecMap = {   "test_specs_core__utils_each_spec": function(){ require(5); },
   "test_specs_core__utils_extend_spec": function(){ require(6); },
   "test_specs_core__utils_spec": function(){ require(7); },
   "test_specs_core_closest_spec": function(){ require(8); },
   "test_specs_core_each_spec": function(){ require(9); },
   "test_specs_core_eq_spec": function(){ require(10); },
   "test_specs_core_filter_spec": function(){ require(11); },
   "test_specs_core_find_spec": function(){ require(12); },
   "test_specs_filter_add_spec": function(){ require(13); },
   "test_specs_filter_concat_spec": function(){ require(14); },
   "test_specs_filter_has_spec": function(){ require(15); },
   "test_specs_filter_is_spec": function(){ require(16); },
   "test_specs_filter_map_spec": function(){ require(17); },
   "test_specs_filter_not_spec": function(){ require(18); },
   "test_specs_mutate_after_spec": function(){ require(19); },
   "test_specs_mutate_append_spec": function(){ require(20); },
   "test_specs_mutate_before_spec": function(){ require(21); },
   "test_specs_mutate_clone_spec": function(){ require(22); },
   "test_specs_mutate_empty_spec": function(){ require(23); },
   "test_specs_mutate_html_spec": function(){ require(24); },
   "test_specs_mutate_prepend_spec": function(){ require(25); },
   "test_specs_mutate_remove_spec": function(){ require(26); },
   "test_specs_readwrite_attr_spec": function(){ require(27); },
   "test_specs_readwrite_data_spec": function(){ require(28); },
   "test_specs_readwrite_prop_spec": function(){ require(29); },
   "test_specs_readwrite_removeAttr_spec": function(){ require(30); },
   "test_specs_readwrite_removeData_spec": function(){ require(31); },
   "test_specs_readwrite_removeProp_spec": function(){ require(32); },
   "test_specs_readwrite_text_spec": function(){ require(33); },
   "test_specs_readwrite_val_spec": function(){ require(34); },
   "test_specs_style_addClass_spec": function(){ require(35); },
   "test_specs_style_css_spec": function(){ require(36); },
   "test_specs_style_hasClass_spec": function(){ require(37); },
   "test_specs_style_height_spec": function(){ require(38); },
   "test_specs_style_hide_spec": function(){ require(39); },
   "test_specs_style_removeClass_spec": function(){ require(40); },
   "test_specs_style_show_spec": function(){ require(41); },
   "test_specs_style_width_spec": function(){ require(42); },
   "test_specs_traverse_children_spec": function(){ require(43); },
   "test_specs_traverse_first_spec": function(){ require(44); },
   "test_specs_traverse_last_spec": function(){ require(45); },
   "test_specs_traverse_next_spec": function(){ require(46); },
   "test_specs_traverse_parent_spec": function(){ require(47); },
   "test_specs_traverse_prev_spec": function(){ require(48); },
   "test_specs_traverse_siblings_spec": function(){ require(49); },
   "test_specs_trigger_off_spec": function(){ require(50); },
   "test_specs_trigger_on_spec": function(){ require(51); },
   "test_specs_trigger_trigger_spec": function(){ require(52); },
   "test_specs___spec": function(){ require(53); },
};

runInBrowser(FeatherTestSpecMap);

/* cleanup environment */
__dirname = "/";



}),{"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"28":28,"29":29,"30":30,"31":31,"32":32,"33":33,"34":34,"35":35,"36":36,"37":37,"38":38,"39":39,"40":40,"41":41,"42":42,"43":43,"44":44,"45":45,"46":46,"47":47,"48":48,"49":49,"50":50,"51":51,"52":52,"53":53}],
[(function (require, module, exports) {



function each (collection, iteratee, thisArg) {
    if (collection) {
        if (typeof collection.length !== 'undefined') {
            for (var i = 0, len = collection.length; i < len; i++) {
                if (iteratee.call(thisArg, collection[i], i, collection) === false) {
                    return;
                }
            }

        } else {
            for (var i = 0, keys = Object.keys(collection), len = keys.length; i < len; i++) {
                if (iteratee.call(thisArg, collection[keys[i]], keys[i], collection) === false) {
                    return;
                }
            }
        }
    }
}

module.exports = each;



}),{}],
[(function (require, module, exports) {



function clear (key) {
    return window.localStorage.setItem(key, null);
}

function get (key) {
    try {
        return JSON.parse(window.localStorage.getItem(key));
    } catch (e) {
        return null;
    }
}

function set (key, value) {
    try {
        return window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // do nothing
    }
}

function mergeResults (key, results) {
    var storedResults = get(key) || { failed: [], passed: [], skipped: [] };
    if (storedResults) {
        storedResults.failed = storedResults.failed.concat(results.failed);
        storedResults.passed = storedResults.passed.concat(results.passed);
        storedResults.skipped = storedResults.skipped.concat(results.skipped);
    }
    return set(key, storedResults);
}

module.exports = {
    mergeResults: mergeResults,
    get: get,
    set: set,
    clear: clear,
};



}),{}],
[(function (require, module, exports) {


module.exports = '<style>body,html{background:#eee}#again{background-color:#794e79;width:50%;max-width:230px;border-radius:6px;padding:20px 40px;margin:40px auto 30px auto;box-shadow:1px 2px 3px rgba(0,0,0,.5);font-size:24px;color:#fff;text-align:center;font-family:sans-serif;cursor:pointer}#passing{width:100%;max-width:600px;display:block;margin:auto}#results{width:100%;max-width:800px;margin:20px auto 80px auto}#results a{line-height:2em}</style><div id="again">Run tests again</div><img id="passing" src="passing.gif"><pre id="results"></pre>';


}),{}],
[(function (require, module, exports) {


/**
 * Run specs in Browser
 */

var each = require(1);
var storage = require(2);

var runningState = 'running';
var finishedState = 'finished';

/* helpers */

function currentBaseUrl() {
    return window.location.protocol + '//' + window.location.host + window.location.pathname;
}

function parseKeyvalString(str) {
    var delimiter = "&";
    var associativeOperator = "=";
    var result = {};
    var decodedStr = str ? decodeURIComponent(str) : null;

    if (decodedStr) {
        var keylessCount = 1;
        var keyvals = decodedStr.split(delimiter);

        each(keyvals, function (kv) {
            var keyval = kv.split(associativeOperator);

            if (keyval.length >= 2) {
                var key = keyval.shift();
                var val = keyval.join("=");

                if (key) {
                    result[key.trim()] = val.trim();
                }
            } else if (keyval[0]) {
                result["KEYLESS_VALUE_" + keylessCount] = keyval[0].trim();
                keylessCount += 1;
            }
        });
    }

    return result;
}

function toQueryString(keyvals) {
    var delimiter = "&";
    var associativeOperator = "=";
    var str = [];

    Object.keys(keyvals).forEach(function (k) {
        var v = keyvals[k];
        str.push(k + associativeOperator + v);
    });

    return str.join(delimiter);
}

function parseLocationSearch(locationSearch) {
    var search = (locationSearch || window.location.search);
    return parseKeyvalString(search.slice(1));
}



function runInBrowser(FeatherTestSpecMap) {

    function matchSpec(specName) {
        for (var key in FeatherTestSpecMap) {
            if (key === specName) {
                return key;
            }
        }
        return false;
    }

    function specAfter(specName) {
        var keys = Object.keys(FeatherTestSpecMap);
        var next;
        each(keys, function (k, i) {
            if (k === specName) {
                next = keys[i + 1];
            }
        });
        return next;
    }

    function getNextUrlValues(spec, next, running) {
        if (!spec && !next) {
            /* first run. deafult to running all specs continuously */
            var keys = Object.keys(FeatherTestSpecMap);
            spec = keys[0];
            next = keys[1];
            running = true;

            return toQueryString({
                spec: spec,
                next: next,
                state: runningState,
            });

        } else if (!running) {
            /* don"t wanna continue. */
            return false;

        } else if (!next || !FeatherTestSpecMap[next]) {
            /* nothing left, bail */
            return false;

        } else if (next) {
            if (specAfter(next)) {
                return toQueryString({
                    spec: next,
                    next: specAfter(next),
                    state: runningState,
                });
            }
            return toQueryString({
                spec: next,
                state: runningState,
            });
        }
    }

    function getUrlForNextTest(spec, next, running) {
        var nextUrlValues = getNextUrlValues(spec, next, running);
        if (nextUrlValues) {
            var nextTestUrl = currentBaseUrl() + "?";
            return nextTestUrl + nextUrlValues;
        }
        return false;
    }

    function invokeSpec(specName) {
        if (specName) {
            var realSpecName = matchSpec(specName);
            if (realSpecName) {
                console.log('Running ' + specName);
                FeatherTestSpecMap[realSpecName]();
            } else {
                console.error("Cannot find the spec: " + spec);
            }
        }
    }

    function getReporterOutput(results) {
        var resultsOutput = '';

        /**
         * Here we intercept console log, then run the reporter as normal to capture the output
         */

        var oldLog = console.log;
        console.log = function () {
            each(arguments, function (arg) {
                resultsOutput += '\n' + arg;
            });
            oldLog.apply(this, arguments);
        };

        var oldError = console.error;
        console.error = function () {
            each(arguments, function (arg) {
                resultsOutput += '\n' + arg;
            });
            oldError.apply(this, arguments);
        };

        FeatherTest.reporter.report(results);

        console.log = oldLog;
        console.error = oldError;

        return resultsOutput;
    }

    var options = parseLocationSearch();
    var running = options.state === runningState;
    var finished = options.state === finishedState;
    var spec = matchSpec(options.spec);
    var next = matchSpec(options.next);

    if (finished) {
        var specHyperlinks = [];
        var specOutput = storage.get('featherOutput');
        if (specOutput) {
            console.info('Spec Output:\n', specOutput);
            each(specOutput.split('\n'), function (specOut) {
                if (specOut && specOut.indexOf('Running ') === 0) {
                    var specName = specOut.split(' ').pop();
                    specHyperlinks.push('<a href="?spec=' + specName + '">' + specName + '</a>');
                }
            });
        }

        document.body.innerHTML = require(3);

        var runAgain = document.getElementById('again');
        runAgain.onclick = function () {
            window.location.href = currentBaseUrl();
        };

        var results = storage.get('featherResults');

        if (results) {
            var resultsOutput = getReporterOutput(results);

            if (specHyperlinks.length) {
                resultsOutput += '\n\n\n=== Specs ===\n\n' + specHyperlinks.join('\n');
            }

            var resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = resultsOutput;

            if (results.passed.length && !results.failed.length) {
                resultsContainer.style.maxWidth = '600px';
            }

        } else {

        }

    } else if (running) {
        var oldLog = console.log;
        console.log = function () {
            each(arguments, function (arg) {
                var currentOutput = storage.get('featherOutput') || '';
                storage.set('featherOutput', currentOutput + '\n' + arg);
            });
            oldLog.apply(this, arguments);
        };

        invokeSpec(spec);

        FeatherTest.reporter.report = function (results) {
            storage.mergeResults('featherResults', results);
            var nextUrl = getUrlForNextTest(spec, next, running);
            if (nextUrl) {
                window.location.href = nextUrl;
            } else {
                window.location.href = currentBaseUrl() + '?state=' + finishedState;
            }
        };

        FeatherTest.report();

    } else {
        // cleanup for a fresh run
        storage.clear('featherOutput');
        storage.clear('featherResults');

        if (options.spec) {
            if (spec) {
                invokeSpec(spec);
                FeatherTest.report();
            } else {
                console.error('Spec "' + options.spec + '" not found within this test bundle');
                console.log('Try one of the following:');
                each(FeatherTestSpecMap, function (fn, specName) {
                    console.log(specName);
                });
            }

        } else {
            window.location.href = currentBaseUrl() + '?state=' + runningState;
        }
    }
}

module.exports = runInBrowser;



}),{"1":1,"2":2,"3":3}],
[(function (require, module, exports) {


(function () {

    describe("utils.each", function () {
        var arr = [1, 2, 3];
        var obj = { abc: 123, def: 456 };

        describe("when given undefined", function () {
            var called = false;
            function cb () {
                called = true;
            }
            it("does not call the callback", function (expect) {
                $.utils.each(void 0, cb);
                expect(called).toBe(false);
            });
        });

        describe("when given an empty array", function () {
            var called = false;
            function cb () {
                called = true;
            }
            it("does not call the callback", function (expect) {
                $.utils.each([], cb);
                expect(called).toBe(false);
            });
        });

        describe("when given an array with length", function () {
            it("iterates the array", function (expect) {
                var actual = [],
                    expected = [
                        { ndx: 0, val: 1, col: arr },
                        { ndx: 1, val: 2, col: arr },
                        { ndx: 2, val: 3, col: arr }
                    ];
                $.utils.each(arr, function(v, k, c) {
                    actual.push({ ndx: k, val: v, col: c });
                });
                expect(actual).toEqual(expected);
            });
        });

        describe("when given an NodeList", function () {
            it("iterates the NodeList", function (expect) {
                var nl = document.querySelectorAll('body'),
                    actual = [],
                    expected = [
                        { ndx: 0, val: nl[0], col: nl }
                    ];
                $.utils.each(nl, function(v, k, c) {
                    actual.push({ ndx: k, val: v, col: c });
                });
                expect(actual).toEqual(expected);
            });
        });

        describe("when given an arguments object", function () {
            it("iterates the arguments", function (expect) {
                var each = $.utils.each;
                var actual = [];
                var expected;

                function someFn () {
                    expected = [
                        { ndx: 0, val: arguments[0], col: arguments },
                        { ndx: 1, val: arguments[1], col: arguments }
                    ];

                    each(arguments, function(v, k, c) {
                        actual.push({ ndx: k, val: v, col: c });
                    });
                }

                someFn('arg1', 'arg2');
                expect(actual).toEqual(expected);
            });
        });

        describe("when given an object", function () {
            it("iterates the object", function (expect) {
                var actual = [],
                    expected = [
                        { key: 'abc', val: 123, col: obj },
                        { key: 'def', val: 456, col: obj }
                    ];
                $.utils.each(obj, function(v, k, c) {
                    actual.push({ key: k, val: v, col: c });
                });
                expect(actual).toEqual(expected);
            });
        });

        describe("when given an object with length (jquery)", function () {
            it("iterates the object as it would an array", function (expect) {
                var jq = $('body'),
                    actual = [],
                    expected = [
                        { key: 0, val: jq.get(0), col: jq }
                    ];
                $.utils.each(jq, function(v, k, c) {
                    actual.push({ key: k, val: v, col: c });
                });
                expect(actual).toEqual(expected);
            });
        });

        describe("when an iteratee returns false", function () {
            it("drops out of the loop", function (expect) {
                var lastVal;
                $.utils.each(arr, function(v) {
                    lastVal = v;
                    return false;
                });
                expect(lastVal).toBe(1);
            });
        });
    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe("utils.extend", function () {

        describe("when given two objects", function () {

            it("combines properties from both into one object", function (expect) {
                expect($.utils.extend({ bat: 'man' }, { super: 'man' })).toEqual({ bat: 'man', super: 'man' });
            });

            it("modifies the first object directly", function (expect) {
                var obj = { bat: 'man' };
                $.utils.extend(obj, { super: 'man' });
                $.utils.extend(obj, { sand: 'man' });
                expect(obj).toEqual({ bat: 'man', super: 'man', sand: 'man' });
            });

            it("overwrites the first with the second", function (expect) {
                expect($.utils.extend({ bat: 'man' }, { bat: 'girl' })).toEqual({ bat: 'girl' });
            });

        });

    });

})();



}),{}],
[(function (require, module, exports) {


describe("utils", function () {

    describe("isElement", function () {

        it("handles undefined", function (expect) {
            expect($.utils.isElement()).toBe(false);
        });

        it("returns false for non-elements", function (expect) {
            expect($.utils.isElement(window)).toBe(false);
        });

        it("returns true for elements", function (expect) {
            expect($.utils.isElement(document.getElementById('slim_shady'))).toBe(true);
        });

    });

});



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".closest", function () {

        var contextSelector = SELECTORS.contextSelector;

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector", function (expect) {
                expect($(contextSelector).closest()).toEqual(emptyDollar);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($(contextSelector).closest(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($(contextSelector).closest($('article')).get()).toEqual($('article').get());
            });

            it("handles Node as selector", function (expect) {
                expect($(contextSelector).closest(document)[0]).toEqual(document);
            });

            it("handles Element as selector", function (expect) {
                var elem = document.getElementById('top_list');
                expect($(contextSelector).closest(elem)[0]).toEqual(elem);
            });

        });

        describe("finds closest elements", function () {
            jQuery.each(SELECTORS.context, function (sel) {
                it("matches '" + sel + "' as selector", function (expect) {
                    expect($(contextSelector).closest(sel)).toMatchElements('#top_list');
                });
            });
        });

        describe("finds within context", function () {
            jQuery.each(SELECTORS.context, function (context) {
                it("within '" + context + "' as context", function (expect) {
                    expect($(contextSelector).closest('ul', context)).toMatchElements(jQuery('#top_list ul'));
                });
            });
        });

        describe("handles all types of context", function () {

            var emptyDollar = $();

            jQuery.each(SELECTORS.ignored, function (name, context) {
                it("handles " + name + " as context", function (expect) {
                    expect($(contextSelector).closest(context)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as context", function (expect) {
                expect($(contextSelector).closest($('article')).get()).toEqual($('article').get());
            });

            it("handles Node as context", function (expect) {
                expect($(contextSelector).closest(document)[0]).toEqual(document);
            });

            it("handles Element as context", function (expect) {
                var elem = document.getElementById('top_list');
                expect($(contextSelector).closest(elem)[0]).toEqual(elem);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($(contextSelector).closest('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".each", function () {

        describe("iterates over each element in a dollar instance", function () {

            it("executes the correct number of times", function (expect) {
                var times = 0;
                $('section').each(function () { times++; });
                expect(times).toBe(3);
            });

            it("drops out when return false", function (expect) {
                var times = 0;
                $('section').each(function () { times++; return false; });
                expect(times).toBe(1);
            });

            it("passes the correct args to iteratee", function (expect) {
                var args = [];
                $('#slim_shady').each(function (elem, index) {
                    args.push(this);
                    args.push(elem);
                    args.push(index);
                });
                expect(args).toEqual([
                    document.getElementById('slim_shady'),
                    document.getElementById('slim_shady'),
                    0
                ]);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').each(function () {}).isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".eq", function () {

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            var elem = document.getElementById('slim_shady');

            it("handles no selector", function (expect) {
                expect($('section').eq()).toEqual(emptyDollar);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($('section').eq(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($('section').eq($('a'))).toEqual(emptyDollar);
            });

            it("handles Element as selector", function (expect) {
                expect($('section').eq(elem)).toEqual(emptyDollar);
            });

            it("handles function as selector", function (expect) {
                expect($('section').eq(function () {})).toEqual(emptyDollar);
            });

        });

        describe("returns the matched element at a given index", function () {

            it("gets a zero index", function (expect) {
                expect($('section').eq(0)).toMatchElements('#first_section');
                expect($('section').eq('0')).toMatchElements('#first_section');
            });

            it("gets a positive index", function (expect) {
                expect($('section').eq(1)).toMatchElements('#middle_section');
                expect($('section').eq('1')).toMatchElements('#middle_section');
            });

            it("gets a negative index", function (expect) {
                expect($('section').eq(-1)).toMatchElements('#last_section');
                expect($('section').eq('-1')).toMatchElements('#last_section');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('section').eq(0).isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".filter", function () {

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector", function (expect) {
                expect($('*').filter()).toEqual(emptyDollar);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($('*').filter(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($('*').filter($('a')).get()).toEqual($('a').get());
            });

            it("handles Element as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($('*').filter(elem)[0]).toEqual(elem);
            });

            it("handles function as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($('*').filter(function (elem, i) {
                    return elem.id === 'slim_shady';
                })).toMatchElements('#slim_shady');
            });

        });

        describe("avoids accidental matches", function () {
            jQuery.each(SELECTORS.nomatch, function (i, sel) {
                it("does not match '" + sel + "'", function (expect) {
                    expect($('*').filter(sel).length).toBe(0);
                });
            });
        });

        describe("matches our DOM", function () {
            jQuery.each(SELECTORS.matchJQuery, function (sel, match) {
                it("matches '" + sel + "'", function (expect) {
                    expect($('*').filter(sel)).toMatchElements(match);
                });
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('*').filter('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".find", function () {

        var $b = $(document.getElementsByTagName('body')[0]);

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector", function (expect) {
                expect($b.find()).toEqual(emptyDollar);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($b.find(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($b.find($('a')).get()).toEqual($('a').get());
            });

            describe('finding within parent found with string selector', function () {

                it('searches within a string parent for string child', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(parent).find(children);
                    var jQueryFound = jQuery(parent).find(children);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a string parent for $children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(parent).find($(children));
                    var jQueryFound = jQuery(parent).find(jQuery(children));

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a string parent for single node child', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(parent).find(document.getElementsByClassName(children)[0]);
                    var jQueryFound = jQuery(parent).find(document.getElementsByClassName(children)[0]);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a string parent for many node children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(parent).find(document.getElementsByClassName(children));
                    var jQueryFound = jQuery(parent).find(document.getElementsByClassName(children));

                    expect($found).toMatchElements(jQueryFound);
                });
            });

            describe('finding within a parent found with $', function () {

                it('searches within a $parent for string children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $($(parent)).find(children);
                    var jQueryFound = jQuery(jQuery(parent)).find(children);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a $parent for $children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $($(parent)).find($(children));
                    var jQueryFound = jQuery(jQuery(parent)).find(jQuery(children));

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a $parent for single node child', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $($(parent)).find(document.getElementsByClassName(children)[0]);
                    var jQueryFound = jQuery(jQuery(parent)).find(document.getElementsByClassName(children)[0]);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a $parent for multiple node children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $($(parent)).find(document.getElementsByClassName(children));
                    var jQueryFound = jQuery(jQuery(parent)).find(document.getElementsByClassName(children));

                    expect($found).toMatchElements(jQueryFound);
                });
            });

            describe('finding within a single parent node', function () {

                it('searches within a single node parent for string children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(document.getElementById(parent)).find(children);
                    var jQueryFound = jQuery(document.getElementById(parent)).find(children);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a single node parent for $children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(document.getElementById(parent)).find($(children));
                    var jQueryFound = jQuery(document.getElementById(parent)).find(jQuery(children));

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a single node parent for single node child', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(document.getElementById(parent)).find(document.getElementsByClassName(children)[0]);
                    var jQueryFound = jQuery(document.getElementById(parent)).find(document.getElementsByClassName(children)[0]);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a single node parent for multiple node children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(document.getElementById(parent)).find(document.getElementsByClassName(children));
                    var jQueryFound = jQuery(document.getElementById(parent)).find(document.getElementsByClassName(children));

                    expect($found).toMatchElements(jQueryFound);
                });
            });

            describe('finding within multiple node parents', function () {

                it('searches within multiple node parents for string children', function (expect) {

                    var parent = 'section';
                    var children = '.find_me';

                    var $found = $(document.getElementsByTagName(parent)).find(children);
                    var jQueryFound = jQuery(document.getElementsByTagName(parent)).find(children);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within multiple node parents for $children', function (expect) {

                    var parent = 'section';
                    var children = '.find_me';

                    var $found = $(document.getElementsByTagName(parent)).find($(children));
                    var jQueryFound = jQuery(document.getElementsByTagName(parent)).find(jQuery(children));

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within multiple node parents for a single node child', function (expect) {

                    var parent = 'section';
                    var children = '.find_me';

                    var $found = $(document.getElementsByTagName(parent)).find(document.getElementsByClassName(children)[0]);
                    var jQueryFound = jQuery(document.getElementsByTagName(parent)).find(document.getElementsByClassName(children)[0]);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within multiple node parents for multiple node children', function (expect) {

                    var parent = 'section';
                    var children = '.find_me';

                    var $found = $(document.getElementsByTagName(parent)).find(document.getElementsByClassName(children));
                    var jQueryFound = jQuery(document.getElementsByTagName(parent)).find(document.getElementsByClassName(children));

                    expect($found).toMatchElements(jQueryFound);
                });
            });
        });

        describe("only finds children", function () {

            it("matches children", function (expect) {
                expect($('#top_list').find(SELECTORS.contextSelector)).toMatchElements('.sel-in-context-id');
            });

        });

        describe("avoids accidental matches", function () {
            jQuery.each(SELECTORS.nomatch, function (i, sel) {
                it("does not match '" + sel + "'", function (expect) {
                    expect($b.find(sel).length).toBe(0);
                });
            });
        });

        describe("matches our DOM", function () {
            jQuery.each(SELECTORS.matchJQuery, function (sel, match) {
                it("matches '" + sel + "'", function (expect) {
                    expect($b.find(sel)).toMatchElements(match);
                });
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($b.find('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".add", function () {

        it("merges results into current set", function (expect) {
            expect($('#first_section').add('#middle_section').add('#last_section')).toMatchElements('section');
        });

        it("is chainable", function (expect) {
            expect($('#first_section').add('foo').isDollar).toBe(true);
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".concat", function () {

        it("merges results into current set", function (expect) {
            var e1 = document.getElementById('middle_section');
            var e2 = document.getElementById('last_section');
            expect($('#first_section').concat([e1, e2], [e2])).toMatchElements('section');
        });

        it("is chainable", function (expect) {
            expect($('#first_section').concat([]).isDollar).toBe(true);
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".has", function () {

        var emptyDollar = $();
        var $b = $('body');

        describe("handles all types of selectors", function () {

            it("handles no selector", function (expect) {
                expect($b.has()).toEqual(emptyDollar);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($b.has(sel)).toEqual(emptyDollar);
                });
            });

            it("handles Element as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($b.has(elem).get()).toEqual($b.get());
            });

            it("handles function as selector", function (expect) {
                expect($b.has(function () {})).toEqual(emptyDollar);
            });

        });

        describe("avoids accidental matches", function () {
            it("body does not have '#bad'", function (expect) {
                expect($b.has('#bad')).toEqual(emptyDollar);
            });
        });

        describe("matches valid selectors", function () {
            jQuery.each(SELECTORS.matchJQuery, function (sel, match) {
                it("body has " + sel, function (expect) {
                    expect($b.has(sel).get()).toEqual($b.get());
                });
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($b.has('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".is", function () {

        describe("handles all types of selectors", function () {

            it("handles no selector", function (expect) {
                expect($('#slim_shady').is()).toBe(false);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($('#slim_shady').is(sel)).toBe(false);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($('#slim_shady').is($('div'))).toBe(true);
            });

            it("handles Element as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($('#slim_shady').is(elem)).toBe(true);
            });

            it("handles function as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($('#slim_shady').is(function () {
                    return this === elem;
                })).toBe(true);
            });

        });

        describe("avoids accidental matches", function () {
            it("div is not body", function (expect) {
                expect($('#slim_shady').is('body')).toBe(false);
            });
        });

        describe("matches valid selectors", function () {
            jQuery.each(SELECTORS.matchJQuery, function (sel, match) {
                it("at least one " + match + " is " + sel, function (expect) {
                    expect($(match).is(sel)).toBe(true);
                });
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".map", function () {

        it("repopulates current set", function (expect) {
            var newSet = $('p span').map(function (el) {
                return el.parentNode;
            });
            expect(newSet.get()).toEqual(jQuery('#first_paragraph').add('span.sel-child').get());
        });

        it("is chainable", function (expect) {
            expect($('#first_section').map(function(el){ return el; }).isDollar).toBe(true);
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".not", function () {

        var contextSelector = SELECTORS.contextSelector;

        describe("handles all types of selectors", function () {

            var elem = document.getElementById('top_list');

            it("handles no selector", function (expect) {
                expect($(contextSelector).not()).toMatchElements($(contextSelector));
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($(contextSelector).not(sel)).toMatchElements($(contextSelector));
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($(contextSelector).not($('.top-list'))).toMatchElements(jQuery(contextSelector).not(jQuery('.top-list')));
            });

            it("handles Element as selector", function (expect) {
                expect($(contextSelector).not(elem)).toMatchElements(jQuery(contextSelector).not(elem));
            });

            it("handles Array of Elements as selector", function (expect) {
                expect($(contextSelector).not([elem, elem, elem])).toMatchElements(jQuery(contextSelector).not([elem, elem, elem]));
            });

            it("handles function as selector", function (expect) {
                var fnTest = function () { return this.id === 'top_list'; };
                expect($(contextSelector).not(fnTest)).toMatchElements(jQuery(contextSelector).not(fnTest));
            });

        });

        describe("avoids accidental drops", function () {
            it("should keep all elements if nothing is matched", function (expect) {
                expect($(contextSelector).get()).toEqual($(contextSelector).not('#bad').get());
            });
        });

        describe("drops valid matches", function () {
            var emptyDollar = $();
            jQuery.each(SELECTORS.matchJQuery, function (sel, match) {
                it("drops " + sel, function (expect) {
                    expect($(match).not(sel)).toEqual(emptyDollar);
                });
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($(contextSelector).not('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".after", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function (expect) {
                $('.mutate').after();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function (expect) {
                    $('.mutate').after(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles Element as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newAfter';
                $('#mutate').after(elem);
                expect(jQuery('.newAfter').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function (expect) {
                $('#mutate').after($('<div class="newAfter">'));
                expect(jQuery('.newAfter').length).toBe(1);
            });

            it("handles function as content", function (expect) {
                $('.mutate').after(function () {
                    return '<div class="newAfter"></div>';
                });
                expect(jQuery('.newAfter').length).toBe(3);
            });

            it("handles Array as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newAfter';
                var creator = function () {
                    return '<div class="newAfter"></div>';
                };
                $('#mutate').after([elem, creator]);
                expect(jQuery('.newAfter').length).toEqual(2);
            });

        });

        describe("inserts new content after", function () {

            it("adds content after each", function (expect) {
                $('section').after('<div class="newAfter">');
                expect(jQuery('section').next()).toMatchElements('.newAfter');
            });

            it("takes multiple args", function (expect) {
                $('section').after('<div class="newAfter">', '<a class="newAfter">', '<span class="newAfter">');
                expect(jQuery('.newAfter').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').after('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".append", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function (expect) {
                $('.mutate').append();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function (expect) {
                    $('.mutate').append(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles HTMLString (single tag) as content", function (expect) {
                expect(jQuery('h1', '#mutate').length).toBe(0);
                $('#mutate').append('<h1></h1>');
                expect(jQuery('h1', '#mutate').length).toBe(1);
            });

            it("handles HTMLString (multi tag) as content", function (expect) {
                expect(jQuery('h1', '#mutate').length).toBe(0);
                $('#mutate').append('<div><h1></h1></div>');
                expect(jQuery('div h1', '#mutate').length).toBe(1);
            });

            it("handles Element as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newAppend';
                $('#mutate').append(elem);
                expect(jQuery('.newAppend').get()).toEqual([elem]);
            });

            it("handles DocumentFragment as content", function (expect) {
                var frag = document.createDocumentFragment();
                var elem = document.createElement('div');
                elem.className = 'newAppend';
                frag.appendChild(elem);
                $('#mutate').append(frag);
                expect(jQuery('.newAppend', '#mutate').length).toEqual(1);
            });

            it("handles dollar instance as content", function (expect) {
                $('#mutate').append($('<div class="newAppend">'));
                expect(jQuery('.newAppend').length).toBe(1);
            });

            it("handles function as content", function (expect) {
                $('.mutate').append(function () {
                    return '<div class="newAppend"></div>';
                });
                expect(jQuery('.newAppend').length).toBe(3);
            });

            it("handles Array as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newAppend';
                var creator = function () {
                    return '<div class="newAppend"></div>';
                };
                $('#mutate').after([elem, creator]);
                expect(jQuery('.newAppend').length).toEqual(2);
            });

        });

        describe("inserts new content at bottom", function () {

            it("adds content at bottom of each", function (expect) {
                $('.mutate').append('<span class="newAppend">');
                expect(jQuery('.newAppend').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(6);
                expect(jQuery('*', '.mutate')[1].className).toBe('newAppend');
            });

            it("takes multiple args", function (expect) {
                $('.mutate').append('<div class="newAppend">', '<a class="newAppend">', '<span class="newAppend">');
                expect(jQuery('.newAppend').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').append('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".before", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function (expect) {
                $('.mutate').before();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function (expect) {
                    $('.mutate').before(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles Element as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newBefore';
                $('#mutate').before(elem);
                expect(jQuery('.newBefore').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function (expect) {
                $('#mutate').before($('<div class="newBefore">'));
                expect(jQuery('.newBefore').length).toBe(1);
            });

            it("handles function as content", function (expect) {
                $('.mutate').before(function () {
                    return '<div class="newBefore"></div>';
                });
                expect(jQuery('.newBefore').length).toBe(3);
            });

            it("handles Array as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newBefore';
                var creator = function () {
                    return '<div class="newBefore"></div>';
                };
                $('#mutate').after([elem, creator]);
                expect(jQuery('.newBefore').length).toEqual(2);
            });

        });

        describe("inserts new content before", function () {

            it("adds content before each", function (expect) {
                $('section').before('<div class="newBefore">');
                expect(jQuery('section').prev()).toMatchElements('.newBefore');
            });

            it("takes multiple args", function (expect) {
                $('section').before('<div class="newBefore">', '<a class="newBefore">', '<span class="newBefore">');
                expect(jQuery('.newBefore').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').before('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".clone", function () {

        describe("creates copies of elements", function () {

            it("clones each in collection", function (expect) {
                $('#mutate').append($('.mutate').clone());
                expect(jQuery('.mutate').length).toBe(6);
            });

            it("does not alter the element being cloned", function (expect) {
                var m = document.getElementsByClassName('mutate')[0];
                $('.mutate').clone().html('newStuff');
                expect(m.innerHTML).not.toBe('newStuff');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#mutate').clone().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".empty", function () {

        describe("empties all elements", function () {

            it("clears contents of each", function (expect) {
                $('.mutate').empty();
                var els = jQuery('.mutate').get();
                els.forEach(function(el) {
                    expect(el.innerHTML).toBe('');
                });
            });

            it("clears child nodes", function (expect) {
                $('.mutate').empty();
                var els = jQuery('.mutate').get();
                els.forEach(function(el) {
                    expect(el.childNodes.length).toBe(0);
                });
            });

            it("does not alter the element itself", function (expect) {
                var el = document.getElementById('mutate');
                $('#mutate').empty();
                expect(el).toBe(document.getElementById('mutate'));
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#mutate').empty().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".html", function () {

        describe("handles all types of contents", function () {

            it("gets current contents when no arguments", function (expect) {
                var cur = document.getElementById('mutate').innerHTML;
                expect($('#mutate').html()).toBe(cur);
            });

            it("clears current contents when passed empty string", function (expect) {
                $('#mutate').html('');
                expect(document.getElementById('mutate').innerHTML).toBe('');
            });

            it("handles function as contents", function (expect) {
                $('.mutate').html(function () {
                    return '<div class="newAppend"></div>';
                });
                expect(jQuery('.newAppend').length).toBe(3);
            });

        });

        describe("inserts new html content", function () {

            it("replaces existing content with new", function (expect) {
                $('.mutate').html('<span class="newAppend">');
                expect(jQuery('.newAppend').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').html('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".prepend", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function (expect) {
                $('.mutate').prepend();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function (expect) {
                    $('.mutate').prepend(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles HTMLString (single tag) as content", function (expect) {
                expect(jQuery('h1', '#mutate').length).toBe(0);
                $('#mutate').append('<h1></h1>');
                expect(jQuery('h1', '#mutate').length).toBe(1);
            });

            it("handles HTMLString (multi tag) as content", function (expect) {
                expect(jQuery('h1', '#mutate').length).toBe(0);
                $('#mutate').append('<div><h1></h1></div>');
                expect(jQuery('div h1', '#mutate').length).toBe(1);
            });

            it("handles Element as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newPrepend';
                $('#mutate').prepend(elem);
                expect(jQuery('.newPrepend').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function (expect) {
                $('#mutate').prepend($('<div class="newPrepend">'));
                expect(jQuery('.newPrepend').length).toBe(1);
            });

            it("handles function as content", function (expect) {
                $('.mutate').prepend(function () {
                    return '<div class="newPrepend"></div>';
                });
                expect(jQuery('.newPrepend').length).toBe(3);
            });

            it("handles Array as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newPrepend';
                var creator = function () {
                    return '<div class="newPrepend"></div>';
                };
                $('#mutate').after([elem, creator]);
                expect(jQuery('.newPrepend').length).toEqual(2);
            });

        });

        describe("inserts new content at top", function () {

            it("adds content at top of each", function (expect) {
                $('.mutate').prepend('<span class="newPrepend">');
                expect(jQuery('.newPrepend').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(6);
                expect(jQuery('*', '.mutate')[0].className).toBe('newPrepend');
            });

            it("takes multiple args", function (expect) {
                $('.mutate').prepend('<div class="newPrepend">', '<a class="newPrepend">', '<span class="newPrepend">');
                expect(jQuery('.newPrepend').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').prepend('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".remove", function () {

        describe("deletes elements from the DOM", function () {

            it("removes each in collection", function (expect) {
                $('.mutate').remove();
                expect(jQuery('.mutate').length).toBe(0);
            });

            it("removes child nodes too", function (expect) {
                $('#mutate').remove();
                expect(jQuery('.mutate').length).toBe(0);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#mutate').remove().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".attr", function () {

        describe("handles all types of arguments", function () {

            it("gets attributes from the DOM", function (expect) {
                expect($('#image').attr('alt')).toBe('fakeroo');
            });

            it("sets attributes within dollar", function (expect) {
                $('#image').attr('flash', 'thunder');
                expect($('#image').attr('flash')).toBe('thunder');
            });

            it("returns undefined when no attribute is set", function (expect) {
                expect($('#image').attr('yomomma')).toBe(void 0);
            });

            it("handles function as attribute", function (expect) {
                $('#image').attr('alt', function (oldVal, i) {
                    return 'now' + i + oldVal;
                });
                expect($('#image').attr('alt')).toBe('now0fakeroo');
            });

            it("fails gracefully when there are no matches", function (expect) {
                expect($('bad').attr('irrelevant')).toBe(void 0);
            });

            it('isnt vulnerable to jQuery 3.0.0 infinite loop on mixedCase attr getting bug', function (expect) {
                // https://nvd.nist.gov/vuln/detail/CVE-2016-10707
                expect($('<div></div>').attr('requiRed')).toBe(undefined);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('#image').attr('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".data", function () {

        describe("gets element data", function () {

            it("DOM element has a dollar-node-id but DATA_CACHE_PUBLIC is undefined", function (expect) {
                // This happens when DATA_CACHE_PRIVATE has been used already
                expect($('#data_baby').data('howSlobbery')).toBe('to the bib');
            });

            it("pre-existing data from the DOM", function (expect) {
                expect($('#data_daddy').data('howBad')).toBe('to the bone');
            });

            it("set by dollar", function (expect) {
                $('#data_daddy').data('rides', ['harley','tbird']);
                expect($('#data_daddy').data('rides')).toEqual(['harley','tbird']);
            });

            it("all data at once", function (expect) {
                $('#data_daddy').data('rides', ['harley','tbird']);
                expect($('#data_daddy').data()).toEqual({
                    howBad: 'to the bone',
                    rides: ['harley','tbird']
                });
            });

            it("returns undefined when no data is set", function (expect) {
                expect($('#data_daddy').data('yomomma')).toBe(void 0);
            });

            it('returns falsy data', function (expect) {
                $('#data_daddy').data('foo', 0);
                expect($('#data_daddy').data('foo')).toBe(0);
            });

        });

        describe("sets element data", function () {

            it("one key at a time", function (expect) {
                $('#data_daddy span').data('coolCat', true);
                expect($('#data_daddy span').data()).toEqual({ coolCat: true });
            });

            it("many at a time", function (expect) {
                $('#data_daddy span').data({
                    face: 'scruff',
                    voice: 'gruff'
                });
                expect($('#data_daddy span').data()).toEqual({
                    face: 'scruff',
                    voice: 'gruff'
                });
            });

            it("with complex data types", function (expect) {
                $('#data_daddy').data('fn', function () {});
                expect(typeof $('#data_daddy').data('fn')).toBe('function');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('#data_daddy').data('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".prop", function () {

        describe("handles all types of arguments", function () {

            it("gets a property when it exists", function (expect) {
                // pre-existing
                expect($('#cbox').prop('disabled')).toBe(true);
                // set by dollar
                $('#cbox').prop('checked', true);
                expect($('#cbox').prop('checked')).toBe(true);
            });

            it("returns undefined when no property is set", function (expect) {
                expect($('#cbox').prop('yomomma')).toBe(void 0);
            });

            it("handles function as property", function (expect) {
                $('#cbox').prop('value', function (oldVal, i) {
                    return 'now' + i + oldVal;
                });
                expect($('#cbox').prop('value')).toBe('now0onoff');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('#cbox').prop('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".removeAttr", function () {

        describe("removes one attribute", function () {

            it("removes the specified attribute", function (expect) {
                $('#image').removeAttr('alt');
                expect($('#image').attr('alt')).toBe(void 0);
            });

            it("does not affect other attributes", function (expect) {
                $('#image').removeAttr('alt');
                expect($('#image').attr('title')).not.toBe(void 0);
            });

            it("handles when an attribute does not exist", function (expect) {
                expect($('#image').attr('nonsense')).toBe(void 0);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#image').removeAttr('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".removeData", function () {

        describe("remove element data", function () {

            it("pre-existing data from the DOM", function (expect) {
                $('#data_daddy').removeData('howBad');
                expect($('#data_daddy').data()).toEqual({});
            });

            it("set by dollar", function (expect) {
                $('#data_daddy').data('rides', ['harley','tbird']);
                $('#data_daddy').removeData('rides');
                expect($('#data_daddy').data('rides')).toBe(void 0);
            });

            it("all data at once", function (expect) {
                $('#data_daddy span').data('face', 'scruff');
                $('#data_daddy span').data('voice', 'gruff');
                $('#data_daddy span').removeData();
                expect($('#data_daddy span').data()).toEqual({});
            });

            it("does not remove the wrong data", function (expect) {
                $('#data_daddy').data('sick', 'shades');
                $('#data_daddy').removeData('yomomma');
                expect($('#data_daddy').data()).toEqual({
                    howBad: 'to the bone',
                    sick: 'shades'
                });
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('#data_daddy').removeData('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".removeProp", function () {

        describe("removes one property", function () {

            it("removes the specified property", function (expect) {
                $('#cbox').prop('flash', 'thunder').removeProp('flash');
                expect($('#cbox').prop('flash')).toBe(void 0);
            });

            it("does not affect other properties", function (expect) {
                $('#cbox').removeProp('flash');
                expect($('#cbox').prop('value')).not.toBe(void 0);
            });

            it("handles when an property does not exist", function (expect) {
                $('#cbox').prop('flash', 'thunder');
                expect($('#cbox').prop('nonsense')).toBe(void 0);
                expect($('#cbox').prop('flash')).toBe('thunder');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#cbox').removeProp('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".text", function () {

        describe("handles all types of arguments", function () {

            it("returns text when no args provided", function (expect) {
                // for one element
                expect($('.sel-hidden').text()).toBe('Can You See Me?');
                // combined across child nodes
                expect($('#mutate').text()).toBe(jQuery('#mutate').text());
            });

            it("sets text", function (expect) {
                $('#slim_shady').text('please stand up');
                expect(document.getElementById('slim_shady').innerHTML).toBe('please stand up');
            });

            it("handles function as insertion", function (expect) {
                $('.sel-hidden').text(function (oldVal, i) {
                    return 'now' + i + oldVal;
                });
                expect($('.sel-hidden').text()).toBe('now0Can You See Me?');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('.wonka').text('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".val", function () {

        describe("handles all types of arguments", function () {

            it("returns value when no args provided", function (expect) {
                // for one element
                expect($('#tbox').val()).toBe('momma');
                // returns the first of many
                expect($('input', '#readwrite').val()).toBe('onoff');

                expect($().val()).toBe(jQuery().val());
            });

            it("sets values", function (expect) {
                $('#tbox').val('poppa');
                expect(document.getElementById('tbox').value).toBe('poppa');
            });

            it("handles function as insertion", function (expect) {
                $('#tbox').val(function (oldVal, i) {
                    return 'now' + i + oldVal;
                });
                expect(document.getElementById('tbox').value).toBe('now0momma');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('.wonka').val('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".addClass", function () {

        describe("adds the specified classes", function () {

            it("does not alter existing class names", function (expect) {
                $('.styles').addClass();
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles preexisting' + i);
                });
            });

            it("adds classes when passed a String", function (expect) {
                $('.styles').addClass('one two three');
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles preexisting' + i + ' one two three');
                });
            });

            it("adds classes when passed a function", function (expect) {
                $('.styles').addClass(function (oldVal, i) {
                    return 'now' + i + oldVal;
                });
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles preexisting' + i + ' now' + i + 'styles');
                });
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('.styles').addClass('foo').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".css", function () {

        describe("handles all types of arguments", function () {

            it("gets style properties", function (expect) {
                expect($('.styles').css('backgroundColor')).toBe('rgb(34, 34, 34)');
            });

            it("sets one property", function (expect) {
                $('.styles').css('fontSize', '22px');
                expect($('.styles').css('fontSize')).toBe('22px');
            });

            it("sets multiple properties", function (expect) {
                $('.styles').css({
                    fontSize: '22px',
                    borderRadius: '5px'
                });
                expect($('.styles').css('fontSize')).toBe('22px');
                expect($('.styles').css('borderRadius')).toBe('5px');
            });

            it("returns empty string or default value when no property is set", function (expect) {
                var unstyled = $('.styles').css('border');
                expect(unstyled === '' || unstyled === '0px none rgb(0, 0, 0)').toBe(true);
            });

            it("handles function as a value", function (expect) {
                $('.styles').css('padding', function (oldVal, i) {
                    return (parseInt(oldVal) + i + 1) + 'px';
                });
                expect($('.styles').css('padding')).toBe('34px');
            });

            it('gracefully noOps on getting css from empty dollar collections', function(expect) {

                var errThrownOnGet = false;
                try {
                    $().css('display');
                } catch (e) {
                    errThrownOnGet = true;
                }
                expect(errThrownOnGet).toBe(false);
            });

            it('gracefully noOps on setting css on empty dollar collections', function(expect) {

                var errThrownOnSet = false;
                try {
                    $().css('display', 'block');
                } catch (e) {
                    errThrownOnSet = true;
                }
                expect(errThrownOnSet).toBe(false);
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('.styles').css('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".hasClass", function () {

        describe("finds the specified classes", function () {

            it("does not alter existing class names", function (expect) {
                $('.styles').hasClass();
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles preexisting' + i);
                });
            });

            it("returns true when styles have been added", function (expect) {
                $('.styles').addClass('one two three');
                expect($('.styles').hasClass('two')).toBe(true);
            });

            it("returns false when no match is found", function (expect) {
                expect($('.styles').hasClass('two')).toBe(false);
            });

            it("avoids partial matches", function (expect) {
                $('.styles').addClass('one twothree');
                expect($('.styles').hasClass('two')).toBe(false);
            });

        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".height", function () {

        describe("returns the computed height of the first matched element", function () {

            it("returns the correct numerical height without units", function (expect) {
                jQuery('.mutate').css({ height: '222px' });
                expect($('.mutate').height()).toBe(222);
            });

        });

        describe("special elements", function () {

            it("works on window", function (expect) {
                expect($(window).height()).toBe(jQuery(window).height());
            });

            it("works on document", function (expect) {
                expect($(document).height()).toBe(jQuery(document).height());
            });

        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".hide", function () {

        function isHidden(el) {
            return window.getComputedStyle(el).display === 'none';
        }

        describe("hides all elements in collection", function () {

            it("adds the correct styling", function (expect) {
                $('.styles').each(function (el, i) {
                    expect(isHidden(el)).toBe(false);
                });
                $('.styles').hide();
                $('.styles').each(function (el, i) {
                    expect(isHidden(el)).toBe(true);
                });
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.styles').hide().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".removeClass", function () {

        describe("removes the specified classes", function () {

            it("removes all classes when no value is passed", function (expect) {
                var elems = $('.styles').get();
                $('.styles').removeClass();
                expect(elems[0].className).toBe('');
                expect(elems[1].className).toBe('');
            });

            it("removes classes when String is passed", function (expect) {
                $('.styles').addClass('one two three');
                $('.styles').removeClass('two');
                $('.styles').each(function (el, i) {
                    expect(el.className).not.toBe('');
                    expect(el.className.indexOf(' two ')).toBe(-1);
                });
            });

            it("removes classes when Array is passed", function (expect) {
                $('.styles').addClass('one two three four');
                $('.styles').removeClass(['two','three']);
                $('.styles').each(function (el, i) {
                    expect(el.className).not.toBe('');
                    expect(el.className.indexOf(' two ')).toBe(-1);
                    expect(el.className.indexOf(' three ')).toBe(-1);
                });
            });

            it("removes classes when Function is passed", function (expect) {
                $('.styles').addClass('one two three');
                $('.styles').removeClass(function (old, i) {
                    return 'preexisting' + i;
                });
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles one two three');
                });
            });

            it("avoids partial matches", function (expect) {
                $('.styles').addClass('one twothree');
                $('.styles').removeClass('two');
                $('.styles').each(function (el, i) {
                    expect(el.className.indexOf('one twothree')).not.toBe(-1);
                });
            });

        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".show", function () {

        function isHidden(el) {
            return window.getComputedStyle(el).display === 'none';
        }

        describe("shows all elements in collection", function () {

            it("adds the correct styling", function (expect) {
                $('.sel-hidden').each(function (el, i) {
                    expect(isHidden(el)).toBe(true);
                });
                $('.sel-hidden').show();
                $('.sel-hidden').each(function (el, i) {
                    expect(isHidden(el)).toBe(false);
                });
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.styles').show().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".width", function () {

        describe("returns the computed width of the first matched element", function () {

            it("returns the correct numerical width without units", function (expect) {
                jQuery('.mutate').css({ width: '333px' });
                expect($('.mutate').width()).toBe(333);
            });

        });

        describe("special elements", function () {

            it("works on window", function (expect) {
                expect($(window).width()).toBe(jQuery(window).width());
            });

            it("works on document", function (expect) {
                expect($(document).width()).toBe(jQuery(document).width());
            });

        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".children", function () {

        describe("finds child nodes of the matched elements", function () {

            it("finds them all", function (expect) {
                expect($('#mutate').children()).toMatchElements('.mutate');
            });

            it("filters them by selector", function (expect) {
                expect($('#first_section').children('article')).toMatchElements('#top_list');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').children().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".first", function () {

        describe("reduce to the first element in the collection", function () {

            it("there can be only one", function (expect) {
                expect($('section').first()).toMatchElements('#first_section');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').first().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".last", function () {

        describe("reduce to the last element in the collection", function () {

            it("there can be only one", function (expect) {
                expect($('section').last()).toMatchElements('#last_section');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').last().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".next", function () {

        var emptyDollar = $();

        describe("find the next sibling in the DOM", function () {

            it("gets the next node", function (expect) {
                expect($('#first_section').next()).toMatchElements('#middle_section');
                expect($('#first_section').next().next()).toMatchElements('#last_section');
            });

            it("empties when it runs out of siblings", function (expect) {
                expect($('.mutate').next().next().next()).toEqual(emptyDollar);
            });

            it("filters by selector", function (expect) {
                expect($('#first_section').next()).toMatchElements('#middle_section');
                expect($('#first_section').next('.bad')).toEqual(emptyDollar);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').next().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".parent", function () {

        var emptyDollar = $();

        describe("find the parent of each matched element", function () {

            it("gets the parent node", function (expect) {
                var $p = $('.sel-descendant').parent();
                expect($p[0].nodeName).toBe('P');
                expect($p[1].className).toBe('sel-descendant sel-child');
            });

            it("empties when it runs out of siblings", function (expect) {
                expect($('body').parent().parent().parent()).toEqual(emptyDollar);
            });

            it("filters by selector", function (expect) {
                expect($('.list-item').parent('#top_list')).toMatchElements('#top_list');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').parent().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".prev", function () {

        var emptyDollar = $();

        describe("find the previous sibling in the DOM", function () {

            it("gets the previous node", function (expect) {
                expect($('#first_section').prev()).toMatchElements('#good');
                expect($('#first_section').prev().prev()).toMatchElements('#multiple2');
            });

            it("empties when it runs out of siblings", function (expect) {
                expect($('#top_list').prev()).toEqual(emptyDollar);
            });

            it("filters by selector", function (expect) {
                expect($('#first_section').prev('#good')).toMatchElements('#good');
                expect($('#first_section').prev('.bad')).toEqual(emptyDollar);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').prev().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".siblings", function () {

        describe("finds sibling nodes of the matched elements", function () {

            it("finds them all", function (expect) {
                expect($('h2').siblings().length).toBe(jQuery('#headings').children().length);
            });

            it("filters them by selector", function (expect) {
                expect($('h2').siblings('h3')).toMatchElements(jQuery('h3', '#headings'));
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').siblings().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".off", function () {

        describe("removes an event listener", function () {

            it("clears all previously-bound event listeners", function (expect) {
                var clicked = false;
                $('#slim_shady').click(function () {
                    clicked = true;
                });
                $('#slim_shady').off('click');
                $('#slim_shady').click();
                expect(clicked).toBe(false);
            });

            it("clears one previously-bound event listener", function (expect) {
                var clicked1 = false;
                var clicked2 = false;

                function clickOne () {
                    clicked1 = true;
                }

                function clickTwo () {
                    clicked2 = true;
                }

                $('#slim_shady').on('click', clickOne);
                $('#slim_shady').on('click', clickTwo);

                $('#slim_shady').off('click', clickOne);

                $('#slim_shady').click();
                expect(clicked1).toBe(false);
                expect(clicked2).toBe(true);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').off('foo', function () {}).isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".on", function () {

        describe("binds a native event listener", function () {

            it("hears when a native event is triggered", function (expect) {
                var clicked = false;
                $('#slim_shady').on('click', function (e) {
                    if (e.target.id === 'slim_shady') {
                        clicked = true;
                    }
                });
                $('#slim_shady').click();
                expect(clicked).toBe(true);
            });

        });

        describe("binds a custom event listener", function () {

            it("hears when a custom event is triggered", function (expect) {
                var clicked = false;
                $('#slim_shady').on('goTime', function (e) {
                    if (e.target.id === 'slim_shady') {
                        clicked = true;
                    }
                });
                $('#slim_shady').trigger('goTime');
                expect(clicked).toBe(true);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').on('foo', function () {}).isDollar).toBe(true);
            });
        });

        describe("allows optional custom error handlers", function () {

            it("handles errors in triggered events", function (expect) {
                var handled;
                $.onEventError(function (err) {
                    handled = err.message;
                });
                $('#slim_shady').on('click', function () {
                    throw new Error('bad code');
                });
                $('#slim_shady').click();
                expect(handled).toBe('bad code');
            });

        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe(".trigger", function () {

        describe("firing an event", function () {

            it("triggers native events", function (expect) {
                $('.trigger').click();
                expect(document.getElementById('cbox01').checked).toBe(true);
                expect(document.getElementById('cbox02').checked).toBe(true);
            });

            it("triggers a previously-bound event listener for a native event name", function (expect) {
                var clicked = 0;
                $('#slim_shady').on('click', function () {
                    clicked++;
                });
                $('#slim_shady').trigger('click');
                $('#slim_shady').trigger('click');
                expect(clicked).toBe(2);
            });

            it("triggers a previously-bound event listener for a custom event name", function (expect) {
                var clicked = 0;
                $('#slim_shady').on('goTime', function () {
                    clicked++;
                });
                $('#slim_shady').trigger('goTime');
                $('#slim_shady').trigger('goTime');
                expect(clicked).toBe(2);
            });

            it("passes arguments to the handler", function (expect) {
                var foundArgs = false;
                $('#slim_shady').on('goTime', function (e) {
                    if (e.detail[0] === 'arg1' && e.detail[0] === 'arg1') {
                        foundArgs = true;
                    }
                });
                $('#slim_shady').trigger('goTime', 'arg1', 'arg2');
                expect(foundArgs).toBe(true);
            });

            it("can trigger multiple space-separated events", function (expect) {
                var clicked = 0;
                $('#slim_shady').on('one two three', function () {
                    clicked++;
                });
                $('#slim_shady').trigger('one two three');
                expect(clicked).toBe(3);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').trigger().isDollar).toBe(true);
            });
        });

    });

})();



}),{}],
[(function (require, module, exports) {


(function () {

    describe("$DOLLAR", function () {

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector (ignored)", function (expect) {
                expect(emptyDollar.length).toBe(0);
                expect(emptyDollar.get()).toEqual([]);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector (ignored)", function (expect) {
                    expect($(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($($('a'))).toEqual($('a'));
            });

            it("handles HTMLString as selector (creates nodes)", function (expect) {
                // jQuery includes linebreaks as text nodes when passing HTMLStrings
                // not sure if we want to do this. kind of seems unnecessary? especially
                // since textNodes can't be jQueried...

                var created = $('<div class="created"><p></p></div>')[0];
                expect(created.nodeName).toEqual('DIV');
                expect(created.className).toEqual('created');
                expect(created.childNodes[0].nodeName).toEqual('P');
            });

            it("handles Window as selector", function (expect) {
                expect($(window)[0]).toEqual(window);
            });

            it("handles Node as selector", function (expect) {
                expect($(document)[0]).toEqual(document);
            });

            it("handles NodeList as selector", function (expect) {
                expect($(document.body.childNodes)[0]).toEqual(document.body.childNodes[0]);
            });

            it("handles Element as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($(elem)[0]).toEqual(elem);
            });

            it("handles Array of Elements as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($([elem, elem, elem])[0]).toEqual(elem);
            });

            it("handles function as selector (invokes when documentReady)", function (expect, done) {
                $(function () {
                    expect(true).toBe(true);
                    done();
                });
            });

            it('always returns an instance of Dollar', function () {
                jQuery.each(SELECTORS.ignored, function (name, sel) {
                    it('returns an instance of $dollar', function (expect) {
                        expect($(sel).isDollar).toBe(true);
                    });
                });
                jQuery.each(SELECTORS.nomatch, function (i, sel) {
                    it('returns an instance of $dollar', function (expect) {
                        expect($(sel).isDollar).toBe(true);
                    });
                });
                jQuery.each(SELECTORS.matchJQueryAndDom, function (sel) {
                    it('returns an instance of $dollar', function (expect) {
                        expect($(sel).isDollar).toBe(true);
                    });
                });
                jQuery.each(SELECTORS.matchDom, function (sel) {
                    it('returns an instance of $dollar', function (expect) {
                        expect($(sel).isDollar).toBe(true);
                    });
                });
            });
        });

        describe("avoids unsupported methods", function () {
            it("getElementsByClassName is not supported", function (expect) {
                var fauxElement = {
                    nodeType: 1,
                    querySelectorAll: function () {
                        return [];
                    },
                };
                expect($('.foo', fauxElement)).toEqual($());
            });
        });

        describe("avoids accidental matches", function () {
            jQuery.each(SELECTORS.nomatch, function (i, sel) {
                it("does not match '" + sel + "'", function (expect) {
                    expect($(sel).length).toBe(0);
                });
            });
        });

        describe("mimics jQuery", function () {
            jQuery.each(SELECTORS.matchJQueryAndDom, function (sel) {
                it("matches '" + sel + "'", function (expect) {
                    expect($(sel)).toMatchElements(jQuery(sel));
                });
            });
        });

        describe("matches our DOM", function () {
            jQuery.each(SELECTORS.matchJQueryAndDom, function (sel, match) {
                if (sel && match) {
                    it("matches '" + sel + "'", function (expect) {
                        expect($(sel)).toMatchElements(match);
                    });
                }
            });
            jQuery.each(SELECTORS.matchDom, function (sel, match) {
                it("matches '" + sel + "'", function (expect) {
                    expect($(sel)).toMatchElements(match);
                });
            });
        });

        describe("matches within context", function () {

            var contextSelector = SELECTORS.contextSelector;

            jQuery.each(SELECTORS.context, function (context, match) {
                it("within '" + context + "'", function (expect) {
                    expect($(contextSelector, context)).toMatchElements(match);
                });
            });

            it("within window", function (expect) {
                expect($(contextSelector, window)).toMatchElements(contextSelector);
            });

            it("within document", function (expect) {
                expect($(contextSelector, document)).toMatchElements(contextSelector);
            });

            it("within an Element", function (expect) {
                var elem = document.getElementById('top_list');
                expect($(contextSelector, elem)).toMatchElements(jQuery(contextSelector, elem));
            });

            it("within an Array", function (expect) {
                expect($(contextSelector, [1,2,3])).toMatchElements($(contextSelector));
                expect($(contextSelector, $('section').get())).toMatchElements(jQuery(contextSelector, jQuery('section').get()));
            });

            it("within an Object", function (expect) {
                expect($(contextSelector, { abc: 123 })).toMatchElements($(contextSelector));
            });

            it("within a dollar instance", function (expect) {
                expect($(contextSelector, $('section'))).toMatchElements(jQuery(contextSelector, jQuery('section')));
            });

            it('within an empty dollar instance', function(expect) {
                expect($(contextSelector, $())).toMatchElements(jQuery(contextSelector, jQuery()));
            });

        });

        describe("has a length property", function () {

            it("with zero items", function (expect) {
                expect($().length).toBe(0);
            });

            it("with one item", function (expect) {
                expect($('#slim_shady').length).toBe(1);
            });

            it("with many items", function (expect) {
                expect($('p').length > 1).toBe(true);
            });

        });

        describe("has forEach method", function () {

            it("iterates over the set", function (expect) {
                var times = 0;
                $('section').each(function () { times++; });
                expect(times).toBe(3);
            });

        });

        describe("can get using array notation", function () {

            it("return one item", function (expect) {
                expect($('p')[2].nodeName).toBe('P');
            });

        });

        describe("can get using .get()", function () {

            it("return one item", function (expect) {
                expect($('p').get(2).nodeName).toBe('P');
            });

            it("return all items", function (expect) {
                var all = $('p').get();
                expect(Array.isArray(all)).toBe(true);
                expect(all.length).not.toBe(0);
            });

        });

    });

})();



}),{}]
]);
function require(modules, as) {
    var cache = {};
    var mocks = {};

    function __require_lookup(id) {
        function __require_in_module(relpath) {
            var packedId = modules[id][1][relpath];
            if (!packedId) throw new Error('Missing ' + relpath);
            return mocks[packedId] || __require_lookup(packedId);
        }

        __require_in_module.as = as;

        function _bundl_mock(relpath, mock) {
            var packedId = modules[id][1][relpath];
            mocks[packedId] = mock;
        }

        _bundl_mock.stopAll = function () {
            cache = {};
            mocks = {};
        };

        __require_in_module.cache = {
            mock: _bundl_mock,
            clear: function () {
                cache = {};
            }
        };

        if(!cache[id]) {
            var m = cache[id] = {exports:{}};
            modules[id][0].call(m.exports, __require_in_module, m, m.exports, modules);
            require.onFirstRequire && require.onFirstRequire(m.exports, modules[id][2]);
        }

        return cache[id] ? cache[id].exports : {};
    }

    __require_lookup(0);
}
}).apply(this, (function(_){
return [_, _, _.document];
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {}));

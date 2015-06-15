/*
 * Basic $ components
 * @module $
 */

var $ = function (selector, context) {
    return new $.fn.init(selector, context);
};

$.fn = $.prototype = {
    constructor: $,

    selector: '',

    length: 0,

    splice: Array.prototype.splice,

    isDollar: true,

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {

        var res = [];

        return (num || num === 0) ?

            // Return just the one element from the set
            (num < 0 ? this[num + this.length] : this[num]) :

            // Return all the elements in a clean array
            Array.prototype.push.apply(res, this), res;
        // https://jsperf.com/appending-to-an-array-push-apply-vs-loop/14
        // slice.call is much slower than push.apply for DOM elements
    }
};

// Ops/sec  ~ 6/13/15
// selector - dollar   -   jQuery
// id         1,318,890    1,493,964
// tag        316,465      234,686
// class      344,837      242,628
// pseudo     21,448       23,246

// http://jsperf.com/intent-media-dollarjs-vs-jquery-init
var init = $.fn.init = function (selector, context) {

    context = context || document;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
        return this;
    }

    // HANDLE: strings
    if (typeof selector === 'string') {

        this.selector = selector;
        this.context = context;
        return $.merge(this, $.fn.findBySelector(selector, context));

    // HANDLE: $(DOM Element)
    } else if (selector.nodeType) {

        this.context = this[0] = selector;
        this.length = 1;
        return this;

    // HANDLE: dollar instance
    } else if (selector.isDollar) {

        this.selector = selector.selector;
        this.context = selector.context;
        return $.merge(this, selector.get());

    // HANDLE: dom ready
    } else if (typeof selector === 'function') {
        if (document.readyState === 'complete') {
            setTimeout(domReady);
        } else {
            // TODO: Replace .addEventListner with
            // .on('event') for ie8 support
            document.addEventListener('DOMContentLoaded', domReady);
            window.addEventListener('load', domReady);
        }
    }

    function domReady () {
        if ($.domReadyFnInvoked) {
            return;
        }
        $.domReadyFnInvoked = true;
        selector($);
    }
};

// Ops/sec  ~ 6/13/15
// selector - dollar   -   Sizzle
// id         3,773k       984k
// tag        487k         447k
// class      484k         423k
// complex    56k          50k
$.fn.findBySelector = function (selector, context) {

    // get selector as string
    selector = selector.isDollar ? selector.selector : selector;

    // exit early for improper selectors
    if (!selector || typeof selector !== 'string') {
        return [];
    }

    // normalize context to node or document
    context = context || (this.isDollar && this[0]) || (this.nodeType && this) || document;

    // exit early for improper context
    if (context.nodeType !== 1 && context.nodeType !== 9) {
        return [];
    }

    var push = Array.prototype.push,
        results = [];

    var selectorsMap = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/.exec(selector);
    // selectorsMap will return:
    // if id => ['#foo', 'foo', undefined, undefined]
    // node  => ['body', undefined, body, undefined']
    // class => ['.bar', undefined, undefined, 'bar']
    // else  => null

    if (selectorsMap) {

        // HANDLE: $('#id')
        if (selector = selectorsMap[1]) {
            results.push(context.getElementById(selector));

        // HANDLE: $('tag')
        } else if (selector = selectorsMap[2]) {
            push.apply(results, context.getElementsByTagName(selector));

        // HANDLE: $('.class')
        } else if (selector = selectorsMap[3]) {
            // push.apply(results, context.getElementsByClassName(selector));

            // // ie8 polyfill
            push.apply(results, polyfillGetClass(context, selector));
        }

    // HANDLE: pseudo-selectors, chained classes, etc.
    } else {
        push.apply(results, context.querySelectorAll(selector));
    }

    // HANDLE: $('#id') returns null
    return results[0] ? results : [];

    function polyfillGetClass (con, sel) { // wtf this is so hacky
        return con.getElementsByClassName ?
            con.getElementsByClassName(sel) :
            con.querySelectorAll('.' + sel);
    }
};

$.fn.matchesSelector = function (selector) {

    // get element
    var node = this.isDollar ? this[0] : this;

    // take only DOM nodes, 
    // reject doc.frags, text, document, etc.
    if (node.nodeType !== 1) {
        return false;
    }

    // stringify selector
    if (selector.isDollar) {
        selector = selector.selector;
    }

    // normalise browser nonsense
    var matches = node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector;

    // return matches.call(node, selector);

    // IE8 polyfill
    return matches 
        ? matches.call(node, selector) 
        : polyfillMatches(selector);

    function polyfillMatches (sel) {
        var allMatches = document.querySelectorAll(sel);
        return Array.prototype.indexOf.call(allMatches, node) > -1;
    }
};

$.merge = function (first, second) {
    var len = +second.length,
        j = 0,
        i = first.length;

    for (; j < len; j++) {
        first[i++] = second[j];
    }

    first.length = i;

    return first;
};

$.unique = function (jumbled) {

    var jumbled = jumbled,
        iterable = Object(jumbled),
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
};


// Give the init function the $ prototype for later instantiation
init.prototype = $.fn;

/*
 * Submodules to add...
 * 
 * CORE
 * - init(), [], .length, get()
 * - matchesSelector() - node.matches polyfill
 * - findBySelector() - querySelectorAll polyfill
 *
 * BASE
 * - selectors = .find(), .closest()
 * - filters = .filter(), unique()
 *
 * FILTERS
 * - .is(), .not()
 * - .add()
 *
 * DOM
 * - traversal = .has(), .parent(), .children()
 * - reading = .val(), .text(), .attr()
 *
 * Styles
 * - .css()
 * - .hasClass()
 * - .addClass(), .removeClass()
 *
 * Data
 * - .data(), .removeData()
 *
 * Triggers
 * - .focus(), .blur()
 *
 * Mutation
 * - .empty(), .remove()
 * - .append(), .html(), .prepend()
 *
 * Animation
 * (use css transform if possible)
 *
 */


/////////////////////////////////////

/* BASE
 * - selectors = .find(), .closest()
 * - filters = .filter(), unique()
 */

// Ops/sec  ~  6/13/15
// dollar   -   jQuery
// 116,602      48,145
$.fn.find = function (selector) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [],
        targetLen = this.length;

    selector = selector.isDollar ? selector.selector : selector;

    if (this.isDollar && targetLen > 1) {

        var allMatches = $.fn.findBySelector(selector),
            _this = this;

        matches = $.fn.filter.call(allMatches, function () {
            // keep where context contains instance of allMatches
            for (var i = 0; i < _this.length; i++) {
                if (_this[i] !== this && _this[i].contains(this)) {
                    return true;
                }
            }
        });
    } else {
        matches = $.fn.findBySelector.call(this, selector);
    }

    return $.merge($(), $.unique(matches));
};

// Ops/sec  ~  6/13/15
// dollar   -   jQuery
// 205,279      81,851
$.fn.closest = function (selector, context) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [];
    // if is dollar instance & context was provided, re-wrap the selector in the context
    var foundBySelector = selector.isDollar && (context && $(selector, context) || selector);

    for (var i = 0, len = this.length; i < len; i++) {
        var node = this[i];
        while (node && node !== context) {

            var nodeMatchesSelector = foundBySelector ?
                Array.prototype.indexOf.call(foundBySelector, node) > -1 :
                this.matchesSelector.call(node, selector, context);

            if (this.matchesSelector.call(node, selector, context)) {
                matches.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return $.merge($(), $.unique(matches));
};

// Ops/sec  ~  6/13/15
// dollar   -   jQuery   -  type
// 115,512      67,194      string
// 221,728      145,560     fn
$.fn.filter = function (criteria) {

    if (!this.length) {
        return [];
    }

    if (!criteria) {
        return this;
    }

    var filterFn;

    // HANDLE: function
    if (typeof criteria === 'function') {

        filterFn = criteria;

        // HANDLE: 'selector' || node
    } else if (typeof criteria === 'string' || criteria.isDollar) {

        filterFn = function () {
            return $.fn.matchesSelector.call(this, criteria);
        };

    } else {

        return this;
    }

    var result = [];

    for (var i = 0, len = this.length; i < len; i++) {
        if (filterFn.call(this[i], i, this[i])) {
            result.push(this[i]);
        }
    }

    return $.merge($(), result.length > 1 ? $.unique(result) : result);
};
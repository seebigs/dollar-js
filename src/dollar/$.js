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



// http://jsperf.com/intent-media-dollarjs-vs-jquery-init
var init = $.fn.init = function (selector, context) {

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
        return this;
    }

    context = context || document;

    // HANDLE: strings
    if (typeof selector === 'string') {

        this.selector = selector;
        this.context = context;
        return merge(this, $.fn.findBySelector(selector, context));

    // HANDLE: $(DOM Element)
    } else if (selector.nodeType) {

        this.context = this[0] = selector;
        this.length = 1;
        return this;

    // HANDLE: dollar instance
    } else if (selector.isDollar) {

        this.selector = selector.selector;
        this.context = selector.context;
        return merge(this, selector.get());

    // HANDLE: dom ready
    } else if (typeof selector === 'function') {
        if (document.readyState === 'complete') {
            setTimeout(domReady);
        } else {
            $.fn.on.call(document, 'DOMContentLoaded', domReady);
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

    // thank you to Sizzle for the awesome RegExp
    var selectorsMap = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/.exec(selector);
    // selectorsMap will return:
    // if id => ['#foo', 'foo', undefined, undefined]
    // node  => ['body', undefined, body, undefined']
    // class => ['.bar', undefined, undefined, 'bar']
    // else  => null

    if (selectorsMap) {

        // HANDLE: $('#id')
        if (selector = selectorsMap[1]) {
            var result = document.getElementById(selector);
            if (context !== result && context.contains(result)) {
                results.push(result);
            }

        // HANDLE: $('tag')
        } else if (selector = selectorsMap[2]) {
            push.apply(results, context.getElementsByTagName(selector));

        // HANDLE: $('.class')
        } else if (selector = selectorsMap[3]) {
            // push.apply(results, context.getElementsByClassName(selector));

            // ie8 polyfill
            push.apply(results, polyfillGetClass(context, selector));
        }

    // HANDLE: pseudo-selectors, chained classes, etc.
    } else {
        push.apply(results, context.querySelectorAll(selector));
    }

    // HANDLE: $('#id') returns null
    return results[0] ? results : [];

    function polyfillGetClass (con, sel) { // wtf IE, this is so hacky
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
    if (typeof selector !== 'string' && selector.isDollar) {
        selector = selector.selector;
    // HANDLE: selector is a node
    } else if (selector.nodeType) {
        return this === selector;
    }

    // normalise browser nonsense
    var matches = node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector;

    // return matches.call(node, selector);

    // IE8 polyfill
    return matches ?
        matches.call(node, selector) :
        polyfillMatches(selector);

    function polyfillMatches (sel) {
        // var allMatches = document.querySelectorAll(sel);
        var allMatches = $.fn.findBySelector(sel);
        return Array.prototype.indexOf.call(allMatches, node) !== -1;
    }
};

function merge (first, second) {
    var len = +second.length,
        j = 0,
        i = first.length;

    for (; j < len; j++) {
        first[i++] = second[j];
    }

    first.length = i;

    return first;
}

function unique (jumbled) {

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
}

function isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

function isFunction (fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

function isDomNode(node) {
    return node.nodeType === 1 || node.nodeType === 9;
}


// Give the init function the $ prototype for later instantiation
init.prototype = $.fn;

/*
 * Submodules to add...
 *
 * CORE
 * - init(), [], .length, get(), DOMContentLoaded handler
 * - events = .on() / .bind(), .off() / .unbind()
 * - selectors = .find(), .closest()
 * - filters = .filter(), unique(), .each()
 * - .data(), .removeData()
 *
 * FILTERS
 * - .is(), .not(), .has()
 * - .add()
 *
 * DOM
 * - traversal = .has(), .parent(), .children(), .siblings(), .first(), .last(), .next()
 * - reading = .val(), .text(), .attr(), .prop()
 *
 * Styles
 * - .css()
 * - .hasClass()
 * - .addClass(), .removeClass()
 * - .show(), .hide()
 *
 * Triggers
 * - .focus(), .blur(), .change(), .click(), .resize(), .trigger()
 *
 * Mutation
 * - .empty(), .remove()
 * - .append(), after(), .html(), .prepend(), .before(), .clone()
 *
 * Animation
 * (use css transform if possible)
 *
 */

/////////////////////////////////////

/* BASE
 * - selectors = .find(), .closest()
 * - filters = .filter(), .unique(), .eq()
 * - events = .on()
 */
$.fn.on = $.fn.bind = function (types, handler) {

    if (!types || typeof handler !== 'function') {
        return this;
    }

    // normalize context to [element]
    // separate events
    var context = this.isDollar ? this.get() : this.length ? this : [this],
        events = types.split(' ');

    for (var i = 0, len = context.length; i < len; i++) {
        for (var j = 0, eventLen = events.length; j < eventLen; j++) {
            addEventListener(context[i], events[j], handler);
        }
    }

    return this;

    function addEventListener (context, event, callback) {
        if (Element.prototype.addEventListener) {
            context.addEventListener(event, callback, false);
        } else {
            // IE8 Polyfill
            if (event === 'DOMContentLoaded') {
                var event = new Event();
                event.srcElement = window;
                addEventPolyfillWrapper(event);
            } else {
                context.attachEvent('on' + event, callback);
            }
        }

        function addEventPolyfillWrapper (e) {
            e.target = e.srcElement;
            e.currentTarget = context;
            if (callback.handleEvent) {
                callback.handleEvent(e);
            } else {
                // FIXIT: wat is var listener?
                // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
                
                // listener.call(context, e);
            }
        }
    }
};

$.fn.off = $.fn.unbind = function (types, handler) {

    if (!types || typeof handler !== 'function') {
        return this;
    }

    // normalize context to [element]
    // separate events
    var context = this.isDollar ? this.get() : this.length ? this : [this],
        events = types.split(' ');

    for (var i = 0, len = context.length; i < len; i++) {
        for (var j = 0, eventLen = events.length; j < eventLen; j++) {
            removeEventListener(context[i], events[j], handler);
        }
    }

    return this;

    function removeEventListener(context, event, callback) {
        if (Element.prototype.removeEventListener) {
            context.removeEventListener(event, callback, false);
        } else {
            // The person who wrote this polyfill was on meth:
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
            
            // TODO: write a human readable polyfill for IE8
            console.error('IE8 polyfill at: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener')
        }
    }
};

$.fn.find = function (selector) {

    if (!selector || !this.length) {
        return merge($(), []);
    }

    var matches = [];

    if (this.length > 1) {
        var allMatches = $(selector);

        var i = 0,
            collectionLen = this.length;

        var j = 0,
            targetLen = allMatches.length;

        for (; i < collectionLen; i++) {
            for (; j < targetLen; j++) {
                if (this[i] !== allMatches[j] && this[i].contains(allMatches[j])) {
                    matches.push(allMatches[j]);
                }
            }
        }
    } else {
        if (isDomNode(selector)) {
            if (this[0] !== selector && this[0].contains(selector)) {
                matches.push(selector);
            }
        } else {
            matches = $.fn.findBySelector.call(this, selector);
        }
    }

    return merge($(), matches.length > 1 ? unique(matches) : matches);
};


$.fn.closest = function (selector, context) {

    if (!selector) {
        return merge($(), []);
    }

    var matches = [];
    // if is dollar or node, re-wrap the selector in the context
    var foundBySelector = (selector.isDollar || selector.nodeType) && $(selector, context);

    for (var i = 0, len = this.length; i < len; i++) {
        var node = this[i];
        while (node && node !== context) {

            var nodeMatchesSelector = foundBySelector ?
                Array.prototype.indexOf.call(foundBySelector, node) !== -1 :
                this.matchesSelector.call(node, selector, context);

            if (nodeMatchesSelector) {
                matches.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return merge($(), unique(matches));
};


$.fn.filter = function (criteria) {

    if (!this.length) {
        return merge($(), []);
    }

    if (!criteria) {
        return merge($(), []);
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

    return merge($(), result.length > 1 ? unique(result) : result);
};

var DOLLAR_DATA_CACHE = [],
    DOLLAR_DATA_ATTR = 'dollarElemId',
    getInternalElementId,
    setInternalElementId;

if (document.documentElement.dataset) {
    getInternalElementId = getInternalElementIdModern;
    setInternalElementId = setInternalElementIdModern;
} else {
    getInternalElementId = getInternalElementIdCompat;
    setInternalElementId = setInternalElementIdCompat;
}

function getInternalElementIdModern (elem, referenceId) {
    return parseInt(elem.dataset[DOLLAR_DATA_ATTR]);
}

function getInternalElementIdCompat (elem, referenceId) {
    return parseInt(elem.getAttribute('data-' + DOLLAR_DATA_ATTR));
}

function setInternalElementIdModern (elem, referenceId) {
    elem.dataset[DOLLAR_DATA_ATTR] = referenceId;
}

function setInternalElementIdCompat (elem, referenceId) {
    elem.setAttribute('data-' + DOLLAR_DATA_ATTR, referenceId);
}

$.fn.data = function (key, value) {

    if (!this.length || !key) {
        return this;
    }

    var i = 0,
        len = this.length,
        cachedElemData = {};

    if (!value) {
        return DOLLAR_DATA_CACHE[getInternalElementId(this[0])][key];
    }

    for (; i < len; i++) {
        cachedElemData[key] = value;
        uniqueElemId = DOLLAR_DATA_CACHE.push(cachedElemData);
        setInternalElementId(this[i], uniqueElemId);
    }

    return this;
};

$.fn.eq = function (index) {
    if (this[index]) {
        return $(this[index]);
    }
};

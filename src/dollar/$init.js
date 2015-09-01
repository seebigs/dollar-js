/*
 * Basic $ init and constructor
 * @module $
 */

var $ = function (selector, context) {
    return new $.fn.init(selector, context);
};

/* jshint ignore:start */
var undef,
    utils,
    strType = 'string',
    fnType = 'function',
    objProto = Object.prototype,
    objToString = objProto.toString,
    objHasProp = objProto.hasOwnProperty,
    arrProto = Array.prototype,
    arrPush = arrProto.push,
    arrSlice = arrProto.slice;
/* jshint ignore:end */

$.fn = $.prototype = {
    constructor: $,

    selector: '',

    length: 0,

    isDollar: true,

    // Hack to make console.log display selected elements as an Array
    splice: arrProto.splice,

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {
        return num === undef ?
            // Return all the elements in a clean array
            arrSlice.call(this, 0) :
            // Return just the one element from the set
            (num < 0 ? this[num + this.length] : this[num]);
    }
};

$.fn.init = function (selector, context) {

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
        return this;
    }

    // reduce to context to array of nodes, single node, or document
    context = context ?
        (typeof context === strType && findBySelector(context)) || (context.isDollar && context.get()) || (context.nodeType && [context]) :
        [document.documentElement];

    // HANDLE: strings
    if (typeof selector === strType) {

        // HANDLE: HTML strings
        if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {

            this.selector = selector;
            this.context = context;
            return utils.merge(this, parseHTML());

        // HANDLE: string selectors
        } else {
            this.selector = selector;
            this.context = context;
            return utils.merge(this, findBySelector(selector, context));
        }

    // HANDLE: $(DOM Element)
    } else if (selector.nodeType) {

        this.context = this[0] = selector;
        this.length = 1;
        return this;

    // HANDLE: dollar instance
    } else if (selector.isDollar) {

        this.selector = selector.selector;
        // FIXIT: this is redundantly touching the dom
        this.context = context === document.documentElement ? selector.context : context;
        return utils.merge(this, selector.get());

    // HANDLE: dom ready
    } else if (typeof selector === fnType) {
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

    function parseHTML () {
        var singleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(selector),
            writableContext = context.createElement ? context : document;

        // HANDLE: '<div></div>', etc.
        if (singleTag) {
            return [writableContext.createElement(singleTag[1])];
        // HANDLE: '<div><p></p></div>', etc.
        } else {
            var disposableContainer = writableContext.createElement('div');
            disposableContainer.innerHTML = selector;
            return disposableContainer.children;
        }
    }
};

// Give the init function the $ prototype for later instantiation
$.fn.init.prototype = $.fn;



/* Internals for matching a collection of selected elements */

function findBySelector (selector, context) {
    // where selector is a string, dollar collection, or dom node
    // and context is array of dom nodes or single dom node

    var results = [];

    // normalize selector to string or exit early
    if (typeof selector !== strType) {
        if (selector.isDollar && selector.selector) {
            selector = selector.selector;
        } else if (selector.nodeType) {
            return selector === context ? results : [selector];
        } else {
            return results;
        }
    }

    if (context) {
        if (!context.nodeType) {
            // if its an array of nodes (or a dollar collection), we'll need to search within each
            if (context.length > 1) {
                var i = 0,
                    len = context.length;

                for (; i < len; i++) {
                    arrPush.apply(results, findBySelector(selector, context[i]));
                }

                return results;
            } else {
                context = context[0];
            }
        // exit early if context is not a HTML node or the document
        } else if (context.nodeType !== 1 && context.nodeType !== 9) {
            return results;
        }
    } else {
        context = document.documentElement;
    }

    // ------------------------------------------
    // at this point, selector must be a string
    // and context must be a HTML node or the document
    // ------------------------------------------

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
            if (result && context !== result && context.contains(result)) {
                results.push(result);
            }

        // HANDLE: $('tag')
        } else if (selector = selectorsMap[2]) {
            arrPush.apply(results, nodeListToArray(context.getElementsByTagName(selector)));

        // HANDLE: $('.class')
        } else if (selector = selectorsMap[3]) {
            arrPush.apply(results, nodeListToArray(polyfillGetClass(context, selector)));
        }

    // HANDLE: pseudo-selectors, chained classes, etc.
    } else {
        arrPush.apply(results, nodeListToArray(context.querySelectorAll(selector)));
    }

    return results;

    function nodeListToArray (nl) {
        // needed for browsers like PhantomJS that balk at this
        return arrSlice.call(nl, 0);
    }

    function polyfillGetClass (con, sel) {
        // ie8 polyfill
        // wtf IE, this is so hacky
        return con.getElementsByClassName ?
            con.getElementsByClassName(sel) :
            con.querySelectorAll('.' + sel);
    }
}

$.fn.matchesSelector = function (selector) {

    // get element
    var node = this.isDollar ? this[0] : this;

    // take only DOM nodes,
    // reject doc.frags, text, document, etc.
    if (node.nodeType !== 1) {
        return false;
    }

    // stringify selector
    if (typeof selector !== strType && selector.isDollar) {
        selector = selector.selector;
    // HANDLE: selector is a node
    } else if (utils.isElement(selector)) {
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
        var allMatches = findBySelector(sel);
        return Array.prototype.indexOf.call(allMatches, node) !== -1;
    }
};


// element data (use private cache by default)
var DATA_ATTR_ID = 'dollar-id',
    PRIVATE_DATA_CACHE = [null];

function getInternalElementId (elem) {
    return parseInt(elem.getAttribute(DATA_ATTR_ID)) || undef;
}

function setInternalElementId (elem, referenceId) {
    return elem.setAttribute(DATA_ATTR_ID, referenceId);
}

function getElementData (elem, attr, cache) {
    cache = cache || PRIVATE_DATA_CACHE;

    var id = getInternalElementId(elem);

    if (!attr) {
        return cache[id];
    }

    return id && cache[id] && cache[id][attr];
}

function setElementData (elem, attr, value, cache) {
    cache = cache || PRIVATE_DATA_CACHE;

    var id = getInternalElementId(elem);

    if (id) {
        cache[id][attr] = value;
    } else {
        var cachedElemData = {};
        cachedElemData[attr] = value;
        id = cache.push(cachedElemData) - 1;
        setInternalElementId(elem, id);
    }
}

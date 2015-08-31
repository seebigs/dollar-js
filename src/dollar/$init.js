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
    nodeTypeSub = 'nodeType',
    lengthSub = 'length',
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
            (num < 0 ? this[num + this[lengthSub]] : this[num]);
    }
};

$.fn.init = function (selector, context) {

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
        return this;
    }

    // context = context || document.documentElement;
    context = context ?
        (typeof context === strType && $.fn.findBySelector(context)[0]) || (context.isDollar && context.selector) || (context[nodeTypeSub] && context) :
        document.documentElement;
    // context needs to be a node - if multiple nodes, we need to handle a search within each? yikes.

    // HANDLE: strings
    if (typeof selector === strType) {

        // HANDLE: HTML strings
        if (selector[0] === '<' && selector[selector[lengthSub] - 1] === '>' && selector[lengthSub] >= 3) {

            this.selector = selector;
            this.context = context;
            return utils.merge(this, parseHTML());

        // HANDLE: string selectors
        } else {
            this.selector = selector;
            this.context = context;
            return utils.merge(this, $.fn.findBySelector(selector, context));
        }

    // HANDLE: $(DOM Element)
    } else if (selector[nodeTypeSub]) {

        this.context = this[0] = selector;
        this[lengthSub] = 1;
        return this;

    // HANDLE: dollar instance
    } else if (selector.isDollar) {

        this.selector = selector.selector;
        this.context = selector.context;
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

$.fn.findBySelector = function (selector, context) {

    if (selector[nodeTypeSub]) {
        return selector === context ? [] : [selector];
    }

    // get selector as string
    selector = selector.isDollar ? selector.selector : selector;

    // exit early for improper selectors
    if (!selector || typeof selector !== strType) {
        return [];
    }

    // normalize context to node or document
    context = context || (this.isDollar && this[0]) || (this[nodeTypeSub] && this) || document;

    // exit early for improper context
    if (context[nodeTypeSub] !== 1 && context[nodeTypeSub] !== 9) {
        return [];
    }

    var results = [];

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
            arrPush.apply(results, nodeListToArray(context.getElementsByTagName(selector)));

        // HANDLE: $('.class')
        } else if (selector = selectorsMap[3]) {
            arrPush.apply(results, nodeListToArray(polyfillGetClass(context, selector)));
        }

    // HANDLE: pseudo-selectors, chained classes, etc.
    } else {
        arrPush.apply(results, nodeListToArray(context.querySelectorAll(selector)));
    }

    // HANDLE: $('#id') returns null
    return results[0] ? results : [];

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
};

$.fn.matchesSelector = function (selector) {

    // get element
    var node = this.isDollar ? this[0] : this;

    // take only DOM nodes,
    // reject doc.frags, text, document, etc.
    if (node[nodeTypeSub] !== 1) {
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
        var allMatches = $.fn.findBySelector(sel);
        return Array.prototype.indexOf.call(allMatches, node) !== -1;
    }
};




/*
 * Submodules to add...
 *
 * INIT
 * + .init(), [], [lengthSub], .get()
 * +  DOMContentLoaded
 *
 * FN
 * + .each()
 * - .on() / .bind()
 * - .off() / .unbind()
 * + .find()
 * + .closest()
 * + .filter()
 * + .eq()
 *
 * FILTER
 * + .is()
 * + .not()
 * + .has()
 * + .add()
 *
 * TRAVERSE
 * + .parent()
 * + .children()
 * + .siblings()
 * + .first()
 * + .last()
 * + .next()
 *
 * READWRITE
 * + .val()
 * + .text()
 * + .attr()
 * + .removeAttr()
 * + .prop()
 * + .removeProp()
 * + .data()
 * + .removeData()
 *
 * STYLE
 * + .css()
 * + .hasClass()
 * + .addClass()
 * + .removeClass()
 * + .show()
 * + .hide()
 *
 * TRIGGER
 * - .trigger()
 * - .focus()
 * - .blur()
 * - .change()
 * - .click()
 * - .resize()
 *
 * MUTATE
 * - .empty()
 * - .remove()
 * - .html()
 * - .append()
 * - .prepend()
 * - .after()
 * - .before()
 * - .clone()
 *
 * ANIMATE
 * (use css transform if possible)
 *
 */

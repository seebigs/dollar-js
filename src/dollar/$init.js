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

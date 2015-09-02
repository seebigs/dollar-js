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
    this.context = normalizeContext(context);

    // HANDLE: strings
    if (typeof selector === strType) {

        this.selector = selector;

        // HANDLE: string search within provided context
        if (context) {
            return utils.merge(this, findBySelector(selector, this.context));
        } else {

            // TODO: we should optimize this logic for, firstly
            // all selectors, then for ids, lastly for HTML.
            // also, this HTML check will fail if the selector
            // is front loaded with whitespace.
            
            // jQuery uses the selector[0] etc. check and then falls
            // into /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/
            // which builds [null, 'htmlString', null] for HTML
            // and ['#selector', undefined, 'selector'] for ids

            // HANDLE: HTML strings
            if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) { // fastest
                return utils.merge(this, parseHTML());
            
            // HANDLE: Ids
            } else if (/^(?:\s*#([\w-]*))$/.test(selector)) { // we shouldn't run this for all
                this[0] = document.getElementById(selector.replace(/\s*#/, ''));
                this.length = 1;
                return this;

            // HANDLE: all other selectors (optimizes context to document.docElement)
            } else {
                return utils.merge(this, findBySelector(selector));
            }


            // // HANDLE: either HTML or an Id
            // // TODO: this regexp needs some testing
            // // criteria: accept 'HTML', '#id', '  #id  ' and nothing else
            // if (/^\s*<[\w\W]+>[^>]*$|^\s*#[\w-]*\s*$/.test(selector)) {

            //     // HANDLE: Ids
            //     if (selector[0] === '#' || selector.test(/\s*#/)) {
            //         // this[0] = document.getElementById(selector.slice(1, selector.length));
            //         this[0] = document.getElementById(selector.replace(/[\s#]+|[\s]+/g, '')); // 10k ops/sec slower than selector.slice -- bumps us slower than jQuery
            //         this.length = 1;
            //         return this;

            //     // HANDLE: HTML strings
            //     } else {
            //         return utils.merge(this, parseHTML());
            //     }

            // // HANDLE: all other selectors
            // } else {
            //     return utils.merge(this, findBySelector(selector, this.context));
            // }
        }

    // HANDLE: $(DOM Element)
    } else if (selector.nodeType) {

        this.context = this[0] = selector;
        this.length = 1;
        return this;

    // HANDLE: dollar instance
    } else if (selector.isDollar) {

        this.selector = selector.selector;
        this.context = context || selector.context;
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
};

// Give the init function the $ prototype for later instantiation
$.fn.init.prototype = $.fn;

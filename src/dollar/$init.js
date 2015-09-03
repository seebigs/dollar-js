/*
 * Basic $ init and constructor
 * @module $
 */

var $ = function (selector, context) {
    return new $.fn.init(selector, context);
};

/* jshint ignore:start */
var undef,
    strType = 'string',
    fnType = 'function',

    objProto = Object.prototype,
    objToString = objProto.toString,
    objHasProp = objProto.hasOwnProperty,

    arrProto = Array.prototype,
    arrPush = arrProto.push,
    arrSlice = arrProto.slice,

    docConstruct = document,
    docElement = document.documentElement,

    domReadyInvoked = false,
    utils;
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

    // reduce to context to array of nodes, single node, or docConstruct
    this.context = normalizeContext(context);

    // HANDLE: strings
    if (typeof selector === strType) {

        this.selector = selector;

        // HANDLE: string search within provided context
        if (context) {
            return utils.merge(this, getNodes(selector, this.context));
        } else {

            // HANDLE: Ids
            if (selector[0] === '#' && /^#[\w-]+$/.test(selector)) {

                var foundById = docConstruct.getElementById(selector.substr(1));

                if (foundById) {
                    this[0] = foundById;
                    this.length = 1;
                }

                return this;

            // HANDLE: HTML strings
            } else if (selector[0] === '<' && selector[selector.length - 1] === '>') {
                return utils.merge(this, parseHTML(selector));

            // HANDLE: all other selectors & untrimmed Ids / HTML strings
            } else {
                return utils.merge(this, getNodes(selector, false));
            }
        }

    // HANDLE: dollar instance
    } else if (selector.isDollar) {

        if (!context) {
            this.context = selector.context;
        }

        this.selector = selector.selector;
        return utils.merge(this, selector.get());

    // HANDLE: $(DOM Element)
    } else if (selector.nodeType) {

        this.context = this[0] = selector;
        this.length = 1;
        return this;

    // HANDLE: $([DOM Elements])
    } else if (utils.isArray(selector)) {

        var i = 0;

        for (; i < selector.length; i++) {
            this[i] = selector[i];
        }

        this.length = selector.length;
        return this;

    // HANDLE: dom ready
    } else if (typeof selector === fnType) {
        if (docConstruct.readyState === 'complete') {
            setTimeout(domReady);
        } else {
            $.fn.on.call(docConstruct, 'DOMContentLoaded', domReady);
        }
    }

    function domReady () {
        if (domReadyInvoked) {
            return;
        }

        domReadyInvoked = true;
        selector($);
    }
};

// Give the init function the $ prototype for later instantiation
$.fn.init.prototype = $.fn;

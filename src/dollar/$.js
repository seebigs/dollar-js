/**
 * Basic $ components
 * @module $
 */

var $ = function (selector, context) {
    return new $.fn.init(selector, context);
};

$.merge = function (first, second) {
    var len = +second.length,
        j = 0,
        i = first.length;

    for (; j < len; j++) {
        first[ i++ ] = second[ j ];
    }

    first.length = i;

    return first;
};

$.fn = $.prototype = {
    constructor: $,

    selector: '',

    length: 0,

    isDollar: true,

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {
        return (num || num === 0) ?

            // Return just the one element from the set
            (num < 0 ? this[ num + this.length ] : this[ num ]) :

            // Return all the elements in a clean array
            Array.prototype.slice.call(this);
    }
};

var init = $.fn.init = function (selector, context) {
    context = context || document;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
        return this;
    }

    // Handle strings
    if (typeof selector === 'string') {

        this.selector = selector;
        this.context = context;
        return $.merge(this, $.fn.findBySelector(selector, context));
        // return $.merge(this, context.querySelectorAll(selector));

    // HANDLE: $(DOM Element)
    } else if (selector.nodeType) {

        this.context = this[0] = selector;
        this.length = 1;
        return this;

    } 

    if (selector.isDollar) {
        this.selector = selector.selector;
        this.context = selector.context;
    }

    return $.merge(this, selector.get());
};


$.fn.matchesSelector = function (selector, context) {

    
    // un jQuerify the node - we want the dom element
    var node = this.isDollar ? this[0] : this;
    // reject all but element nodes (document fragments, text nodes, etc.)
    if (node.nodeType !== 1) {
        return false;
    }

    // if selector is $ instance, get its selector
    if (selector.isDollar) {
        selector = selector.selector;
    }

    // returns bool whether node matches selector (duh?)
    var nativeMatchesSelector = node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector;

    // if native version exists, use it
    // if (nativeMatchesSelector) {
        return nativeMatchesSelector.call(node, selector);
    // } else { // ie8 polyfill
        
    //     context = context.isDollar ? context[0] : document.querySelectorAll(context)[0];
    //     if (context) {
    //         if (typeof context === 'string') {
    //             context = document.querySelectorAll(context)[0];
    //         } else if (context.isDollar) {
    //             context = context[0];
    //         } else {
    //             context = $(context);
    //         }
    //     } else {
    //         context = document;
    //     }

    //     var matchingElements = context.querySelectorAll(selector);
    //     return Array.prototype.indexOf.call(matchingElements, node) > -1;
    // }
};

$.fn.findBySelector = function (selector, context) {

    context = context || this.length && (this.isDollar ? this[0] : this) || document;

    // if id => ['#foo', 'foo', undefined, undefined]
    // node  => ['body', undefined, body, undefined']
    // class => ['.bar', undefined, undefined, 'bar']
    // else  => null
    var selectorsMap = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/.exec(selector);

    if (selectorsMap) {

        // HANDLE: $('#id')
        if (selector = selectorsMap[1]) {
            return [].slice.call([context.getElementById(selector)]);

        // HANDLE: $('tag')
        } else if (selector = selectorsMap[2]) {
            return [].slice.call(context.getElementsByTagName(selector));

        // HANDLE: $('.class')
        } else if (selector = selectorsMap[3]) {
            return [].slice.call(context.getElementsByClassName(selector));
        }

    } else {
        return [].slice.call(context.querySelectorAll(selector));
    }

};


// Give the init function the $ prototype for later instantiation
init.prototype = $.fn;

/*
 * Submodules to add...
 * 
 * CORE
 * - init(), [], .length
 * - get(), matchesSelector()
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
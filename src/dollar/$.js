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
    } 

    // HANDLE: dollar instance
    if (selector.isDollar) {
        this.selector = selector.selector;
        this.context = selector.context;
    }

    return $.merge(this, selector.get());
};

$.fn.matchesSelector = function (selector) {
    
    // get element
    var node = this.isDollar ? this[0] : this;

    // take only element nodes, reject doc. frags, text, etc.
    if (node.nodeType !== 1) {
        return false;
    }

    // stringify selector
    if (selector.isDollar) {
        selector = selector.selector;
    }

    // normalise browser nonsense
    var matches = node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector;

    return matches.call(node, selector);

    // IE8 polyfill
    // return matches 
    //     ? matches.call(node, selector) 
    //     : polyfillMatches(selector);

    // function polyfillMatches (sel) {
    //     var allMatches = document.querySelectorAll(sel);
    //     return Array.prototype.indexOf.call(allMatches, node) > -1;
    // }
};

$.fn.findBySelector = function (selector, context) {

    // normalize context
    context = context || this.length && (this.isDollar ? this[0] : this) || document;

    // normalize selector
    var selectorsMap = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/.exec(selector);
    // if id => ['#foo', 'foo', undefined, undefined]
    // node  => ['body', undefined, body, undefined']
    // class => ['.bar', undefined, undefined, 'bar']
    // else  => null
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

            // ie8 polyfill
            // return [].slice.call(polyfillGetClass(context, selector));
        }

    // HANDLE: pseudo-selectors, chained classes, etc.
    } else {
        return [].slice.call(context.querySelectorAll(selector));
    }

    // function polyfillGetClass (con, sel) { // wtf this is so hacky
    //     return con.getElementsByClassName 
    //         ? con.getElementsByClassName(sel) 
    //         : con.querySelectorAll('.' + sel);
    // }
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
 
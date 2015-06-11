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

        return $.merge(this, context.querySelectorAll(selector));

    // HANDLE: $(DOM Element)
    } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;

    }

    // Handle $ instance
    if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
    }

    return $.merge(this, selector.get());
};

// Give the init function the $ prototype for later instantiation
init.prototype = $.fn;

/*
 * Submodules to add...
 *
 * Base Package Includes
 * - selectors = [], .length, .get()
 * - filters = .find(), .closest(), .add(), .filter(), .not(), is()
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

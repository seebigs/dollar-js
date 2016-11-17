/**
 * Add elements that match a new selector to the current set
 * @module filter
 * @param {Selector} selector A selector expression to match elements against
 * @option {Context} context The context to use while searching for matches
 * @returns DollarJS (expanded set)
 * @example $('p').add('span')
 */

$.fn.add = function (selector, context) {
    if (!selector) {
        return this;
    }

    return collect(this, $(selector, context));
};

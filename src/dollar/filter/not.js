/**
 * Remove elements from the current set that match a new selector
 * @module filter
 * @param {Selector} selector A selector expression to match elements against
 * @returns DollarJS (reduced set)
 * @example $('p').not('.foo')
 */

$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    var criteria;

    if (typeof selector === fnType) {
        criteria = function (node, i) {
            return !selector.call(node, i, node);
        };

    } else {
        criteria = function (node, i) {
            return !nodeMatchesSelector(node, selector, i);
        };
    }

    return collect(this.filter(criteria));
};

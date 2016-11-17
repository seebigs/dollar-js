/**
 * Reduce the set of matched elements to those that have a descendant that matches a new selector
 * @module filter
 * @param {Selector} selector A selector expression to match elements against
 * @returns DollarJS (reduced set)
 * @example $('p').has('span')
 */

$.fn.has = function (selector) {
    if (!selector) {
        return $();
    }

    return this.filter(function () {
        return !!getNodesBySelector(selector, this).length;
    });
};

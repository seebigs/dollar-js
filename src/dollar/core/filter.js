/**
 * Reduce the matched set to the ones that match an additional selector
 * @module core
 * @param {Selector} selector A selector expression to match elements against
 * @returns DollarJS (reduced set)
 * @example $('p').filter('.foo')
 */

$.fn.filter = function (selector) {
    if (!this.length || !selector) {
        return $();
    }

    return collect(filterNodes(this, selector));
};

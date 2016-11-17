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

    var matches = [];

    for (var i = 0, len = this.length; i < len; i++) {
        if (nodeMatchesSelector(this[i], selector, i)) {
            matches.push(this[i]);
        }
    }

    return collect(matches);
};

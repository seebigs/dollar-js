/**
 * Get the descendants of each element in the matched set that match a given selector
 * @module core
 * @param {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').find('span')
 */

$.fn.find = function (selector) {
    if (!selector || !this.length) {
        return $();
    }

    return collect(getNodesBySelector(selector, this));
};

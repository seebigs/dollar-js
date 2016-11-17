/**
 * Get the next sibling of each element in the current set
 * If <b>selector</b> is provided, the results will only include siblings that match the selector
 * @module traverse
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').next()
 * @example $('p').next('.foo')
 */

$.fn.next = function (selector) {
    var subsequents = [],
        nextNode;

    for (var i = 0, len = this.length; i < len; i++) {
        nextNode = this[i].nextElementSibling;
        if (nextNode) {
            subsequents.push(nextNode);
        }
    }

    return collect(selector ? $.fn.filter.call(subsequents, selector) : subsequents);
};

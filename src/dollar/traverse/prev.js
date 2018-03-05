/**
 * Get the previous sibling of each element in the current set
 * If <b>selector</b> is provided, the results will only include siblings that match the selector
 * @module traverse
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').prev()
 * @example $('p').prev('.foo')
 */

$.fn.prev = function (selector) {
    var previousNodes = [],
        prevNode;

    for (var i = 0, len = this.length; i < len; i++) {
        prevNode = this[i].previousElementSibling;
        if (prevNode) {
            previousNodes.push(prevNode);
        }
    }

    return collect(selector ? $.fn.filter.call(previousNodes, selector) : previousNodes);
};

/**
 * Get the children of each element in the current set
 * The results will only include direct children and will not traverse any deeper descendants
 * If <b>selector</b> is provided, the results will only include children that match the selector
 * @module traverse
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').children()
 * @example $('p').children('.foo')
 */

$.fn.children = function (selector) {
    var childNodes = [];

    for (var i = 0, len = this.length; i < len; i++) {
        utils.merge(childNodes, this[i].children);
    }

    return collect(selector ? $.fn.filter.call(childNodes, selector) : childNodes);
};

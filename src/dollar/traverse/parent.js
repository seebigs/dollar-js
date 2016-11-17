/**
 * Get the parents of each element in the current set
 * The results will only include direct parents and will not traverse any higher ancestors
 * If <b>selector</b> is provided, the results will only include parents that match the selector
 * @module traverse
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').parent()
 * @example $('p').parent('.foo')
 */

$.fn.parent = function (selector) {
    var parentElems = [],
        parent;

    for (var i = 0, len = this.length; i < len; i++) {
        parent = this[i].parentNode;

        if (parent) {
            parentElems.push(parent);
        }
    }

    return collect(selector ? $.fn.filter.call(parentElems, selector) : parentElems);
};

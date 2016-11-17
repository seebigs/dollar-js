/**
 * Iterate over each matched element
 * Aliased as <b>.forEach()</b> for convenience
 * @module core
 * @param {Function} iteratee A function to be invoked once for each element. (element, index, collection) are passed as arguments. Within the iteratee, `this` refers to the current element.
 * @returns DollarJS (chainable)
 * @example $('p').each(function (elem) { console.log(elem); })
 * @example $('p').each(function () { console.log(this); })
 */

$.fn.each = $.fn.forEach = function (iteratee) {
    utils.each(this, iteratee);
    return this;
};

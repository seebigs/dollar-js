/**
 * Reduce the set of matched elements to the last in the set
 * This is equivalent to .eq(-1)
 * @module traverse
 * @returns DollarJS (reduced set)
 * @example $('p').last()
 */

$.fn.last = function () {
    return this.eq(-1);
};

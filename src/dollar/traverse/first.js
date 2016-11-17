/**
 * Reduce the set of matched elements to the first in the set
 * This is equivalent to .eq(0)
 * @module traverse
 * @returns DollarJS (reduced set)
 * @example $('p').first()
 */

$.fn.first = function () {
    return this.eq(0);
};

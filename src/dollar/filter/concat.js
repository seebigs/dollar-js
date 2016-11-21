/**
 * Merge an Array of Elements into the current set
 * @module filter
 * @param {Array} elements An Array of Elemenets to be merged into the current set
 * @option {Array} additionalElements... Additional Arrays to be merged one after another
 * @returns DollarJS (expanded set)
 * @example $('p').concat([elem1, elem2], [elem3])
 */

$.fn.concat = function () {
    var args = arrSlice.call(arguments);
    args.unshift(this);
    return collect.apply(this, args);
};

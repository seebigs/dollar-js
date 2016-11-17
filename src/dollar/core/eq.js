/**
 * Reduce the matched set to the one element at a specific index
 * @module core
 * @param {Integer} index Indicates the position of the element to keep. Negative values count backwards from the end of the set.
 * @returns DollarJS (reduced set)
 * @example $('p').eq(3)
 * @example $('p').eq(-1)
 */

$.fn.eq = function (index) {
    index = Array.isArray(index) ? NaN : parseInt(index, 10); // prevent parsing array of numbers

    return index >= 0 ?
        $(this[index]) :
        $(this[this.length + index]); // have to + a -index in order to subtract
};

/**
 * Get the current height of the first element in the set
 * This method does not set values. Use .css() instead.
 * @module style
 * @returns Height
 * @example $('div').height()
 */

$.fn.height = function () {
    return parseFloat(this.eq(0).css('height')) || 0;
};

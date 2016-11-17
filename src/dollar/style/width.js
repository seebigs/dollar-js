/**
 * Get the current width of the first element in the set
 * This method does not set values. Use .css() instead.
 * @module style
 * @returns Width
 * @example $('div').width()
 */

$.fn.width = function () {
    return parseFloat(this.eq(0).css('width')) || 0;
};

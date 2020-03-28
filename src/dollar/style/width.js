/**
 * Get the current width of the first element in the set
 * This method does not set values. Use .css() instead.
 * @module style
 * @returns Width
 * @example $('div').width()
 */

$.fn.width = function () {
    var firstEl = this[0];
    if (firstEl === window) {
        return getViewportWidth();
    }
    if (firstEl === document) {
        return getDocumentWidth();
    }
    return parseFloat(this.eq(0).css('width')) || 0;
};

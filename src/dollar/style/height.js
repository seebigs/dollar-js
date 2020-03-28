/**
 * Get the current height of the first element in the set
 * This method does not set values. Use .css() instead.
 * @module style
 * @returns Height
 * @example $('div').height()
 */

$.fn.height = function () {
    var firstEl = this[0];
    if (firstEl === window) {
        return getViewportHeight();
    }
    if (firstEl === document) {
        return getDocumentHeight();
    }
    return parseFloat(this.eq(0).css('height')) || 0;
};

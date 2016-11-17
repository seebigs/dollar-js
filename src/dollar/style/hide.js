/**
 * Hide each element in the current set
 * This method does not support animation. Use .fadeOut() instead.
 * @module style
 * @returns DollarJS (chainable)
 * @example $('p').hide()
 */

$.fn.hide = function () {
    this.each(function () {
        this.style.display = 'none';
    });

    return this;
};

/**
 * Display each element in the current set
 * This method does not support animation. Use .fadeIn() instead.
 * @module style
 * @returns DollarJS (chainable)
 * @example $('p').show()
 */

$.fn.show = function () {
    this.each(function () {
        this.style.display = getNonHiddenDisplayValue(this);
        this.style.visibility = 'visible';
        this.style.opacity = 1;
    });

    return this;
};

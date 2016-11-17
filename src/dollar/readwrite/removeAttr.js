/**
 * Remove an attribute from each element in the current set
 * @module readwrite
 * @param {String} name The name of the attribute
 * @returns DollarJS (chainable)
 * @example $('img').removeAttr('title')
 */

$.fn.removeAttr = function (name) {
    this.each(function () {
        this.removeAttribute(name);
    });

    return this;
};

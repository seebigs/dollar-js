/**
 * Remove a property from each element in the current set
 * @module readwrite
 * @param {String} name The name of the property
 * @returns DollarJS (chainable)
 * @example $('img').removeProp('title')
 */

$.fn.removeProp = function (name) {
    this.each(function () {
        if (nodeSupportsAttrProp(this)) {
            delete this[name];
        }
    });

    return this;
};

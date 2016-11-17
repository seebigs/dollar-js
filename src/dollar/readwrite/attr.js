/**
 * Get or set attributes on the current set
 * If <b>value</b> is provided, this will set the attribute on each element and return the current set for chaining
 * If <b>value</b> is not passed, this will return the value of the attribute for the first element in the current set
 * There is a difference between <a href="http://lucybain.com/blog/2014/attribute-vs-property/" target="_blank">attr vs prop</a>
 * @module readwrite
 * @param {String} name The name of the attribute
 * @option {Any} value A value to be set. Most values will be converted to a String before setting. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Value or DollarJS (chainable)
 * @example $('img').attr('title')
 * @example $('img').attr('title', 'Click Me')
 * @example $('img').attr('title', function(previousValue, index){ return 'Click Me'; })
 */

$.fn.attr = function (name, value) {

    if (value === undef) {
        return getAttributeSafely(this[0], name);
    }

    this.each(function (elem, i) {
        if (nodeSupportsAttrProp(elem)) {
            if (typeof value === fnType) {
                value = value(getAttributeSafely(elem, name), i);
            }

            elem.setAttribute(name, value);
        }
    });

    return this;
};

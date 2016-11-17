/**
 * Get or set the style of each element in the current set
 * If <b>property</b> is a String and <b>value</b> is NOT passed, this will return the current value for that style property on the first element in the set
 * If <b>property</b> is a String and <b>value</b> is provided, this will set the value for that style property on all elements in the set
 * If <b>property</b> is an Object, styles will be set for each key:value pair on all elements in the set
 * @module style
 * @param {String|Object} property The String name of a css property, or an Object with key:value pairs
 * @option {String} value The value to be set. Numerical values should include units.
 * @returns Current style value or DollarJS (chainable)
 * @example $('p').css('color')
 * @example $('p').css('color', '#336699')
 * @example $('p').css({ color: '#336699', fontSize: '14px' })
 */

$.fn.css = function (property, value) {
    if (!property) {
        return this;
    }

    var i, len = this.length;
    var elem, map = {};

    if (typeof property === strType) {

        // get one value
        if (value === undef) {
            return getStyle(this[0], property);
        }

        // set with one value
        map[property] = value;

    } else if (utils.isObject(property)) {
        // set using provided object as map
        map = property;
    }

    function setPropertyByMap (v, k) {
        elem.style[k] = typeof v === fnType ? v.call(elem, getStyle(elem, k), i) : v;
    }

    for (i = 0; i < len; i++) {
        elem = this[i];
        utils.each(map, setPropertyByMap);
    }

    return this;
};

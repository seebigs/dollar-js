/**
 * Get or set properties on the current set
 * If <b>value</b> is provided, this will set the property on each element and return the current set for chaining
 * If <b>value</b> is not passed, this will return the value of the property for the first element in the current set
 * There is a difference between <a href="http://lucybain.com/blog/2014/attribute-vs-property/" target="_blank">attr vs prop</a>
 * @module readwrite
 * @param {String} name The name of the property
 * @option {Any} value A value to be set. Most values will be converted to a String before setting. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Value or DollarJS (chainable)
 * @example $('input').prop('checked')
 * @example $('input').prop('checked', true)
 * @example $('input').prop('checked', function(previousValue, index){ return true; })
 */

$.fn.prop = function (name, value) {

    if (value === undef) {
        return getPropertyFromElem(this[0], name);
    }

    this.each(function (elem, i) {
        if (nodeSupportsAttrProp(elem)) {
            if (typeof value === fnType) {
                value = value(getPropertyFromElem(elem, name), i);
            }

            elem[name] = value;
        }
    });

    return this;
};

function getPropertyFromElem (elem, name) {
    return nodeSupportsAttrProp(elem) ? elem[name] : undef;
}

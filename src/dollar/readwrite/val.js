/**
 * Get or set a value on the current set
 * If <b>value</b> is provided, this will set the value for each element and return the current set for chaining
 * If no arguments are passed, this will return the value of the first element in the current set
 * @module readwrite
 * @option {Any} value A value to be set. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Value or DollarJS (chainable)
 * @example $('p').val()
 * @example $('p').val('foo')
 * @example $('p').val(function(previousValue, index){ return 'foo'; })
 */

$.fn.val = function (value) {
    if (value === undef) {
        return this[0] ? this[0].value : undef;
    }

    for (var i = 0; i < this.length; i++) {
        if (this[i].nodeType !== 1) {
            break;
        }

        if (typeof value === fnType) {
            value = value.call(this[i], this[i].value, i);
        }

        this[i].value = value;
    }

    return this;
};

/**
 * Get or set text contents on the current set
 * If <b>value</b> is provided, this will set the text contents for each element and return the current set for chaining
 * If no arguments are passed, this will return the text contents of the first element in the current set
 * @module readwrite
 * @option {Any} value A value to be set. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Text or DollarJS (chainable)
 * @example $('p').text()
 * @example $('p').text('foo')
 * @example $('p').text(function(previousValue, index){ return 'foo'; })
 */

$.fn.text = function (value) {
    if (value !== undef) {
        this.each(function (elem, i) {
            if (elem.nodeType === 1 || elem.nodeType === 11 || elem.nodeType === 9) {
                if (typeof value === fnType) {
                    elem.textContent = value(elem.textContent, i);
                } else {
                    elem.textContent = value;
                }
            }
        });

        return this;
    }

    var ret = '';

    this.each(function (elem) {
        var nodeType = elem.nodeType;

        if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof elem.textContent === strType) {
                ret += elem.textContent;
            }

        } else if (nodeType === 3 || nodeType === 4) {
            ret += elem.nodeValue;
        }
    });

    return ret;
};

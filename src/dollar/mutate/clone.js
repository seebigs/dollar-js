/**
 * Clone each element in the current set
 * Uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode" target="_blank">cloneNode</a> with deep=true
 * @module mutate
 * @returns DollarJS (cloned set)
 * @example $('p').clone()
 */

$.fn.clone = function () {
    var elem, i, len = this.length;

    for (i = 0; i < len; i++) {
        elem = this[i];
        if (elem.nodeType === 1 || elem.nodeType === 11) {
            this[i] = elem.cloneNode(true);
        }
    }

    return this;
};

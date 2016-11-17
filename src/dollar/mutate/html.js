/**
 * Get or set the HTML contents of the current set
 * If <b>htmlString</b> is provided, this will set the contents of each element and return the current set for chaining
 * If no argument is passed, this will return the contents of the first element in the current set
 * @module mutate
 * @option {HTMLString} htmlString A string of HTML markup to be created and inserted
 * @returns HTMLString or DollarJS (chainable)
 * @example $('p').html()
 * @example $('p').html('&lt;div&gt;')
 */

$.fn.html = function (htmlString) {
    var elem, i, len = this.length,
        first = this[0];

    if (htmlString === undef) {
        if (first && first.nodeType === 1) {
            return first.innerHTML;
        }

        return undef;
    }

    try {
        for (i = 0; i < len; i++) {
            elem = this[i];
            if (elem.nodeType === 1) {
                elem.innerHTML = htmlString;
            }
        }

    } catch (e) {
        this.empty().append(htmlString);
    }

    return this;
};

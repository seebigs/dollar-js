/**
 * Insert content after each element in the current set
 * @module mutate
 * @param {Content} content Content to be inserted. Existing nodes will be moved instead of duplicated.
 * @option {Content} content Additional args are handled the same as the first, each in turn
 * @returns DollarJS (chainable)
 * @example $('p').after('&lt;div class="new-stuff"&gt;')
 */

$.fn.after = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        var parent = elem.parentNode;
        if (parent) {
            if (elem.nextSibling) {
                parent.insertBefore(content, elem.nextSibling);
            } else {
                parent.appendChild(content);
            }
        }
    });
};

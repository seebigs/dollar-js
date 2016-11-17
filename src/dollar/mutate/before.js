/**
 * Insert content before each element in the current set
 * @module mutate
 * @param {Content} content Content to be inserted. Existing nodes will be moved instead of duplicated.
 * @option {Content} content Additional args are handled the same as the first, each in turn
 * @returns DollarJS (chainable)
 * @example $('p').before('&lt;div class="new-stuff"&gt;')
 */

$.fn.before = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.parentNode) {
            elem.parentNode.insertBefore(content, elem);
        }
    });
};

/**
 * Insert content into each element in the current set (at the bottom)
 * @module mutate
 * @param {Content} content Content to be inserted. Existing nodes will be moved instead of duplicated.
 * @option {Content} content Additional args are handled the same as the first, each in turn
 * @returns DollarJS (chainable)
 * @example $('p').append('&lt;div class="new-stuff"&gt;')
 */

$.fn.append = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        elem.appendChild(content);
    });
};

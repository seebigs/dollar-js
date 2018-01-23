/**
 * Insert content into each element in the current set (at the bottom)
 * @module mutate
 * @param {Content} content Content to be inserted. Existing nodes will be moved instead of duplicated.
 * @option {Content} content Additional args are handled the same as the first, each in turn
 * @returns DollarJS (Newly Created Element)
 * @example $('<div>New Div</div>').appendTo('#root')
 * @example $('<div>New Div</div>').appendTo($element)
 */

$.fn.appendTo = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.nodeType !== 3) {
            elem.appendChild(content);
            return elem.lastChild;
        }
    });
};

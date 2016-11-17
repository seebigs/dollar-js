/**
 * Find the closest ancestor that matches a given selector
 * For each selected element, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree
 * @module core
 * @param {Selector} selector A selector expression to match elements against
 * @option {Context} context The context to use while searching for matches
 * @returns DollarJS (new set)
 * @example $('p').closest('.outer')
 */

$.fn.closest = function (selector, context) {
    if (!selector) {
        return $();
    }

    var allMatches = getNodesBySelector(selector, context);
    var onlyClosest = [];
    var node;

    for (var i = 0, len = this.length; i < len; i++) {
        node = this[i];
        while (node && node !== context) {
            if (arrProto.indexOf.call(allMatches, node) !== -1) {
                onlyClosest.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return collect(onlyClosest);
};

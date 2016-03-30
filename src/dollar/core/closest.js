
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
            if (allMatches.indexOf(node) !== -1) {
                onlyClosest.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return collect(onlyClosest);
};


$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    var criteria;

    if (typeof selector === fnType) {
        criteria = function (node, i) {
            return !selector.call(node, i, node);
        };

    } else {
        criteria = function (node, i) {
            return !nodeMatchesSelector(node, selector, i);
        };
    }

    return collect(this.filter(criteria));
};

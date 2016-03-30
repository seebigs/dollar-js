
$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    var criteria;

    if (typeof selector === fnType) {
        criteria = function (i, node) {
            return !selector.call(node, i, node);
        };

    } else {
        criteria = function (i, node) {
            return !nodeMatchesSelector(node, i, selector);
        };
    }

    return collect(this.filter(criteria));
};

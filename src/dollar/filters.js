/**
 * FILTERS
 * add(), not(), is()
 *
 * @module FILTERS
 */


$.fn.add = function (selector, context) {
    if (!selector) {
        return this;
    }

    var addNodes = $(selector, context);
    return $.merge(this, $.fn.unique.call(addNodes));
};

$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    selector = selector.isDollarInstance ? selector.selector : selector;

    var _this = this;
    var criteria = typeof selector !== 'function' ? 

        !_this.matchesSelector.bind(this, selector) 

        : (function (idx, node) {
            // hacky, but we want only those nodes that the filter function does not match
            return !selector.call(node, idx, node);
        });

    var result = this.filter(criteria);

    return $.merge($(), result.length > 1 ? $.fn.unique.call(result) : result);
};

$.fn.is = function (selector) {
    if (!selector) {
        return false;
    }

    return !!this.filter(selector).length;
};
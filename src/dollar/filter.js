/**
 * FILTER
 */

$.fn.is = function (selector) {
    return !!selector && !!this.filter(selector).length;
};

$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    var criteria,
        excluded;

    if (utils.isFunction(selector)) {
        criteria = function (idx, node) {
            return !selector.call(node, idx, node);
        };
    } else {
        criteria = function () {
            return !matchesSelector(this, selector);
            // return !$.fn.matchesSelector.call(this, selector);
        };
    }

    excluded = this.filter(criteria);

    return utils.merge($(), excluded.length === 1 ? excluded : utils.unique(excluded));
};

$.fn.add = function (selector, context) {
    return !!selector && utils.unique(utils.merge(this, $(selector, context)));
};

$.fn.has = function (selector) {
    if (!selector) {
        return utils.merge($(), []);
    }

    // fetch node containing selector match
    return this.filter(function () {
        return !!utils.unique(findBySelector(selector, this)).length;
    });
};

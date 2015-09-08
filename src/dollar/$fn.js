/*
 * Extend $ instances/selections
 * @module $
 */

$.fn.each = function (iteratee) {
    utils.each(this.get(), iteratee);
};

$.fn.find = function (selector) {

    var matches = [];

    if (!selector || !this.length) {
        return utils.merge($(), matches);
    }

    if (utils.isElement(selector)) {
        var i = 0,
            len = this.length;

        for (; i < len; i++) {
            if (this[i] !== selector && this[i].contains(selector)) {
                matches.push(selector);
            }
        }
    } else {
        matches = getNodes(selector, this);
    }

    return utils.merge($(), utils.unique(matches));
};

$.fn.closest = function (selector, context) {

    if (!selector) {
        return utils.merge($(), []);
    }

    var matches = [],
        foundBySelector;

    // should really speed test indexOf vs matchesSelector to determine which to use here:
    // var foundBySelector = context && (selector.isDollar || selector.nodeType) && getNodes(selector, context);

    if (context || selector.isDollar || selector.nodeType) {
        foundBySelector = getNodes(selector, context);
    }

    for (var i = 0, len = this.length; i < len; i++) {
        var node = this[i];
        while (node && node !== context) {

            var nodeMatchesSelector = foundBySelector ?
                Array.prototype.indexOf.call(foundBySelector, node) !== -1 :
                matchesSelector(node, selector, context);

            if (nodeMatchesSelector) {
                matches.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return utils.merge($(), utils.unique(matches));
};

$.fn.filter = function (criteria) {

    if (!this.length || !criteria) {
        return utils.merge($(), []);
    }

    var filterFn;

    // HANDLE: function
    if (utils.isFunction(criteria)) {

        filterFn = criteria;

    // HANDLE: 'selector' || dollar instance || node
    } else if (typeof criteria === strType || criteria.isDollar || utils.isElement(criteria)) {

        filterFn = function () {
            return matchesSelector(this, criteria);
        };

    } else {
        return this;
    }

    var result = [],
        i = 0,
        len = this.length;

    for (; i < len; i++) {
        if (filterFn.call(this[i], i, this[i])) {
            result.push(this[i]);
        }
    }

    return utils.merge($(), utils.unique(result));
};

$.fn.eq = function (index) {
    index = parseInt(index, 10);

    return index >= 0 ?
        $(this[index]) :
        $(this[this.length + index]); // have to + a -index in order to subtract
};

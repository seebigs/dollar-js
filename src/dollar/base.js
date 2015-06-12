/**
 * BASE
 * - selectors = [], .length, .get(), .find(), .closest()
 * - filters = .add(), .filter(), .not(), is(), unique()
 *
 * @module BASE
 */

$.fn.closest = function (selector, context) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [];
    var foundBySelector = selector.isDollarInstance && (context && $(selector, context) || selector);

    for (var i = 0; i < this.length; i++) {
        var node = this[i];
        while (node && node !== context) {

            var nodeMatchesSelector = foundBySelector ? foundBySelector.index(node) > -1 : this.matchesSelector.call(node, selector, context);

            if (nodeMatchesSelector) {
                matches.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return $.merge($(), matches.length > 1 ? this.unique.call(matches) : matches);
};

$.fn.find = function (selector) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [];
    var node = this[0];

    if (selector.isDollarInstance && selector.length > 1) {
        // loop each of the dollarInstance objects
        for (var i = 0; i < selector.length; i++) {
            // get children matching the selector
            var childNodes = node.querySelectorAll(selector[i]);
            if (childNodes.length) {
                // loop children, pushing each into matches
                for (var j = 0; j < childNodes.length; j++) {
                    matches.push(childNodes[j]);
                }
            }
        }
    } else {
        matches = node.querySelectorAll(selector);
    }

    return $.merge($(), matches.length > 1 ? this.unique.call(matches) : matches);
};


$.fn.unique = function () {

    var iterable = Object(this);

    if (!iterable.length) {
        return this;
    }

    var unique = [];
    for (var i = 0; i < iterable.length; i++) {
        if (unique.indexOf(iterable[i]) === -1) {
            unique.push(iterable[i]);
        }
    }

    return unique;
};

$.fn.add = function (selector, context) {
    if (!selector) {
        return this;
    }

    var addNodes = $(selector, context);
    return $.merge($(), addNodes.length > 1 ? this.unique.call(addNodes) : addNodes);
};

/**
 * @param criteria - function, string, or dollarInstance
 * @param context - criteria is function ? 'this' for fn : a selector to compare nodes against
 */
$.fn.filter = function (criteria, context) {

    if (!this.length) {
        return [];
    }

    if (!criteria) {
        return this;
    }

    var _this = this;
    // convert to an iterable object (string 'test' => { 0:'t', 1:'e' }; etc.)
    var iterable = Object(this);

    // will define this based on the criteria
    var filterFn;

    if (typeof criteria === 'function') {

        filterFn = criteria;
        criteria = void 0;
        context = context || void 0;

    } else if (typeof criteria === 'string' || criteria.isDollarInstance) {

        criteria = criteria.isDollarInstance ? criteria.selector : criteria;
        context = context || document;
        filterFn = function () {
            return _this.matchesSelector.call(this, criteria);
        };

    } else {
        return this;
    }

    var result = [];

    for (var i = 0; i < iterable.length; i++) {
        if (iterable[i] && filterFn.call(iterable[i], i, iterable[i])) {
            result.push(iterable[i]);
        }
    }

    return $.merge($(), result.length ? this.unique.call(result) : result);
};

$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    selector = selector.isDollarInstance ? selector.selector : selector;

    var _this = this;
    var criteria = typeof selector === 'function' ? selector : !_this.matchesSelector.bind(this, selector);

    var result = this.filter(criteria);

    return $.merge($(), result.length > 1 ? this.unique.call(result) : result);
};

$.fn.is = function (selector) {
    if (!selector) {
        return false;
    }

    return !!this.filter(selector).length;
};

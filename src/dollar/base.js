/**
 * BASE
 * - selectors = [], .length, .get(), .find(), .closest()
 * - filters = .add(), .filter(), .not(), is(), unique()
 *
 * @module BASE
 */

$.fn.find = function (selector) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [];

    selector = selector.isDollarInstance ? selector.selector : selector;

    if (this.length > 1) {
        for (var i = 0; i < this.length; i++) {
            var childNodes = this[i].querySelectorAll(selector);
            if (childNodes.length) {
                for (var j = 0; j < childNodes.length; j++) {
                    matches.push(childNodes[j]);
                }
            }
        }
    } else {
        // $.fn.find is invoked from $.fn.has via .call & therefore
        // we need to comport with 'this' as a dom node.
        // Notably, jQuery does not support indirect invocation
        var node = this.isDollarInstance ? this[0] : this;
        matches = node.querySelectorAll(selector);
    }

    return $.merge($(), $.fn.unique.call(matches));
};

$.fn.closest = function (selector, context) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [];
    // if is dollar instance & context was provided, re-wrap the selector in the context
    var foundBySelector = selector.isDollarInstance && (context && $(selector, context) || selector);

    for (var i = 0; i < this.length; i++) {
        var node = this[i];
        while (node && node !== context) {

            var nodeMatchesSelector = foundBySelector ? Array.prototype.indexOf.call(foundBySelector, node) > -1 : this.matchesSelector.call(node, selector, context);

            if (nodeMatchesSelector) {
                matches.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return $.merge($(), $.fn.unique.call(matches));
};

$.fn.add = function (selector, context) {
    if (!selector) {
        return this;
    }

    var addNodes = $(selector, context);
    return $.merge(this, $.fn.unique.call(addNodes));
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

    return $.merge($(), $.fn.unique.call(result));
};

$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    selector = selector.isDollarInstance ? selector.selector : selector;

    var _this = this;
    var criteria = typeof selector !== 'function' ? !_this.matchesSelector.bind(this, selector) : (function (idx, node) {
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

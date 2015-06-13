/**
 * BASE
 * - selectors = .find(), .closest()
 * - filters = .filter(), unique()
 *
 * @module BASE
 */


// Ops/sec          dollar   -   jQuery
// find(string)     89,531       43,109 (6/13/15)
// find(node)       89,611       174,765 (6/13/15)
$.fn.find = function (selector) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [];

    selector = selector.isDollarInstance ? selector.selector : selector;

    if (this.isDollarInstance) {
        for (var i = 0; i < this.length; i++) {

            var childNodes = this[i].querySelectorAll(selector);
            if (childNodes.length) {
                matches.push(Array.prototype.slice.call(childNodes));
                for (var j = 0; j < childNodes.length; j++) {
                    matches.push(childNodes[j]);
                }
            }
        }

        // matches = [].concat.apply([], matches);
    } else {
        // $.fn.find is invoked from $.fn.has via .call & therefore
        // we need to comply with 'this' as a dom node.
        // Notably, jQuery does not support indirect invocation
        var node = this.isDollarInstance ? this[0] : this;
        matches = node.querySelectorAll(selector);
    }

    return $.merge($(), $.fn.unique.call(matches));
};

// Ops/sec              dollar   -   jQuery
// closest(string)      370,306      107,539 (6/13/15)
// closest(node)        398,632      131,862 (6/13/15)

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

            if (this.matchesSelector.call(node, selector, context)) {
                matches.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return $.merge($(), $.fn.unique.call(matches));
};

/**
 * @param criteria - function, string, or dollarInstance
 * @param context - criteria is function ? 'this' for fn : a selector to compare nodes against
 */

// Ops/sec              dollar   -   jQuery
// filter(string)       244,456      141,163 (6/13/15)
// filter(node)         254,689      262,501 (6/13/15)
// filter(function)     2,224        2,496   (6/13/15)

$.fn.filter = function (criteria) {

    if (!this.length) {
        return [];
    }

    if (!criteria) {
        return this;
    }

    // will define this based on the criteria
    var filterFn;

    if (typeof criteria === 'function') {

        filterFn = criteria;

    } else if (typeof criteria === 'string' || criteria.isDollarInstance) {

        var _this = this;
        filterFn = function () {
            return _this.matchesSelector.call(this, criteria);
        };

    } else {

        return this;
    }

    var result = [];

    for (var i = 0; i < this.length; i++) {
        if (this[i] && filterFn.call(this[i], i, this[i])) {
            result.push(this[i]);
        }
    }

    return $.merge($(), result.length > 1 ? $.fn.unique.call(result) : result);
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

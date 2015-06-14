/**
 * BASE
 * - selectors = .find(), .closest()
 * - filters = .filter(), unique()
 *
 * @module BASE
 */


// Ops/sec  ~  6/13/15
// dollar   -   jQuery
// 22,030       41,859
$.fn.find = function (selector) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [], targetLen = this.length;

    selector = selector.isDollar ? selector.selector : selector;

    if (this.isDollar && targetLen > 1) {

        var allMatches = $.fn.findBySelector(selector),
            _this = this;

        matches = $.fn.filter.call(allMatches, function () {
            // keep where context contains instance of allMatches
            for (var i = 0; i < _this.length; i++) {
                if (_this[i] !== this && _this[i].contains(this)) {
                    return true;
                }
            }
        });
    } else {
        matches = $.fn.findBySelector.call(this, selector);
    }

    return $.merge($(), $.fn.unique(matches));
};

// Ops/sec  ~  6/13/15
// dollar   -   jQuery
// 119,537      70,761
$.fn.closest = function (selector, context) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [];
    // if is dollar instance & context was provided, re-wrap the selector in the context
    var foundBySelector = selector.isDollar && (context && $(selector, context) || selector);

    for (var i = 0, len = this.length; i < len; i++) {
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

    return $.merge($(), $.fn.unique(matches));
};

// Ops/sec  ~  6/13/15
// dollar   -   jQuery - type
// 67,406       68,302 - string
// 1,940        2,027  - fn
$.fn.filter = function (criteria) {

    if (!this.length) {
        return [];
    }

    if (!criteria) {
        return this;
    }

    var filterFn;

    // HANDLE: function
    if (typeof criteria === 'function') {

        filterFn = criteria;

    // HANDLE: 'selector' || node
    } else if (typeof criteria === 'string' || criteria.isDollar) {

        filterFn = function () {
            return $.fn.matchesSelector.call(this, criteria);
        };

    } else {

        return this;
    }

    var result = [];

    for (var i = 0, len = this.length; i < len; i++) {
        if (filterFn.call(this[i], i, this[i])) {
            result.push(this[i]);
        }
    }

    return $.merge($(), result.length > 1 ? $.fn.unique(result) : result);
};

$.fn.unique = function (jumbled) {

    var jumbled = jumbled || this,
        iterable = Object(jumbled),
        distinct = [];

    if (!iterable.length) {
        return jumbled;
    }

    for (var i = 0, len = iterable.length; i < len; i++) {
        if (distinct.indexOf(iterable[i]) === -1) {
            distinct.push(iterable[i]);
        }
    }

    return distinct;
};

/**
 * BASE
 * - selectors = .find(), .closest()
 * - filters = .filter(), unique()
 *
 * @module BASE
 */


// Ops/sec          dollar   -   jQuery
// find(string)     84,584       40,408 (6/14/15)
// find(node)       79,473       160,198 (6/14/15)
// find(string)     125,688      230,360 single target
// find(node)       147,089      102,347 single target
$.fn.find = function (selector) {

    if (!selector) {
        return $.merge($(), []);
    }

    var matches = [], len = this.length;

    selector = selector.isDollar ? selector.selector : selector;

    // if there's only one element in the selection
    // disregard this terrible nested loop

    if (this.isDollar && len > 1) {
        // 

        // Ops/sec          dollar   -   jQuery
        // find(string)     84,584       40,408 (6/14/15)
        // find(node)       79,473       160,198 (6/14/15)

        for (var i = 0; i < len; i++) {
            var childNodes = $.fn.findBySelector.call(this[i], selector);
            // var childNodes = this[i].querySelectorAll(selector),
                childLen = childNodes.length;

            if (childLen) {
                for (var j = 0; j < childLen; j++) {
                    matches.push(childNodes[j]);
                }
            }
        }


        // below is a simplified jQuery implementaion though
        // somehow they're able to out perform this drastically

        // Ops/sec          dollar   -   jQuery
        // find(string)     20,134       39,546 (6/14/15)
        // find(node)       19,940       164,964 (6/14/15)


        // I'll bet some of it has to do with their use of sizzle(selector) vs querySelectorAll

        // var matchingNodes = document.querySelectorAll(selector), 
        //     self = this;

        // return $.merge($(), $.fn.filter.call(matchingNodes, function () {
        //     for (var i = 0; i < self.length; i++) {
        //         if (self[i].contains(this)) {
        //             return true;
        //         }
        //     }
        // }));


    } else {

        // $.fn.find is invoked from $.fn.has via .call & therefore
        // we need to comply with 'this' as a dom node.
        var node = len ? this[0] : this;
        matches = $.fn.findBySelector.call(node, selector);
    }

    return $.merge($(), $.fn.unique(matches));
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

/**
 * @param criteria - function, string, or dollarInstance
 * @param context - criteria is function ? 'this' for fn : a selector to compare nodes against
 */

// Ops/sec              dollar   -   jQuery
// filter(string)       231,572      107,579 (6/14/15)
// filter(node)         237,477      231,425 (6/14/15)
// filter(function)     2,200        2,385   (6/14/15)

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

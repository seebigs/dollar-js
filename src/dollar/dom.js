/**
 * DOM
 * - traversal = .has(), .parent(), .children()
 * - filters = .add(), .not(), .is()
 * - reading = .val(), .text(), .attr()
 *
 * @module DOM
 */

// traversal
$.fn.has = function (selectors) {
    var _this = this;

    var scopedNodes = this.filter(function () {
        return !!_this.find.call(this, selectors).length;
    });

    return $.merge($(), $.fn.unique.call(scopedNodes));
};

$.fn.parent = function () {
    var parentElems = [];

    for (var i = 0; i < this.length; i++) {
        var parent = this[i].parentNode;
        if (parent) {
            parentElems.push(parent);
        }
    }

    return $.merge($(), $.fn.unique.call(parentElems));
};

$.fn.children = function (selectors) {
    var childNodes = [];

    if (this.length === 1) {
        childNodes = selectors ? this.filter.call(this[0].children, selectors) : this[0].children;
    } else {
        for (var i = 0; i < this.length; i++) {
            var children = this[i].children;

            if (children.length) {
                for (var j = 0; j < children.length; j++) {
                    if (selectors) {
                        if (this.matchesSelector.call(children[j], selectors)) {
                            childNodes.push(children[j]);
                        }
                    } else {
                        childNodes.push(children[j]);
                    }
                }
            }
        }
    }

    return $.merge($(), $.fn.unique.call(childNodes));
};

// filters
$.fn.add = function (selector, context) {
    if (!selector) {
        return this;
    }

    var addNodes = $.fn.findBySelector(selector, context);
    return $.merge(this, $.fn.unique(addNodes));
};

$.fn.not = function (selector) {

    if (!selector) {
        return this;
    }

    var criteria;

    if (typeof selector === 'function') {

        criteria = (function (idx, node) {
            return !selector.call(node, idx, node);
        });
    } else {

        selector.isDollar ? selector.selector : selector;
        criteria = (function () {
            return !$.fn.matchesSelector.call(this, selector);
        });
    }

    return $.merge($(), $.fn.unique(this.filter(criteria)));
};

$.fn.is = function (selector) {
    if (!selector) {
        return false;
    }

    return !!this.filter(selector).length;
};

/**
 * get / set values for inputs, text areas, etc.
 * if passing a function, it will be invoked for each
 * node in the target collection with 'this' being 
 * the current node and index and current node's value
 * as parameters.
 * 
 * @param insertion {string, nunber, function, dollarInstance}
 * @return {dollarInstance that this was invoked upon}
 */
$.fn.val = function (insertion) {

    // return value inputs, text areas, etc.
    if (!insertion && this[0].nodeType === 1) {
        return this[0].value;
    }

    for (var i = 0; i < this.length; i++) {
        var node = this[i];
        var value = '';

        if (node.nodeType !== 1) {
            break;
        }

        if (typeof insertion === 'string') {
            value = insertion;
        } else if (typeof insertion === 'number') {
            // coerce to string
            value + '';
        } else if (typeof insertion === 'function') {
            // handy for running validations
            value = insertion.call(node, i, node.value) || '';
        } else if (insertion.isDollarInstance) {
            // NOT IN jQuery - copy value from one dom node to another
            for (var j = 0; j < insertion.length; j++) {
                var existingValue = insertion[j].value;
                if (existingValue) {
                    value += existingValue;
                }
            }
        }

        node.value = value;
    }

    return this;
};

$.fn.text = function (insertion) {

};

$.fn.attr = function (attributeName, value) {

};
/**
 * DOM
 * - traversal = .has(), .parent(), .children()
 * - filters = .add(), .not(), .is()
 * - reading = .val(), .text(), .attr()
 *
 * @module DOM
 *
 * http://jsperf.com/intent-media-dollar-vs-jquery-dom
 *
 */

// traversal
$.fn.has = function (selector) {

    selector = selector.isDollar ? selector.selector : selector;

    // fetch node containing selector match
    return this.filter(function () {
        return !!$.fn.unique($.fn.findBySelector.call(this, selector)).length;
    });
};

$.fn.parent = function () {
    var parentElems = [];

    for (var i = 0; i < this.length; i++) {
        var parent = this[i].parentNode;
        if (parent) {
            parentElems.push(parent);
        }
    }

    return $.merge($(), $.fn.unique(parentElems));
};

$.fn.children = function (selector) {

    var childNodes = [],
        push = Array.prototype.push;

    if (selector) {
        for (var i = 0; i < this.length; i++) {
            var children = this[i].children;
            push.apply(childNodes, $.fn.filter.call(children, selector));
        }
    }

    return $.merge($(), $.fn.unique(childNodes));
};

// filters

// Ops/sec  ~  6/13/15
// dollar   -   jQuery
// 143k         13k
$.fn.add = function (selector, context) {
    if (!selector) {
        return this;
    }

    var addNodes = $.fn.findBySelector(selector, context);
    return $.merge(this, $.fn.unique(addNodes));
};

// Ops/sec  ~  6/13/15
// dollar   -   jQuery
// 120k         45k
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

// Ops/sec  ~  6/13/15
// dollar   -   jQuery
// 122k         73k
$.fn.is = function (selector) {
    if (!selector) {
        return false;
    }

    return !!this.filter(selector).length;
};

// reading

$.fn.val = function (insertion) {

    if (!insertion) {
        return this[0].value;
    }

    var value = '';

    if (typeof insertion === 'string') {
        value = insertion;
    } else if (typeof insertion === 'number') {
        value = insertion + '';
    }

    for (var i = 0; i < this.length; i++) {

        if (this[i].nodeType !== 1) {
            break;
        }

        if (typeof insertion === 'function') {
            value = insertion.call(this[i], i, this[i].value) || '';
        }

        this[i].value = value;
    }

    return this;
};

$.fn.text = function (insertion) {

};

$.fn.attr = function (attributeName, value) {

};
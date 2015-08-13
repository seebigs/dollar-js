/**
 * DOM
 * - traversal = .has(), .parent(), .children(), .siblings(), .first(), .last(), .next()
 * - reading = .val(), .text(), .attr(), .prop()
 */

/**
 * NOTE:
 * As a heads up, for all of these DOM traversal
 * functions, jQuery does not support passing nodes
 * or jQuery instances as selectors. In the case of
 * a non-string selector, jQuery will return the
 * same results as would have been returned with no
 * selector.
 *
 * This is an inconsistent approach with the rest of
 * jQuery though since find, closest, filter, and a 
 * host of other DOM traversal functions take nodes
 * and jQuery instances as valid selectors.
 *
 * jQuery can keep its inconsistencies. I've built 
 * these functions to accept the full suite of parameters.
 * 
 */ 

$.fn.has = function (selector) {

    if (!selector) {
        return merge($(), []);
    }

    // fetch node containing selector match
    return this.filter(function () {
        return !!unique($.fn.findBySelector.call(this, selector)).length;
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

    return merge($(), unique(parentElems));
};

$.fn.children = function (selector) {

    var childNodes = [],
        push = Array.prototype.push;

    var i = 0,
        len = this.length;

    // jQuery doesn't support passing a jQ instance to this fn,
    // not sure why since
    // selector = selector.isDollar ? selector.selector : selector
    // would work nicely here
    
    if (selector) {
        for (; i < len; i++) {
            var children = this[i].children;
            push.apply(childNodes, $.fn.filter.call(children, selector));
        }
    } else {
        for (; i < len; i++) {
            push.apply(childNodes, this[i].children);
        }
    }

    return merge($(), unique(childNodes));
};

// .siblings(), .first(), .last(), .next()

$.fn.siblings = function (selector) {

    var target,
        siblings = [];

    var i = 0,
        len = this.length;


    for (; i < len; i++) {
        target = this[i].parentNode;
        target = target && target.firstChild;

        if (selector) {
            while (target) {
                if (target.nodeType === 1 && target !== this[i] && $.fn.matchesSelector.call(target, selector)) {
                    siblings.push(target);
                }
                target = target.nextSibling;
            }
        } else {
            while (target) {
                if (target.nodeType === 1 && target !== this[i]) {
                    siblings.push(target);
                }
                target = target.nextSibling;
            }
        }
    }

    return merge($(), siblings.length > 1 ? unique(siblings) : siblings);
};

$.fn.first = function () {
    return this.eq(0);
};

$.fn.last = function () {
    return this.eq(this.length-1);
};

$.fn.next = function (selector) {

    var i = 0,
        len = this.length,
        subsequents = [],
        nextNode;
        
    for (; i < len; i++) {
        nextNode = this[i].nextElementSibling; // won't work for IE8
        if (nextNode && (selector ? $.fn.matchesSelector.call(nextNode, selector) : true)) {
            subsequents.push(nextNode);
        }
    }

    return merge($(), subsequents.length > 1 ? unique(subsequents) : subsequents);
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
        value += insertion; // coerce to string
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



// functions deemed too obscure for DollarJs :(

// // Ops/sec  ~  6/13/15
// // dollar   -   jQuery
// // 143k         13k
// $.fn.add = function (selector, context) {
//     if (!selector) {
//         return this;
//     }

//     var addNodes = $.fn.findBySelector(selector, context);
//     return $.merge(this, $.fn.unique(addNodes));
// };

// // Ops/sec  ~  6/13/15
// // dollar   -   jQuery
// // 120k         45k
// $.fn.not = function (selector) {

//     if (!selector) {
//         return this;
//     }

//     var criteria;

//     if (typeof selector === 'function') {

//         criteria = (function (idx, node) {
//             return !selector.call(node, idx, node);
//         });
//     } else {

//         selector.isDollar ? selector.selector : selector;
//         criteria = (function () {
//             return !$.fn.matchesSelector.call(this, selector);
//         });
//     }

//     return $.merge($(), $.fn.unique(this.filter(criteria)));
// };

// // Ops/sec  ~  6/13/15
// // dollar   -   jQuery
// // 122k         73k
// $.fn.is = function (selector) {
//     if (!selector) {
//         return false;
//     }

//     return !!this.filter(selector).length;
// };
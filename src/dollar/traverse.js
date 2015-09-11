/*
 * TRAVERSE
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
 * jQuery can keep its inconsistencies. We should
 * accept a constant suite of parameters.
 *
 * Since we accept dollar instances, var
 * selectorPassed is used to make sure we still
 * validate matchesSelector for undefined - the
 * result of passing $(falsy)
 *
 */

$.fn.parent = function (selector) {
    var parentElems = [],
        parent;

    var idxOfEvaled = 0,
        i = 0,
        len = this.length,
        selectorPassed = !!arguments.length;

    for (; i < len; i++) {
        parent = this[i].parentNode;

        if (selectorPassed ? parent && matchesSelector(parent, selector, idxOfEvaled++) : parent) {
            parentElems[parentElems.length] = parent;
        }
    }

    return utils.merge($(), utils.unique(parentElems));
};

$.fn.children = function (selector) {
    var childNodes = [],
        currentChildren;

    var i = 0,
        len = this.length,
        filterResults = selector && utils.isFunction(selector),
        filterChildren = !!arguments.length && !filterResults;

    for (; i < len; i++) {
        currentChildren = this[i].children;
        utils.merge(childNodes, filterChildren ? $.fn.filter.call(currentChildren, selector) : currentChildren);
    }

    return utils.merge($(), filterResults ? $.fn.filter.call(childNodes, selector) : utils.unique(childNodes));
};

$.fn.siblings = function (selector) {
    var siblings = [],
        target;

    var i = 0,
        len = this.length,
        idxOfEvaled = 0,
        filterResults = selector && utils.isFunction(selector),
        winnowSiblings = !!arguments.length && !filterResults;

    for (; i < len; i++) {
        target = this[i].parentNode;
        target = target && target.firstChild;

        while (target) {
            if (target !== this[i] && (winnowSiblings ? matchesSelector(target, selector, idxOfEvaled++) : target.nodeType === 1)) {
                siblings[siblings.length] = target;
            }

            target = target.nextSibling;
        }
    }

    return utils.merge($(), filterResults ? $.fn.filter.call(siblings, selector) : utils.unique(siblings));
};

$.fn.first = function () {
    return this.eq(0);
};

$.fn.last = function () {
    return this.eq(-1);
};

$.fn.next = function (selector) {
    var subsequents = [],
        nextNode;

    var i = 0,
        len = this.length,
        idxOfEvaled = 0,
        selectorPassed = !!arguments.length;

    for (; i < len; i++) {
        // TODO: IE8 polyfill
        nextNode = this[i].nextElementSibling; // won't work for IE8
        if (selectorPassed ? nextNode && matchesSelector(nextNode, selector, idxOfEvaled++) : nextNode) {
            subsequents[subsequents.length] = nextNode;
        }
    }

    return utils.merge($(), subsequents.length > 1 ? utils.unique(subsequents) : subsequents);
};

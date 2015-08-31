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
 */

$.fn.parent = function () {
    var parentElems = [];

    for (var i = 0; i < this[lengthSub]; i++) {
        var parent = this[i].parentNode;
        if (parent) {
            parentElems.push(parent);
        }
    }

    return utils.merge($(), utils.unique(parentElems));
};

$.fn.children = function (selector) {
    var childNodes = [],
        arrPush = [].push;

    var i = 0,
        len = this[lengthSub];

    if (selector) {
        for (; i < len; i++) {
            var children = this[i].children;
            arrPush.apply(childNodes, $.fn.filter.call(children, selector));
        }
    } else {
        for (; i < len; i++) {
            arrPush.apply(childNodes, this[i].children);
        }
    }

    return utils.merge($(), utils.unique(childNodes));
};

$.fn.siblings = function (selector) {
    var target,
        siblings = [];

    var i = 0,
        len = this[lengthSub];


    for (; i < len; i++) {
        target = this[i].parentNode;
        target = target && target.firstChild;

        if (selector) {
            while (target) {
                if (target[nodeTypeSub] === 1 && target !== this[i] && $.fn.matchesSelector.call(target, selector)) {
                    siblings.push(target);
                }

                target = target.nextSibling;
            }
        } else {
            while (target) {
                if (target[nodeTypeSub] === 1 && target !== this[i]) {
                    siblings.push(target);
                }

                target = target.nextSibling;
            }
        }
    }

    return utils.merge($(), siblings[lengthSub] > 1 ? utils.unique(siblings) : siblings);
};

$.fn.first = function () {
    return this.eq(0);
};

$.fn.last = function () {
    return this.eq(this[lengthSub] - 1);
};

$.fn.next = function (selector) {
    var i = 0,
        len = this[lengthSub],
        subsequents = [],
        nextNode;

    for (; i < len; i++) {
        // TODO: IE8 polyfill
        nextNode = this[i].nextElementSibling; // won't work for IE8
        if (nextNode && (selector ? $.fn.matchesSelector.call(nextNode, selector) : true)) {
            subsequents.push(nextNode);
        }
    }

    return utils.merge($(), subsequents[lengthSub] > 1 ? utils.unique(subsequents) : subsequents);
};

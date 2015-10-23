/**
 * MUTATE
 */

$.fn.empty = function () {
    var elem,
        i = 0;

    for (; (elem = this[i]); i++) {
        if (elem.nodeType === 1) {
            elem.textContent = '';
        }
    }

    return this;
};

$.fn.remove = function (selector) {
    var target;
    var i = 0;
    var id;

    for (; (target = this[i]); i++) {
        if (matchesSelector(target, selector) && target.parentNode) {
            target.parentNode.removeChild(target);
        }
    }

    return this;
};
/**
 * Remove each element in the current set from the document
 * If a selector is provided, only remove elements that match the new selector
 * @module mutate
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (chainable)
 * @example $('p').remove('.foo')
 */

$.fn.remove = function (selector) {
    var target, i, len = this.length;

    if (selector === undef) {
        for (i = 0; i < len; i++) {
            target = this[i];
            if (target.parentNode) {
                target.parentNode.removeChild(target);
            }
        }

    } else {
        for (i = 0; i < len; i++) {
            target = this[i];
            if (nodeMatchesSelector(target, selector, i) && target.parentNode) {
                target.parentNode.removeChild(target);
            }
        }
    }

    return this;
};

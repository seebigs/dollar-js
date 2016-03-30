
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
            if (nodeMatchesSelector(target, i, selector) && target.parentNode) {
                target.parentNode.removeChild(target);
            }
        }
    }

    return this;
};


$.fn.siblings = function (selector) {
    var siblings = [],
        target;

    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].parentNode) {
            target = this[i].parentNode.firstChild;
        }

        while (target) {
            if (target !== this[i] && target.nodeType === 1) {
                siblings.push(target);
            }

            target = target.nextSibling;
        }
    }

    return collect(selector ? $.fn.filter.call(siblings, selector) : siblings);
};

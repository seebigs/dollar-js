
$.fn.parent = function (selector) {
    var parentElems = [],
        parent;

    for (var i = 0, len = this.length; i < len; i++) {
        parent = this[i].parentNode;

        if (parent) {
            parentElems.push(parent);
        }
    }

    return collect(selector ? $.fn.filter.call(parentElems, selector) : parentElems);
};

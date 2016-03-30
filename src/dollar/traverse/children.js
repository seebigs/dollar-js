
$.fn.children = function (selector) {
    var childNodes = [];

    for (var i = 0, len = this.length; i < len; i++) {
        utils.merge(childNodes, this[i].children);
    }

    return collect(selector ? $.fn.filter.call(childNodes, selector) : childNodes);
};

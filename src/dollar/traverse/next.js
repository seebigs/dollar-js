
$.fn.next = function (selector) {
    var subsequents = [],
        nextNode;

    for (var i = 0, len = this.length; i < len; i++) {
        nextNode = this[i].nextElementSibling;
        if (nextNode) {
            subsequents.push(nextNode);
        }
    }

    return collect(selector ? $.fn.filter.call(subsequents, selector) : subsequents);
};

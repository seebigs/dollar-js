
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

// IE8 Polyfill
if (!('nextElementSibling' in docElement)) {
    Object.defineProperty(elemProto, 'nextElementSibling', {
        get: function () {
            var elem = this.nextSibling;

            while (elem && elem.nodeType !== 1) {
                elem = elem.nextSibling;
            }

            return elem;
        }
    });
}

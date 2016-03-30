
$.fn.empty = function () {
    var elem, i, len = this.length;

    for (i = 0; i < len; i++) {
        elem = this[i];
        if (elem.nodeType === 1) {
            elem.textContent = '';
        }
    }

    return this;
};

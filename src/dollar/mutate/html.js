
$.fn.html = function (value) {
    var elem, i, len = this.length,
        first = this[0];

    if (value === undef) {
        if (first && first.nodeType === 1) {
            return first.innerHTML;
        }

        return undef;
    }

    try {
        for (i = 0; i < len; i++) {
            elem = this[i];
            if (elem.nodeType === 1) {
                elem.innerHTML = value;
            }
        }

    } catch (e) {
        this.empty().append(value);
    }

    return this;
};

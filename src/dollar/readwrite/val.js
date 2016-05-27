
$.fn.val = function (insertion) {
    if (insertion === undef) {
        return this[0].value;
    }

    for (var i = 0; i < this.length; i++) {
        if (this[i].nodeType !== 1) {
            break;
        }

        if (typeof insertion === fnType) {
            insertion = insertion.call(this[i], this[i].value, i);
        }

        this[i].value = insertion;
    }

    return this;
};

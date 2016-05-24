
$.fn.text = function (insertion) {
    if (insertion !== undef) {
        this.each(function (elem, i) {
            if (elem.nodeType === 1 || elem.nodeType === 11 || elem.nodeType === 9) {
                if (typeof insertion === fnType) {
                    elem.textContent = insertion(i, elem.textContent);
                } else {
                    elem.textContent = insertion;
                }
            }
        });

        return this;
    }

    var ret = '';

    this.each(function (elem) {
        var nodeType = elem.nodeType;

        if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof elem.textContent === strType) {
                ret += elem.textContent;
            }

        } else if (nodeType === 3 || nodeType === 4) {
            ret += elem.nodeValue;
        }
    });

    return ret;
};

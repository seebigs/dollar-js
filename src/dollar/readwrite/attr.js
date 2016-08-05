
$.fn.attr = function (attr, value) {

    if (value === undef) {
        return getAttributeSafely(this[0], attr);
    }

    this.each(function (elem, i) {
        if (nodeSupportsAttrProp(elem)) {
            if (typeof value === fnType) {
                value = value(getAttributeSafely(elem, attr), i);
            }

            elem.setAttribute(attr, value);
        }
    });

    return this;
};

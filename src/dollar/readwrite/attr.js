
function getAttributeSafely (elem, attr) {
    return (!nodeSupportsAttrProp(elem) || !elem.hasAttribute(attr)) ? undef : (elem.getAttribute(attr) || attr);
}

$.fn.attr = function (attr, value) {

    if (value === undef) {
        return getAttributeSafely(this[0], attr);
    }

    this.each(function (elem, i) {
        if (nodeSupportsAttrProp(elem)) {
            if (typeof value === fnType) {
                value = value(i, getAttributeSafely(elem, attr));
            }

            elem.setAttribute(attr, value);
        }
    });

    return this;
};
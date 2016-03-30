
function getPropertyFromElem (elem, prop) {
    return nodeSupportsAttrProp(elem) ? elem[prop] : undef;
}

$.fn.prop = function (prop, value) {

    if (value === undef) {
        return getPropertyFromElem(this[0], prop);
    }

    this.each(function (elem, i) {
        if (nodeSupportsAttrProp(elem)) {
            if (typeof value === fnType) {
                value = value(i, getPropertyFromElem(elem, prop));
            }

            elem[prop] = value;
        }
    });

    return this;
};

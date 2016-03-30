
$.fn.css = function (property, value) {
    if (!property) {
        return this;
    }

    var i, len = this.length;
    var elem, map = {};

    if (typeof property === strType) {

        // get one value
        if (value === undef) {
            return getStyle(this[0], property);
        }

        // set with one value
        map[property] = value;

    } else if (utils.isObject(property)) {
        // set using provided object as map
        map = property;
    }

    function setPropertyByMap (v, k) {
        elem.style[k] = typeof v === fnType ? v.call(elem, i, getStyle(elem, k)) : v;
    }

    for (i = 0; i < len; i++) {
        elem = this[i];
        utils.each(map, setPropertyByMap);
    }

    return this;
};

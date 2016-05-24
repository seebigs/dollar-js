
function getDataFromDOM (elem) {
    // Polyfill for IE<11 and Opera Mini
    return elem && elem.dataset || (function () {
        var data = {};
        var allAttr = elem.attributes;
        var isDataAttr = /^data-[a-z_\-\d]*$/i;
        var name;

        for (var n in allAttr) {
            if (allAttr.hasOwnProperty(n)) {
                name = allAttr[n].name;
                if (isDataAttr.test(name)) {
                    name = utils.formatDashedToCamelCase(name.substr(5));
                    data[name] = allAttr[n].value;
                }
            }
        }

        return data;
    })();
}

// setting data through dollar does NOT create corresponding data-attributes on the element
$.fn.data = function (key, value) {
    if (!this.length) {
        return undef;
    }

    var elem, map = {};

    // get all data
    if (!key) {
        return utils.extend({}, getDataFromDOM(this[0]), getElementData(this[0], undef, PUBLIC_DATA_CACHE));
    }

    if (typeof key === strType) {

        // get one value
        if (value === undef) {
            return getElementData(this[0], key, PUBLIC_DATA_CACHE) || getDataFromDOM(this[0])[key];
        }

        // set map with one value
        map[key] = value;

    } else if (utils.isObject(key)) {
        // set using provided object as map
        map = key;
    }

    function setDataByMap (v, k) {
        setElementData(elem, k, v, PUBLIC_DATA_CACHE);
    }

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        utils.each(map, setDataByMap);
    }

    return this;
};

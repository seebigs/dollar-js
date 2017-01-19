/**
 * Store or read arbitrary data associated with the matched elements
 * If <b>key</b> and <b>value</b> are provided, this will set data for each element and return the current set for chaining
 * If only <b>key {Object}</b> is provided, this will set data for each element (as key/value pairs) and return the current set for chaining
 * If only <b>key {String}</b> is provided, this will return the data stored under the given key for the first element in the current set
 * If no arguments are passed, this will return all of the data stored for the first element in the current set
 * Note: setting data through dollar does NOT create corresponding data-attributes on the element
 * @module readwrite
 * @option {Object|String} key An Object of key/value pairs to store, or the String key from which to store/read a value
 * @option {Any} value A value to be set. Most values will be converted to a String before setting. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Data or DollarJS (chainable)
 * @example $('p').data('foo', 'bar')
 * @example $('p').data({ foo: 'bar' })
 * @example $('p').data('foo', function(previousValue, index){ return 'foo'; })
 * @example $('p').data('foo')
 * @example $('p').data()
 */

$.fn.data = function (key, value) {
    if (!this.length) {
        return undef;
    }

    var elem, map = {};

    // get all data
    if (!key) {
        return utils.extend({}, getDataFromDOM(this[0]), getElementData(DATA_CACHE_PUBLIC, this[0]));
    }

    if (typeof key === strType) {

        // get one value
        if (value === undef) {
            var retrievedData = getElementData(DATA_CACHE_PUBLIC, this[0], key);
            return retrievedData === undef ? getDataFromDOM(this[0])[key] : retrievedData;
        }

        // set map with one value
        map[key] = value;

    } else if (utils.isObject(key)) {
        // set using provided object as map
        map = key;
    }

    function setDataByMap (v, k) {
        setElementData(DATA_CACHE_PUBLIC, elem, k, v);
    }

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        utils.each(map, setDataByMap);
    }

    return this;
};

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
                    name = utils.format.dashToCamel(name.substr(5));
                    data[name] = allAttr[n].value;
                }
            }
        }

        return data;
    })();
}

/*
 * Helper Utilities
 * @module $.utils
 */

$.utils = utils = (function () {

    var objPrefix = '[object ';

    function isElement (thing) {
        // reject all but dom nodes & the document
        return !!thing && (thing.nodeType === 1 || thing.nodeType === 9);
    }

    function isObject (thing) {
        return objToString.call(thing) === objPrefix + 'Object]';
    }

    function each (collection, iteratee) {
        if (collection) {
            if (collection.length !== undef) {
                for (var i = 0, len = collection.length; i < len; i++) {
                    if (iteratee.call(collection[i], collection[i], i, collection) === false) {
                        return;
                    }
                }

            } else {
                for (var prop in collection) {
                    if (objHasProp.call(collection, prop)) {
                        if (iteratee.call(collection[prop], collection[prop], prop, collection) === false) {
                            return;
                        }
                    }
                }
            }
        }
    }

    function extend () {
        var ret = arguments[0];
        var assignProp = function (val, key) {
            if (val !== undef) {
                ret[key] = val;
            }
        };

        each(arrSlice.call(arguments, 1), function (ext) {
            each(ext, assignProp);
        });

        return ret;
    }

    function merge () {
        var ret = arguments[0];
        var i, len;

        each(arrSlice.call(arguments, 1), function (collection) {
            if (collection) {
                for (i = 0, len = collection.length; i < len; i++) {
                    if (ret.indexOf(collection[i]) === -1) {
                        ret.push(collection[i]);
                    }
                }
            }
        });

        return ret;
    }

    var format = {

        camelToDash: function (str) {
            return str.replace(/([A-Z])/g, '-$1').toLowerCase();
        },

        dashToCamel: function (str) {
            return str.replace(/-(.)/g, function (all, s) {
                return s.charAt(0).toUpperCase();
            });
        }

    };



    return {

        isElement: isElement,
        isObject: isObject,

        each: each,
        extend: extend,
        merge: merge,

        format: format

    };

})();

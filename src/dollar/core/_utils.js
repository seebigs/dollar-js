/*
 * Helper Utilities
 * @module $.utils
 */

$.utils = utils = (function () {

    var objPrefix = '[object ';

    // IE8 Polyfill
    function isArrayPolyfill (thing) {
        return objToString.call(thing) === objPrefix + 'Array]';
    }

    function isElement (thing) {
        // reject all but dom nodes & the document
        return thing && thing.nodeType === 1 || thing.nodeType === 9;
    }

    function isFunction (thing) {
        return objToString.call(thing) === objPrefix + 'Function]';
    }

    function isObject (thing) {
        return objToString.call(thing) === objPrefix + 'Object]';
    }

    function each (collection, iteratee) {
        if (collection) {
            if (collection.length) {
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
            if (typeof val !== 'undefined') {
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


    return {

        isArray: Array.isArray || isArrayPolyfill,
        isElement: isElement,
        isFunction: isFunction,
        isObject: isObject,

        each: each,
        extend: extend,
        merge: merge,

        /* eslint-disable brace-style */
        // IE8 Polyfill
        trim: String.prototype.trim ? function (s) { return s.trim(); } : function (string) {
            return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
        /* eslint-enable brace-style */

    };

})();

/*
 * Helper Utilities
 * @module $
 */

utils = {

    isArray: function (arr) {
        return objToString.call(arr) === '[object Array]';
    },

    isObject: function (obj) {
        return objToString.call(obj) === '[object Object]';
    },

    isFunction: function (fn) {
        return objToString.call(fn) === '[object Function]';
    },

    isElement: function (node) {
        return node[nodeTypeSub] === 1 || node[nodeTypeSub] === 9;
    },

    trim: String.prototype.trim || function (string) {
        return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    },

    each: function (collection, iteratee, thisArg) {
        if (this.isArray(collection)) {
            var i, len;
            for (i = 0, len = collection[lengthSub]; i < len; i++) {
                iteratee.call(thisArg || collection[i], collection[i], i, collection);
            }

        } else {
            for (var prop in collection) {
                if (objHasProp.call(collection, prop)) {
                    iteratee.call(thisArg || collection[prop], collection[prop], prop, collection);
                }
            }
        }
    },

    extend: function () {
        var ret = arguments[0],
            args = arrSlice.call(arguments, 1),
            assignProp = function (val, key) {
                ret[key] = val;
            };

        for (var i = 0, argsLen = args[lengthSub]; i < argsLen; i++) {
            this.each(args[i], assignProp);
        }

        return ret;
    },

    merge: function (first, second) {
        var len = +second[lengthSub],
            j = 0,
            i = first[lengthSub];

        for (; j < len; j++) {
            first[i++] = second[j];
        }

        first[lengthSub] = i;

        return first;
    },

    unique: function (jumbled) {
        var iterable = Object(jumbled),
            distinct = [];

        if (!iterable[lengthSub]) {
            return jumbled;
        }

        for (var i = 0, len = iterable[lengthSub]; i < len; i++) {
            if (distinct.indexOf(iterable[i]) === -1) {
                distinct.push(iterable[i]);
            }
        }

        return distinct;
    }

};

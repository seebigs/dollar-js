
/*********************/
/*    CORE DOLLAR    */
/*********************/


var $ = function (selector, context) {
    return new $.fn.init(selector, context);
};


var undef,
    strType = 'string',
    fnType = 'function',

    win = window,

    elemProto = win.Element.prototype,

    objProto = Object.prototype,
    objToString = objProto.toString,
    objHasProp = objProto.hasOwnProperty,

    arrProto = Array.prototype,
    arrSlice = arrProto.slice,

    docConstruct = document,
    docElement = document.documentElement,

    utils;

var DATA_ATTR_ID = 'dollar-node-id';
var PUBLIC_DATA_CACHE = [null]; // start ids at 1 for truthyness
var PRIVATE_DATA_CACHE = [null];

var regExpSpacesAndBreaks = /[\s\t\r\n\f]+/g;


$.fn = $.prototype = {
    constructor: $,

    selector: '',

    length: 0,

    isDollar: true,

    // easily add/remove elements in dollar collection
    indexOf: arrProto.indexOf,
    push: arrProto.push,

    // Hack to make console.log display selected elements as an Array
    splice: arrProto.splice,

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {
        if (num === undef) {
            // Return all the elements in a clean array
            return arrSlice.call(this, 0);

        } else {
            // Return just the one element from the set
            return num < 0 ? this[num + this.length] : this[num];
        }
    }
};

$.fn.init = function (selector, context) {

    // make length a property instead of inherited
    this.length = 0;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
        return this;
    }

    if (!context) {
        // HANDLE: simple $("#id") for performance
        if ((/^#[\w-]+$/).test(selector)) {
            var idShortcut = docConstruct.getElementById(selector.substr(1));
            if (idShortcut) {
                this[0] = idShortcut;
                this.length = 1;
            }

            return this;
        }

        // HANDLE: simple $("tag") for performance
        if ((/^[a-z]+$/).test(selector)) {
            var tags = docConstruct.getElementsByTagName(selector);
            var tLen = tags.length;
            for (var i = 0; i < tLen; i++) {
                this[i] = tags[i];
            }
            this.length = tLen;

            return this;
        }
    }

    return utils.merge(this, getNodesBySelector(selector, context));
};

// Give the init function the $ prototype for later instantiation
$.fn.init.prototype = $.fn;

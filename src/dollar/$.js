
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

var regExpSpacesAndBreaks = /[\s\t\r\n\f]+/g;


$.isDollar = true;

$.fn = {
    isDollar: true,
    indexOf: arrProto.indexOf,
    push: arrProto.push,
    pop: arrProto.pop,
    shift: arrProto.shift,
    unshift: arrProto.unshift,
    slice: arrProto.slice,
    splice: arrProto.splice // Makes console.log display selected elements as an Array
};

$.fn.init = function (selector, context) {

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

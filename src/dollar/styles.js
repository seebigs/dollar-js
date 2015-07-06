function isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

function isFunction (fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

/*
 * Styles
 * - .css()
 * - .hasClass()
 * - .addClass(), .removeClass()
 */

// TODO: make sure setting with numbers works.
$.fn.css = function (property, value) {

    if (!property) {
        return this;
    }

    var i = 0,
        len;

    if (!value) { // getting CSS or setting with object

        if (isObject(property)) { // set CSS with object

            for (len = this.length; i < len; i++) {
                for (var key in property) {
                    if (property.hasOwnProperty(key)) {
                        this[i].style[key] = property[key];
                    }
                }
            }

            return this;

        } else { // get CSS of first elem in collection with string or array of properties
            property = typeof property === 'string' ? [property] : property;
            var result = [];

            for (len = property.length; i < len; i++) {
                result.push(getStyle(this[0], property[i]));
            }

            return result.length === 1 ? result[0] : result; // if multiples, return array -- otherwise just the property
        }

    } else { // set string CSS property with string/num value or return from function

        if (isFunction(value)) {
            for (len = this.length; i < len; i++) {
                this[i].style[property] = value.call(this[0], i, getStyle(this[i], property)); // fn gets elem as this and params (index, current style) 
            }
        } else {
            for (len = this.length; i < len; i++) {
                this[i].style[property] = value;
            }
        }

        return this;
    }

    // IE8 POLYFILL:
    function getStyle (elem, prop) {
        // while setting CSS can be done with either camel-cased or dash-separated properties
        // getting computed CSS properties is persnickety about formatting

        if (typeof window.getComputedStyle === 'undefined') { // IE8 POLYFILL
            prop = prop === 'float' ? 
                'styleFloat' : 
                prop.replace(/^-ms-/, 'ms-').replace(/-([a-z])/gi, function (all, letter) { // insure that property is camel cased
                    return letter.toUpperCase();
                });
            return elem.currentStyle[prop];
        } else {
            prop = prop.replace(/[A-Z]/g, function (match) { // insure the property is dash-separated
                return '-' + match.toLowerCase();
            });
            return window.getComputedStyle(elem, null).getPropertyValue(prop);
        }
    }
};

$.fn.hasClass = function (className) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].nodeType === 1 && this[i].className.indexOf(className) >= 0) {
            return true;
        }
    }

    return false;
};
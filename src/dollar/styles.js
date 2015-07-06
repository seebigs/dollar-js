function isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}


// interesting, setting with element.style['property-name'] & element.style['propertyName'] & element.style.propertyName are all the same -- at least in chrome.
// getting a computed property still requires the exact property name ('background-color' vs 'backgroundColor')

$.fn.css = function (property, value) {

    if (!property) {
        return this;
    }

    if (!value) { // getting CSS or setting with object

        if (isObject(property)) { // set CSS with object

            for (var i = 0, len = this.length; i < len; i++) {
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

            for (var i = 0, len = property.length; i < len; i++) {
                property[i] = property[i].replace(/[A-Z]/g, function (match) {
                    return '-' + match.toLowerCase(); // un-camel case (backgroundColor -> background-color)
                });

                if (typeof window.getComputedStyle !== 'undefined') {
                    result.push(window.getComputedStyle(this[0], null).getPropertyValue(property[i]));
                } else { // IE8 POLYFILL
                    result.push(getStyleIE8Polyfill(this[0]), property[i]);
                }
            }

            return result.length === 1 ? result[0] : result;
        }

    } else { // set string CSS property with string/num value or return from function

        for (var i = 0, len = this.length; i < len; i++) {
            this[i].style[property[j]] = typeof value === 'string' ? 
                value : 
                value.call(this[0], i, getStyle(this[i], property[j]));
        }

        return this;
    }

    function getStyleIE8Polyfill (elem, prop) { // IE8 POLYFILL
        prop = prop === 'float' ? 
            'styleFloat' : 
            prop.replace(/^-ms-/, 'ms-').replace(/-([a-z])/gi, function (all, letter) { // insure that property is camel cased
                return letter.toUpperCase(); // essentially undoing the prior step. but fuck IE8 users.
            });
        return elem.currentStyle[prop];
    }


    // if (!value) {
    //     if (typeof properties === 'string' || isArray(properties)) {
    //         var result = [];
    //         properties = formatProperties(properties, unCamelCase);

    //         for (var i = 0, len = properties.length; i < len; i++) {
    //             result.push(getStyle(this[0], properties[i]));
    //         }

    //         return result.length === 1 ? result[0] : result;
    //     } else {
    //         for (var i = 0, len = this.length; i < len; i++) {
    //             for (var key in properties) {
    //                 if (properties.hasOwnProperty(key)) {
    //                     this[i].style[key] = properties[key];
    //                 }
    //             }
    //         }
    //     }
    // } else { // set css - accept string, array

    //     // properties = formatProperties(properties, camelCase);
        
    //     properties = typeof properties === 'string' ? [properties] : properties;

    //     for (var i = 0, len = this.length; i < len; i++) {
    //         for (var j = 0, propLen = properties.length; j < propLen; j++) {
    //             this[i].style[properties[j]] = typeof value === 'string' ? 
    //                 value : 
    //                 value.call(this[0], i, getStyle(this[i], properties[j]));
    //         }
    //     }

    //     return this;
    // }

    // // IE8 POLYFILL:
    // function getStyle (elem, prop) {
    //     if (typeof window.getComputedStyle === 'undefined') { // IE8 POLYFILL
    //         prop = prop !== 'float' ? camelCase(prop)[0] : 'styleFloat';
    //         return elem.currentStyle[prop];
    //     } else {
    //         return window.getComputedStyle(elem, null).getPropertyValue(prop);
    //     }
    // }

    // function formatProperties (props, format) {
    //     if (typeof props === 'string') {
    //         return [format(props)];
    //     } else {
    //         // var res = [], 
    //         //     i = 0, 
    //         //     len = props.length;

    //         var res = {};

    //         for (var key in props) {
    //             if (props.hasOwnProperty(key)) {
    //                 res[key] = format(props[key]);
    //             }
    //         }

    //         // for (; i < len; i++) {
    //         //     res.push(format(props[i]));
    //         // }

    //         return res;
    //     }
    // };

    // function unCamelCase (string) {
    //     return string.replace(/[A-Z]/g, function (match) {
    //         return '-' + match.toLowerCase();
    //     });
    // }

    // function camelCase (string) {
    //     return string.replace(/^-ms-/, 'ms-').replace(/-([a-z])/gi, function (all, letter) {
    //         return letter.toUpperCase();
    //     });
    // }
};
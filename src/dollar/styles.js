// given properties = straight css property or camel case prop
// and properties = string containing one property
// or properties = array of string properties
// or properties = object props. and vals.
// or properties = function (index (Str or Int), old value) where this = element 
//  
// given values = string css value to set
// or values = function (index (Str or Int), old value) where this = element
// 
// for each element in context:
// if !values, get css vals
// if values, set css vals


function isArray (arr) {
    return Object.prototype.toString.call(arg) === '[object Array]';
}

$.fn.css = function (properties, values) {

    if (!properties) {
        return this;
    }

    if (!values) { // get css - accept string or array
        if (typeof properties === 'string' || isArray(properties)) {
            var result = [];
            properties = unCamelCase(properties);

            for (var i = 0, len = properties.length; i < len; i++) {
                result.push(getStyle(this[0], properties[i]));
            }

            return result.length === 1 ? result[0] : result;
        } else {

        }
    } else { // set css - accept string, array

        properties = camelCase(properties);

        for (var i = 0, len = this.length; i < len; i++) {
            for (var key in properties) {
                if (properties.hasOwnProperty(key)) {
                    this[i].style[properties[key]] = typeof values === 'string' ? 
                        values : 
                        values.call(this[0], i, getStyle(this[i], properties[key]));
                }
            }
        }

        return this;
    }

    // accepts string or array of css properties
    // returns array of dash-separated css properties
    function unCamelCase (props) {
        if (typeof props === 'string') {
            return [doUnCamelCase(props)];
        } else {
            var res = [], 
                i = 0, 
                len = props.length;

            for (; i < len; i++) {
                res.push(doUnCamelCase(props[i]));
            }

            return res;
        }

        function doUnCamelCase (string) {
            return string.replace(/[A-Z]/g, function (match) {
                return '-' + match.toLowerCase();
            });
        }
    }

    // accepts string, array, or object of css properties
    // returns array of camelCased css properties
    function camelCase (props) {
        if (typeof props === 'string') {
            return [doCamelCase(props)];
        } else {
            // var formatted = {};
            var formatted = [];

            for (var k in props) {
                if (props.hasOwnProperty(k)) {
                    // formatted[doCamelCase(k)] = props[k];
                    formatted.push(doCamelCase(props[k]));
                }
            }

            return formatted;
        }

        function doCamelCase (key) {
            if (typeof key === 'number') {
                return key;
            }

            return key.replace(/^-ms-/, 'ms-').replace(/-([a-z])/gi, function (all, letter) {
                return letter.toUpperCase();
            });
        }
    }

    // IE8 POLYFILL:
    function getStyle (elem, prop) {
        if (typeof window.getComputedStyle !== 'undefined') { // IE8 POLYFILL
            prop = prop !== 'float' ? camelCase(prop)[0] : 'styleFloat';
            return elem.currentStyle[prop];
        } else {
            return window.getComputedStyle(elem, null).getPropertyValue(prop);
        }
    }
};


// function camelCase (props) {
//     if (typeof props === 'string') {
//         return doCamelCase(props).split(' ');
//     } else {
//         var formatted = [];

//         for (var k in props) {
//             if (props.hasOwnProperty(k)) {
//                 formatted.push(doCamelCase(props[k]));
//             }
//         }

//         return formatted;
//     }

//     function doCamelCase (str) {
//         return str.replace(/^-ms-/, 'ms-').replace(/-([a-z])/gi, function (all, letter) {
//             return letter.toUpperCase();
//         });
//     }
// }
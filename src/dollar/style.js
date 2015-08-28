/*
 * STYLE
 */

// TODO: make sure setting with numbers works.
$.fn.css = function (property, value) {

    // jQuery craps out when given falsy properties
    if (!property) {
        return this;
    }

    var i = 0,
        len;

    if (value === undef) { // getting CSS or setting with object

        if (utils.isObject(property)) { // set CSS with object

            for (len = this.length; i < len; i++) {
                for (var key in property) {
                    if (property.hasOwnProperty(key)) {
                        this[i].style[key] = property[key];
                    }
                }
            }

            return this;

        } else { // get CSS of first elem in collection with string or array of properties
            var result = {};

            if (typeof property === strType) {
                return getStyle(this[0], property);
            } else if (utils.isArray(property)) {
                for (len = property.length; i < len; i++) {
                    result[property[i]] = getStyle(this[0], property[i]);
                }

                return result;
            } else {
                return this; // is this fail safe necessary? should we error if improper params are passed?
            }
        }

    } else { // set string CSS property with string/num value or return from function

        if (utils.isFunction(value)) {
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

        if (window.getComputedStyle === undef) { // IE8 POLYFILL
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
    // ripped nearly word for word from jQuery. Thanks, open source world.
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(/[\t\r\n\f]/g, ' ').indexOf(className) >= 0) {
            return true;
        }
    }

    return false;
};

$.fn.addClass = function (value) {

    if (!value) {
        return utils.merge($(), this);
    }

    var i = 0,
        len = this.length;

    if (typeof value === strType) {

        var newClasses = utils.trim(value).split(' ');

        for (; i < len; i++) {
            var classes = (' ' + this[i].className + ' ').replace(/[\t\r\n\f]+/g, ' '),
                addedNewClasses = false;

            for (var j = 0, classLen = newClasses.length; j < classLen; j++) {
                if (classes.indexOf(newClasses[j]) < 0) {
                    classes += newClasses[j] + ' ';
                    addedNewClasses = true;
                }
            }

            if (addedNewClasses) {
                this[i].className = classes;
            }
        }

        return this;

    } else if (utils.isFunction(value)) {

        var result = [];

        for (; i < len; i++) {
            // have to pass node recusively in an array so it registers in the add class loop
            result.push($.fn.addClass.call([this[i]], value.call(this, i, this[i].className))[0]);
        }

        return utils.merge($(), result);
    }
};

$.fn.removeClass = function (value) {

    if (!value) {
        return utils.merge($(), this);
    }

    var i = 0,
        len = this.length;

    if (typeof value === strType) {

        var doomedClasses = ' ' + value + ' ';

        for (; i < len; i++) {
            var classes = this[i].className.replace(/[\s\t\r\n\f]+/, ' ').split(' '),
                classLen = classes.length;

            for (var j = 0; j < classLen; j++) {
                var idx = doomedClasses.indexOf(classes[j]);
                if (idx !== -1) {
                    classes.splice(idx, 1);
                }
            }

            if (classes.length !== classLen) {
                this[i].className = classes.join(' ');
            }
        }

        return this;

    } else if (utils.isFunction(value)) {

        var result = [];

        for (; i < len; i++) {
            // have to pass node recusively in an array so it registers in the add class loop
            result.push($.fn.removeClass.call([this[i]], value.call(this, i, this[i].className))[0]);
        }

        return utils.merge($(), result);
    }
};

// Does not support animation: use fadeIn instead
$.fn.show = function () {
    this.each(function () {
        this.style.display = 'inherit';
        this.style.visibility = 'visible';
        this.style.opacity = 1;
    });
};

// Does not support animation: use fadeOut instead
$.fn.hide = function () {
    this.each(function () {
        this.style.display = 'none';
    });
};
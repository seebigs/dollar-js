/**
 * Do any of the matched elements have the given class name?
 * @module style
 * @param {String} className A single class name to look for
 * @returns True or False
 * @example $('p').hasClass('foo')
 */

$.fn.hasClass = function (className) {
    if (!className) {
        return false;
    }

    // sandwich className with one space to avoid partial matches
    className = ' ' + className.trim() + ' ';

    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(regExpSpacesAndBreaks, ' ').indexOf(className) !== -1) {
            return true;
        }
    }

    return false;
};

/**
 * Remove classes from each element in the current set
 * @module style
 * @param {String} names A space-separated list of classes to be removed
 * @returns DollarJS (chainable)
 * @example $('p').removeClass('one two three')
 */

$.fn.removeClass = function (names) {
    var elem, newClasses, oldClasses, doomedClasses;

    function removeDoomed (old) {
        if (doomedClasses.indexOf(old) === -1) {
            newClasses.push(old);
        }
    }

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        newClasses = [];

        // remove all
        if (!names) {
            elem.className = '';

        } else {
            if (typeof names === fnType) {
                doomedClasses = names.call(elem, elem.className, i);
            } else {
                doomedClasses = names;
            }

            if (doomedClasses.length) {
                doomedClasses = typeof doomedClasses === strType ? doomedClasses.trim().split(' ') : doomedClasses;
                oldClasses = elem.className.replace(regExpSpacesAndBreaks, ' ').split(' ');
                utils.each(oldClasses, removeDoomed);
                elem.className = newClasses.join(' ');
            }
        }
    }

    return this;
};

/**
 * Add classes to each element in the current set
 * @module style
 * @param {String} names A space-separated list of classes to be added
 * @returns DollarJS (chainable)
 * @example $('p').addClass('one two three')
 */

$.fn.addClass = function (names) {
    if (!names) {
        return this;
    }

    var newClasses, oldClasses;
    var i, len = this.length;

    if (typeof names === strType) {
        newClasses = names.trim().split(' ');

        for (i = 0; i < len; i++) {
            oldClasses = this[i].className.trim().replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }

    } else if (typeof names === fnType) {
        for (i = 0; i < len; i++) {
            newClasses = names.call(this[i], this[i].className, i).split(' ');
            oldClasses = this[i].className.trim().replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }
    }

    return this;
};

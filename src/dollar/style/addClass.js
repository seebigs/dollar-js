
$.fn.addClass = function (value) {
    if (!value) {
        return this;
    }

    var newClasses, oldClasses;
    var i, len = this.length;

    if (typeof value === strType) {
        newClasses = utils.trim(value).split(' ');

        for (i = 0; i < len; i++) {
            oldClasses = utils.trim(this[i].className).replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }

    } else if (typeof value === fnType) {
        for (i = 0; i < len; i++) {
            newClasses = value.call(this[i], i, this[i].className).split(' ');
            oldClasses = utils.trim(this[i].className).replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }
    }

    return this;
};

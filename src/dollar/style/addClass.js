
$.fn.addClass = function (value) {
    if (!value) {
        return this;
    }

    var newClasses, oldClasses;
    var i, len = this.length;

    if (typeof value === strType) {
        newClasses = value.trim().split(' ');

        for (i = 0; i < len; i++) {
            oldClasses = this[i].className.trim().replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }

    } else if (typeof value === fnType) {
        for (i = 0; i < len; i++) {
            newClasses = value.call(this[i], this[i].className, i).split(' ');
            oldClasses = this[i].className.trim().replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }
    }

    return this;
};

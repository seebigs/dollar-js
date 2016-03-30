
$.fn.hasClass = function (className) {
    if (!className) {
        return false;
    }

    // sandwich className with one space to avoid partial matches
    className = ' ' + utils.trim(className) + ' ';

    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(regExpSpacesAndBreaks, ' ').indexOf(className) !== -1) {
            return true;
        }
    }

    return false;
};

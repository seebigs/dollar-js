
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
                doomedClasses = names.call(elem, i, elem.className);
            } else {
                doomedClasses = names;
            }

            if (doomedClasses.length) {
                doomedClasses = typeof doomedClasses === strType ? utils.trim(doomedClasses).split(' ') : doomedClasses;
                oldClasses = elem.className.replace(regExpSpacesAndBreaks, ' ').split(' ');
                oldClasses.forEach(removeDoomed);
                elem.className = newClasses.join(' ');
            }
        }
    }

    return this;
};

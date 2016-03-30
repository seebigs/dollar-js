
$.fn.filter = function (selector) {
    if (!this.length || !selector) {
        return $();
    }

    var matches = [];

    for (var i = 0, len = this.length; i < len; i++) {
        if (nodeMatchesSelector(this[i], i, selector)) {
            matches.push(this[i]);
        }
    }

    return collect(matches);
};

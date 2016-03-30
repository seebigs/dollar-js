
$.fn.find = function (selector) {
    if (!selector || !this.length) {
        return $();
    }

    return collect(getNodesBySelector(selector, this));
};

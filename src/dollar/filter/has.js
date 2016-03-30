
$.fn.has = function (selector) {
    if (!selector) {
        return $();
    }

    return this.filter(function () {
        return !!getNodesBySelector(selector, this).length;
    });
};

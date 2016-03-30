
$.fn.is = function (selector) {
    return !!(selector && this.filter(selector).length);
};

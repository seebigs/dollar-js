
$.fn.each = function (iteratee) {
    utils.each(this.get(), iteratee);
    return this;
};


$.fn.removeAttr = function (attr) {
    this.each(function () {
        this.removeAttribute(attr);
    });

    return this;
};

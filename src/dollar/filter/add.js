
$.fn.add = function (selector, context) {
    if (!selector) {
        return this;
    }

    return collect(this, $(selector, context));
};

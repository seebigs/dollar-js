
// Does not support animation: use fadeOut instead
$.fn.hide = function () {
    this.each(function () {
        this.style.display = 'none';
    });

    return this;
};

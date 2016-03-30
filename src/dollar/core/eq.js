
$.fn.eq = function (index) {
    index = utils.isArray(index) ? NaN : parseInt(index, 10); // prevent parsing array of numbers

    return index >= 0 ?
        $(this[index]) :
        $(this[this.length + index]); // have to + a -index in order to subtract
};

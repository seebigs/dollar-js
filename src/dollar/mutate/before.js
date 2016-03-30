
$.fn.before = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.parentNode) {
            elem.parentNode.insertBefore(content, elem);
        }
    });
};

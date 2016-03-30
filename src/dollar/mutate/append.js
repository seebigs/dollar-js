
$.fn.append = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        elem.appendChild(content);
    });
};

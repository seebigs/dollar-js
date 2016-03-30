
$.fn.prepend = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.firstChild) {
            elem.insertBefore(content, elem.firstChild);
        } else {
            elem.appendChild(content);
        }
    });
};

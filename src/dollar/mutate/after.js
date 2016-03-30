
$.fn.after = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        var parent = elem.parentNode;
        if (parent) {
            if (elem.nextSibling) {
                parent.insertBefore(content, elem.nextSibling);
            } else {
                parent.appendChild(content);
            }
        }
    });
};

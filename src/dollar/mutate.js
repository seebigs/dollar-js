/**
 * MUTATE
 */

$.fn.empty = function () {
    var elem, i, len = this.length;

    for (i = 0; i < len; i++) {
        elem = this[i];
        if (elem.nodeType === 1) {
            elem.textContent = '';
        }
    }

    return this;
};

$.fn.remove = function (selector) {
    var target, i, len = this.length;

    if (selector === undef) {
        for (i = 0; i < len; i++) {
            target = this[i];
            if (target.parentNode) {
                target.parentNode.removeChild(target);
            }
        }

    } else {
        for (i = 0; i < len; i++) {
            target = this[i];
            if (matchesSelector(target, selector) && target.parentNode) {
                target.parentNode.removeChild(target);
            }
        }
    }

    return this;
};

$.fn.html = function (value) {
    var elem, i, len = this.length,
        first = this[0];

    if (value === undef) {
        if (first && first.nodeType === 1) {
            return first.innerHTML;
        }

        return undef;
    }

    try {
        for (i = 0; i < len; i++) {
            elem = this[i];
            if (elem.nodeType === 1) {
                elem.innerHTML = value;
            }
        }

    } catch (e) {
        this.empty().append(value);
    }

    return this;
};

$.fn.clone = function () {
    var elem, i, len = this.length;

    for (i = 0; i < len; i++) {
        elem = this[i];
        if (elem.nodeType === 1 || elem.nodeType === 11) {
            this[i] = elem.cloneNode(true);
        }
    }

    return this;
};

function domInsert (collection, method) {
    // Flatten nested arrays
    collection = [].concat.apply([], collection);

    var i, j, content, frag,
        colLen = collection.length,
        elemsLen = this.length;

    function nodeToFrag (node) {
        frag.appendChild(node);
    }

    for (j = 0; j < elemsLen; j++) {
        frag = document.createDocumentFragment();
        for (i = 0; i < colLen; i++) {
            content = collection[i];

            // content is String
            if (typeof content === strType) {
                frag.appendChild(parseHTML(content)[0]);

            // content is Element
            } else if (content.nodeType === 1) {
                nodeToFrag(content);

            // content is dollar collection
            } else if (content.isDollar) {
                content.each(nodeToFrag);
            }
        }

        method(this[j], frag);
    }

    return this;
}

$.fn.append = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        elem.appendChild(content);
    });
};

$.fn.prepend = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.firstChild) {
            elem.insertBefore(content, elem.firstChild);
        } else {
            elem.appendChild(content);
        }
    });
};

$.fn.before = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.parentNode) {
            elem.parentNode.insertBefore(content, elem);
        }
    });
};

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

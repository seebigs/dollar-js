/**
 * DOM
 * - traversal = .has(), .parent(), .children()
 * - reading = .val(), .text(), .attr()
 *
 * @module DOM
 */

$.fn.has = function (selectors) {
    var _this = this;

    var scopedNodes = this.filter(function () {
        return !!_this.find.call(this, selectors).length;
    });

    return $.merge($(), scopedNodes.length ? this.unique.call(scopedNodes) : scopedNodes);
};

$.fn.parent = function () {
    var parentElems = [];

    for (var i = 0; i < this.length; i++) {
        var parent = this[i].parentNode;
        if (parent) {
            parentElems.push(parent);
        }
    }

    return $.merge($(), this.unique.call(parentElems));
};

$.fn.children = function (selectors) {
    var childNodes;

    if (this.length === 1) {
        // if no selectors, filter will return the original array
        childNodes = this.filter.call(this[0].children, selectors);
    } else {
        for (var i = 0; i < this.length; i++) {
            var children = this[i].children;

            if (children.length) {
                for (var j = 0; j < children.length; j++) {
                    if (selectors) {
                        if (this.matchesSelector.call(children[j], selectors)) {
                            childNodes.push(children[j]);
                        }
                    } else {
                        childNodes.push(children[j]);
                    }
                }
            }
        }
    }

    return $.merge($(), childNodes.length ? this.unique.call(childNodes) : childNodes);
};

$.fn.val = function (insertions) {

    // return value inputs, text areas, etc.
    if (!insertions && this[0].nodeType === 1) {
        return this[0].value;
    }

    for (var i = 0; i < this.length; i++) {
        var node = this[i];
        var value = '';

        if (node.nodeType !== 1) {
            break;
        }

        if (typeof insertions === 'function') {
            // for running validations before setting? makes sense.
            value = insertions.call(this, i, $(this).val());
        } else if (typeof insertions === 'string') {
            value = insertions;
        } else if (typeof insertions === 'number') {
            value.toString();
        }
    }

    return this;
};

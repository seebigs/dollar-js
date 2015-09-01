/**
 * READWRITE
 */

// text and values

$.fn.val = function (insertion) {
    if (insertion === undef) {
        return this[0].value;
    }

    var value = '';

    if (typeof insertion === strType) {
        value = insertion;
    } else if (typeof insertion === 'number') {
        value += insertion; // coerce to string
    }

    for (var i = 0; i < this.length; i++) {

        if (this[i].nodeType !== 1) {
            break;
        }

        if (typeof insertion === fnType) {
            value = insertion.call(this[i], i, this[i].value) || '';
        }

        this[i].value = value;
    }

    return this;
};

$.fn.text = function (insertion) {
    if (insertion !== undef) {
        this.each(function () {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.textContent = insertion;
            }
        });

        return this;
    }

    var ret = '';

    this.each(function () {
        var _this = this,
            nodeType = _this.nodeType;

        if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof _this.textContent === strType) {
                ret += _this.textContent;
            } else {
                // Traverse its children
                for (_this = _this.firstChild; _this; _this = _this.nextSibling) {
                    ret += this.text(_this);
                }
            }
        } else if (nodeType === 3 || nodeType === 4) {
            ret += _this.nodeValue;
        }
    });

    return ret;
};


// Attributes and Properties

function nodeSupportsAttrProp (node) {
    // don't get/set attributes or properties on text, comment and attribute nodes
    var nType = node && node.nodeType;
    return nType && nType !== 3 && nType !== 8 && nType !== 2;
}

$.fn.attr = function (attr, value) {
    if (value === undef) {
        var elem = this[0];
        return (!nodeSupportsAttrProp(elem) || !elem.hasAttribute(attr)) ? undef : (elem.getAttribute(attr) || attr);
    }

    this.each(function () {
        if (nodeSupportsAttrProp(this)) {
            this.setAttribute(attr, value);
        }
    });

    return this;
};

$.fn.removeAttr = function (attr) {
    this.each(function () {
        this.removeAttribute(attr);
    });

    return this;
};

$.fn.prop = function (prop, value) {
    if (value === undef) {
        var elem = this[0];
        return !nodeSupportsAttrProp(elem) ? undef : elem[prop];
    }

    this.each(function () {
        if (nodeSupportsAttrProp(this)) {
            this[prop] = value;
        }
    });

    return this;
};

$.fn.removeProp = function (prop) {
    this.each(function () {
        if (nodeSupportsAttrProp(this)) {
            delete this[prop];
        }
    });

    return this;
};


// .data(), .removeData()

var PUBLIC_DATA_CACHE = [null]; // start ids at 1 for truthyness

// currently doesn't support passing an object to set
$.fn.data = function (key, value) {
    if (!this.length) {
        return undef;
    }

    var fromDOM = this[0] && this[0].dataset || {};

    if (!key) {
        return utils.extend({}, fromDOM, getElementData(this[0], key, PUBLIC_DATA_CACHE));
    }

    if (value === undef) {
        return getElementData(this[0], key, PUBLIC_DATA_CACHE) || fromDOM[key];
    }

    for (var i = 0, len = this.length; i < len; i++) {
        setElementData(this[i], key, value, PUBLIC_DATA_CACHE);
    }

    return this;
};

$.fn.removeData = function (key) {
    var i = 0,
        len = this.length,
        id;

    for (; i < len; i++) {
        id = getInternalElementId(this[i]);

        if (key) {
            if (id) {
                delete PUBLIC_DATA_CACHE[id][key];
            }

        } else {
            PUBLIC_DATA_CACHE[id] = {};
        }
    }
};

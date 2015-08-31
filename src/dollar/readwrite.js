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

    for (var i = 0; i < this[lengthSub]; i++) {

        if (this[i][nodeTypeSub] !== 1) {
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
            if (this[nodeTypeSub] === 1 || this[nodeTypeSub] === 11 || this[nodeTypeSub] === 9) {
                this.textContent = insertion;
            }
        });

        return this;
    }

    var ret = '';

    this.each(function () {
        var _this = this,
            nodeType = _this[nodeTypeSub];

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
    var nType = node && node[nodeTypeSub];
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

var DOLLAR_DATA_CACHE = [null], // start ids at 1 for truthyness
    DOLLAR_ATTR_ID = 'dollar-id';

function getInternalElementId (elem) {
    return parseInt(elem.getAttribute(DOLLAR_ATTR_ID));
}

function setInternalElementId (elem, referenceId) {
    return elem.setAttribute(DOLLAR_ATTR_ID, referenceId);
}

// currently doesn't support passing an object to set
$.fn.data = function (key, value) {
    if (!this[lengthSub]) {
        return undef;
    }

    var id = getInternalElementId(this[0]),
        fromDOM = this[0] && this[0].dataset || {};

    if (!key) {
        return utils.extend({}, fromDOM, DOLLAR_DATA_CACHE[id]);
    }

    if (value === undef) {
        return id && DOLLAR_DATA_CACHE[id][key] || fromDOM[key];
    }

    var i = 0,
        len = this[lengthSub],
        cachedElemData = {},
        uniqueElemId;

    for (; i < len; i++) {
        uniqueElemId = getInternalElementId(this[i]);
        if (uniqueElemId) {
            DOLLAR_DATA_CACHE[uniqueElemId][key] = value;
        } else {
            cachedElemData = {};
            cachedElemData[key] = value;
            uniqueElemId = DOLLAR_DATA_CACHE.push(cachedElemData) - 1;
            setInternalElementId(this[i], uniqueElemId);
        }
    }

    return this;
};

$.fn.removeData = function (key) {
    var i = 0,
        len = this[lengthSub],
        id;

    for (; i < len; i++) {
        id = getInternalElementId(this[i]);

        if (key) {
            if (id) {
                delete DOLLAR_DATA_CACHE[id][key];
            }

        } else {
            DOLLAR_DATA_CACHE[id] = {};
        }
    }
};

/**
 * IntentMedia's custom jQuery replacement
 * @class $
 */

;(function(){
/*
 * Basic $ init and constructor
 * @module $
 */

var $ = function (selector, context) {
    return new $.fn.init(selector, context);
};

/* jshint ignore:start */
var undef,
    strType = 'string',
    fnType = 'function',

    elemProto = Element.prototype,

    objProto = Object.prototype,
    objToString = objProto.toString,
    objHasProp = objProto.hasOwnProperty,

    arrProto = Array.prototype,
    arrPush = arrProto.push,
    arrSlice = arrProto.slice,

    docConstruct = document,
    docElement = document.documentElement,

    domReadyInvoked = false,
    utils;
/* jshint ignore:end */

$.fn = $.prototype = {
    constructor: $,

    selector: '',

    length: 0,

    isDollar: true,

    // Hack to make console.log display selected elements as an Array
    splice: arrProto.splice,

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {
        return num === undef ?
            // Return all the elements in a clean array
            arrSlice.call(this, 0) :
            // Return just the one element from the set
            (num < 0 ? this[num + this.length] : this[num]);
    }
};

$.fn.init = function (selector, context) {

    // reduce to context to array of nodes, single node, or docConstruct
    this.context = normalizeContext(context);

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
        return this;
    }

    // HANDLE: strings
    if (typeof selector === strType) {

        this.selector = selector;

        // HANDLE: string search within provided context
        if (context) {
            return utils.merge(this, getNodes(selector, this.context));
        } else {

            // HANDLE: Ids
            if (selector[0] === '#' && /^#[\w-]+$/.test(selector)) {

                var foundById = docConstruct.getElementById(selector.substr(1));

                if (foundById) {
                    this[0] = foundById;
                    this.length = 1;
                }

                return this;

            // HANDLE: HTML strings
            } else if (selector[0] === '<' && selector[selector.length - 1] === '>') {
                return utils.merge(this, parseHTML(selector));

            // HANDLE: all other selectors & untrimmed Ids / HTML strings
            } else {
                return utils.merge(this, getNodes(selector, false));
            }
        }

    // HANDLE: dollar instance
    } else if (selector.isDollar) {

        if (!context) {
            this.context = selector.context;
        }

        this.selector = selector.selector;
        return utils.merge(this, selector.get());

    // HANDLE: $(DOM Element)
    } else if (selector.nodeType) {

        this.context = this[0] = selector;
        this.length = 1;
        return this;

    // HANDLE: $([DOM Elements])
    } else if (utils.isArray(selector)) {

        var i = 0;

        for (; i < selector.length; i++) {
            this[i] = selector[i];
        }

        this.length = selector.length;
        return this;

    // HANDLE: dom ready
    } else if (typeof selector === fnType) {

        var domReady = function () {
            if (!domReadyInvoked) {
                domReadyInvoked = true;
                selector($);
            }
        };

        if (document.readyState === 'complete') {
            setTimeout(domReady);

        } else {
            var ev = 'DOMContentLoaded';

            if (elemProto.addEventListener) {
                document.addEventListener(ev, domReady, false);

            } else {
                // IE8 Polyfill
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState === 'complete') {
                        domReady();
                    }
                });
            }
        }

    }

    return this;
};

// Give the init function the $ prototype for later instantiation
$.fn.init.prototype = $.fn;

/*
 * Helper Utilities
 * @module $
 */

utils = {

    isArray: function (arr) {
        return objToString.call(arr) === '[object Array]';
    },

    isObject: function (obj) {
        return objToString.call(obj) === '[object Object]';
    },

    isFunction: function (fn) {
        return objToString.call(fn) === '[object Function]';
    },

    isElement: function (node) {
        // reject all but dom nodes & the document
        return node && node.nodeType === 1 || node.nodeType === 9;
    },

    trim: String.prototype.trim ? function (s) { return s.trim(); } : function (string) {
        return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    },

    each: function (collection, iteratee, thisArg) {
        if (this.isArray(collection)) {
            var i, len;
            for (i = 0, len = collection.length; i < len; i++) {
                iteratee.call(thisArg || collection[i], collection[i], i, collection);
            }

        } else {
            for (var prop in collection) {
                if (objHasProp.call(collection, prop)) {
                    iteratee.call(thisArg || collection[prop], collection[prop], prop, collection);
                }
            }
        }
    },

    extend: function () {
        var ret = arguments[0],
            args = arrSlice.call(arguments, 1),
            assignProp = function (val, key) {
                ret[key] = val;
            };

        for (var i = 0, argsLen = args.length; i < argsLen; i++) {
            this.each(args[i], assignProp);
        }

        return ret;
    },

    merge: function (first, second) {
        var len = +second.length,
            j = 0,
            i = first.length;

        for (; j < len; j++) {
            first[i++] = second[j];
        }

        first.length = i;

        return first;
    },

    unique: function (jumbled) {
        var iterable = Object(jumbled),
            distinct = [];

        if (iterable.length <= 1) {
            return jumbled;
        }

        for (var i = 0, len = iterable.length; i < len; i++) {
            if (distinct.indexOf(iterable[i]) === -1) {
                distinct.push(iterable[i]);
            }
        }

        return distinct;
    }

};

/*
 * Extend $ instances/selections
 * @module $
 */

$.fn.each = function (iteratee) {
    utils.each(this.get(), iteratee);
};

$.fn.find = function (selector) {

    var matches = [];

    if (!selector || !this.length) {
        return utils.merge($(), matches);
    }

    if (utils.isElement(selector)) {
        var i = 0,
            len = this.length;

        for (; i < len; i++) {
            if (this[i] !== selector && this[i].contains(selector)) {
                matches.push(selector);
            }
        }
    } else {
        matches = getNodes(selector, this);
    }

    return utils.merge($(), utils.unique(matches));
};

$.fn.closest = function (selector, context) {

    if (!selector) {
        return utils.merge($(), []);
    }

    var matches = [],
        foundBySelector;

    // should really speed test indexOf vs matchesSelector to determine which to use here:
    // var foundBySelector = context && (selector.isDollar || selector.nodeType) && getNodes(selector, context);

    if (context || selector.isDollar || selector.nodeType) {
        foundBySelector = getNodes(selector, context);
    }

    for (var i = 0, len = this.length; i < len; i++) {
        var node = this[i];
        while (node && node !== context) {

            var nodeMatchesSelector = foundBySelector ?
                Array.prototype.indexOf.call(foundBySelector, node) !== -1 :
                matchesSelector(node, selector, context);

            if (nodeMatchesSelector) {
                matches.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return utils.merge($(), utils.unique(matches));
};

$.fn.filter = function (criteria) {

    if (!this.length || !criteria) {
        return utils.merge($(), []);
    }

    var filterFn;

    // HANDLE: function
    if (utils.isFunction(criteria)) {

        filterFn = criteria;

    // HANDLE: 'selector' || dollar instance || node
    } else if (typeof criteria === strType || criteria.isDollar || utils.isElement(criteria)) {

        filterFn = function () {
            return matchesSelector(this, criteria);
        };

    } else {
        return this;
    }

    var result = [],
        i = 0,
        len = this.length;

    for (; i < len; i++) {
        if (filterFn.call(this[i], i, this[i])) {
            result.push(this[i]);
        }
    }

    return utils.merge($(), utils.unique(result));
};

$.fn.eq = function (index) {
    index = parseInt(index, 10);

    return index >= 0 ?
        $(this[index]) :
        $(this[this.length + index]); // have to + a -index in order to subtract
};

/**
 * FILTER
 */

$.fn.is = function (selector) {
    return !!selector && !!this.filter(selector).length;
};

$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    var criteria,
        excluded;

    if (utils.isFunction(selector)) {
        criteria = function (idx, node) {
            return !selector.call(node, idx, node);
        };
    } else {
        criteria = function () {
            return !matchesSelector(this, selector);
        };
    }

    excluded = this.filter(criteria);

    return utils.merge($(), excluded.length === 1 ? excluded : utils.unique(excluded));
};

$.fn.add = function (selector, context) {
    return !!selector && utils.unique(utils.merge(this, $(selector, context)));
};

$.fn.has = function (selector) {
    if (!selector) {
        return utils.merge($(), []);
    }

    // fetch node containing selector match
    return this.filter(function () {
        return !!utils.unique(getNodes(selector, this)).length;
    });
};

/*
 * TRAVERSE
 */

/**
 * NOTE:
 * As a heads up, for all of these DOM traversal
 * functions, jQuery does not support passing nodes
 * or jQuery instances as selectors. In the case of
 * a non-string selector, jQuery will return the
 * same results as would have been returned with no
 * selector.
 *
 * This is an inconsistent approach with the rest of
 * jQuery though since find, closest, filter, and a
 * host of other DOM traversal functions take nodes
 * and jQuery instances as valid selectors.
 *
 * jQuery can keep its inconsistencies. We should
 * accept a constant suite of parameters.
 *
 * Since we accept dollar instances, var
 * selectorPassed is used to make sure we still
 * validate matchesSelector for undefined - the
 * result of passing $(falsy)
 *
 */

$.fn.parent = function (selector) {
    var parentElems = [],
        parent;

    var idxOfEvaled = 0,
        i = 0,
        len = this.length,
        selectorPassed = !!arguments.length;

    for (; i < len; i++) {
        parent = this[i].parentNode;

        if (selectorPassed ? parent && matchesSelector(parent, selector, idxOfEvaled++) : parent) {
            parentElems[parentElems.length] = parent;
        }
    }

    return utils.merge($(), utils.unique(parentElems));
};

$.fn.children = function (selector) {
    var childNodes = [],
        currentChildren;

    var i = 0,
        len = this.length,
        filterResults = selector && utils.isFunction(selector),
        filterChildren = !!arguments.length && !filterResults;

    for (; i < len; i++) {
        currentChildren = this[i].children;
        utils.merge(childNodes, filterChildren ? $.fn.filter.call(currentChildren, selector) : currentChildren);
    }

    return utils.merge($(), filterResults ? $.fn.filter.call(childNodes, selector) : utils.unique(childNodes));
};

$.fn.siblings = function (selector) {
    var siblings = [],
        target;

    var i = 0,
        len = this.length,
        idxOfEvaled = 0,
        filterResults = selector && utils.isFunction(selector),
        winnowSiblings = !!arguments.length && !filterResults;

    for (; i < len; i++) {
        target = this[i].parentNode;
        target = target && target.firstChild;

        while (target) {
            if (target !== this[i] && (winnowSiblings ? matchesSelector(target, selector, idxOfEvaled++) : target.nodeType === 1)) {
                siblings[siblings.length] = target;
            }

            target = target.nextSibling;
        }
    }

    return utils.merge($(), filterResults ? $.fn.filter.call(siblings, selector) : utils.unique(siblings));
};

$.fn.first = function () {
    return this.eq(0);
};

$.fn.last = function () {
    return this.eq(-1);
};

$.fn.next = function (selector) {
    var subsequents = [],
        nextNode;

    var i = 0,
        len = this.length,
        idxOfEvaled = 0,
        selectorPassed = !!arguments.length;

    for (; i < len; i++) {
        // TODO: IE8 polyfill
        nextNode = this[i].nextElementSibling; // won't work for IE8
        if (selectorPassed ? nextNode && matchesSelector(nextNode, selector, idxOfEvaled++) : nextNode) {
            subsequents[subsequents.length] = nextNode;
        }
    }

    return utils.merge($(), subsequents.length > 1 ? utils.unique(subsequents) : subsequents);
};

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

/*
 * STYLE
 */

// IE8 POLYFILL:
function getStyle (elem, prop) {
    // while setting CSS can be done with either camel-cased or dash-separated properties
    // getting computed CSS properties is persnickety about formatting

    if (window.getComputedStyle === undef) { // IE8 POLYFILL
        prop = prop === 'float' ?
            'styleFloat' :
            prop.replace(/^-ms-/, 'ms-').replace(/-([a-z])/gi, function (all, letter) { // insure that property is camel cased
                return letter.toUpperCase();
            });

        return elem.currentStyle[prop];
    }

    // apparently, IE <= 11 will throw for elements in popups
    // and FF <= 30 will throw for elements in an iframe
    if (elem.ownerDocument.defaultView.opener) {
        return elem.ownerDocument.defaultView.getComputedStyle( elem, null )[prop];
    }

    return window.getComputedStyle(elem, null)[prop];
}

$.fn.css = function (property, value) {

    // jQuery craps out when given falsy properties
    if (!property) {
        return this;
    }

    var i = 0,
        len, key;

    if (value === undef) { // get CSS or set via object

        if (utils.isObject(property)) { // set CSS via object
            for (len = this.length; i < len; i++) {
                for (key in property) {
                    if (property.hasOwnProperty(key)) {
                        this[i].style[key] = property[key];
                    }
                }
            }

        } else if (utils.isArray(property)) {
            var result = {};

            for (len = property.length; i < len; i++) {
                result[property[i]] = getStyle(this[0], property[i]);
            }

            return result;

        } else {
            return getStyle(this[0], property);
        }

    } else { // set CSS via key/value
        var fnVal = utils.isFunction(value);

        for (len = this.length; i < len; i++) {
            this[i].style[property] = fnVal ? value.call(this[0], i, getStyle(this[i], property)) : value;
        }
    }

    return this;
};

$.fn.hasClass = function (className) {
    // ripped nearly word for word from jQuery. Thanks, open source world.
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(/[\t\r\n\f]/g, ' ').indexOf(className) >= 0) {
            return true;
        }
    }

    return false;
};

$.fn.addClass = function (value) {

    if (!value) {
        return utils.merge($(), this);
    }

    var i = 0,
        len = this.length;

    if (typeof value === strType) {

        var newClasses = utils.trim(value).split(' ');

        for (; i < len; i++) {
            var classes = (' ' + this[i].className + ' ').replace(/[\t\r\n\f]+/g, ' '),
                addedNewClasses = false;

            for (var j = 0, classLen = newClasses.length; j < classLen; j++) {
                if (classes.indexOf(newClasses[j]) < 0) {
                    classes += newClasses[j] + ' ';
                    addedNewClasses = true;
                }
            }

            if (addedNewClasses) {
                this[i].className = classes;
            }
        }

        return this;

    } else if (utils.isFunction(value)) {

        var result = [];

        for (; i < len; i++) {
            // have to pass node recusively in an array so it registers in the add class loop
            result.push($.fn.addClass.call([this[i]], value.call(this, i, this[i].className))[0]);
        }

        return utils.merge($(), result);
    }
};

$.fn.removeClass = function (value) {

    if (!value) {
        return utils.merge($(), this);
    }

    var i = 0,
        len = this.length;

    if (typeof value === strType) {

        var doomedClasses = ' ' + value + ' ';

        for (; i < len; i++) {
            var classes = this[i].className.replace(/[\s\t\r\n\f]+/, ' ').split(' '),
                classLen = classes.length;

            for (var j = 0; j < classLen; j++) {
                var idx = doomedClasses.indexOf(classes[j]);
                if (idx !== -1) {
                    classes.splice(idx, 1);
                }
            }

            if (classes.length !== classLen) {
                this[i].className = classes.join(' ');
            }
        }

        return this;

    } else if (utils.isFunction(value)) {

        var result = [];

        for (; i < len; i++) {
            // have to pass node recusively in an array so it registers in the add class loop
            result.push($.fn.removeClass.call([this[i]], value.call(this, i, this[i].className))[0]);
        }

        return utils.merge($(), result);
    }
};

function getNonHiddenDisplayValue (elem) {
    var disp = elem.style.display;

    if (!disp || disp === 'none') {
        disp = getElementData(elem, 'nonHiddenDisplayValue');
    }

    if (!disp) {
        var tmp = docConstruct.createElement(elem.nodeName);
        elem.parentNode.appendChild(tmp);
        disp = getStyle(tmp, 'display');
        elem.parentNode.removeChild(tmp);
        setElementData(elem, 'nonHiddenDisplayValue', disp);
    }

    return disp;
}

// Does not support animation: use fadeIn instead
$.fn.show = function () {
    this.each(function () {
        this.style.display = getNonHiddenDisplayValue(this);
        this.style.visibility = 'visible';
        this.style.opacity = 1;
    });
};

// Does not support animation: use fadeOut instead
$.fn.hide = function () {
    this.each(function () {
        this.style.display = 'none';
    });
};

/**
 * TRIGGER
 */

$.fn.on = $.fn.bind = function (events, handler) {
    if (typeof events !== strType || typeof handler !== fnType) {
        return this;
    }

    events = events.split(' ');

    var addEventListenerCompat = elemProto.addEventListener || elemProto.attachEvent,
        i, evLen;

    this.each(function () {
        for (i = 0, evLen = events.length; i < evLen; i++) {
            addEventListenerCompat.call(this, events[i], handler, false);
            pushElementData(this, 'activeEventListeners', handler);
        }
    });

    return this;
};

$.fn.off = $.fn.unbind = function (events, handler) {
    if (typeof events !== strType) {
        return this;
    }

    events = events.split(' ');

    var removeEventListenerCompat = elemProto.removeEventListener || elemProto.detachEvent,
        i, evLen, handlers, j, hdlrLen;

    this.each(function () {
        for (i = 0, evLen = events.length; i < evLen; i++) {
            handlers = typeof handler === fnType ? handlers = [handler] : getElementData(this, 'activeEventListeners');
            for (j = 0, hdlrLen = handlers.length; j < hdlrLen; j++) {
                removeEventListenerCompat.call(this, events[i], handlers[j], false);
            }
        }
    });

    return this;
};

function triggerEventOnElements (elems, eventName, args) {
    var ev;

    args.unshift(new Event(eventName));

    utils.each(elems, function () {
        ev = this[eventName];
        if (typeof ev === fnType) {
            ev.apply(this, args);
        }
    });
}

$.fn.trigger = function (eventName) {
    var args = arrSlice.call(arguments, 1);

    triggerEventOnElements(this, eventName, args);

    return this;
};

function bindOrTriggerEventHandler (eventName, args) {
    // transform Arguments object into an Array
    args = arrSlice.call(args);

    // bind handler to event
    if (args.length === 1 && typeof args[0] === fnType) {
        $.fn.on.call(this, eventName, args[0]);

    // trigger event
    } else {
        triggerEventOnElements(this, eventName, args);
    }

    return this;
}

$.fn.click = function () {
    return bindOrTriggerEventHandler.call(this, 'click', arguments);
};

$.fn.focus = function () {
    return bindOrTriggerEventHandler.call(this, 'focus', arguments);
};

$.fn.blur = function () {
    return bindOrTriggerEventHandler.call(this, 'blur', arguments);
};

$.fn.change = function () {
    return bindOrTriggerEventHandler.call(this, 'change', arguments);
};

$.fn.resize = function () {
    return bindOrTriggerEventHandler.call(this, 'resize', arguments);
};

/**
 * MUTATE
 */

$.fn.empty = function () {
    var elem,
        i = 0;

    for (; (elem = this[i]); i++) {
        if (elem.nodeType === 1) {
            elem.textContent = '';
        }
    }

    return this;
};

$.fn.remove = function (selector) {
    var target;
    var i = 0;
    var id;

    for (; (target = this[i]); i++) {
        if (matchesSelector(target, selector) && target.parentNode) {
            target.parentNode.removeChild(target);
        }
    }

    return this;
};
/**
 * ANIMATE
 */

/* Internals for matching a collection of selected elements */

function normalizeContext (context) {
    // takes a bunch of stuff, always returns an array of nodes

    if (!context) { // optimize for no context passed
        return [docElement];
    }

    if (typeof context === strType) {
        return getNodes(context);
    }

    if (context.isDollar) {
        return context.get();
    }

    if (context.nodeType === 1) {
        return [context];
    }

    if (utils.isArray(context)) {
        return context;
    }

    return [docElement];
}

function parseHTML (htmlString) {

    // thank you jQuery for the awesome regExp
    var singleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(htmlString);

    // HANDLE: '<div></div>', etc.
    if (singleTag) {
        return [docConstruct.createElement(singleTag[1])];
    // HANDLE: '<div><p></p></div>', etc.
    } else {
        var disposableContainer = docConstruct.createElement('div');
        disposableContainer.innerHTML = htmlString;
        return disposableContainer.children;
    }
}

function getNodes (selector, context) {
    // where selector is a string selector, HTML string, dollar collection, dom node
    // and optional context is array of dom nodes or single dom node
    // returns array of dom nodes

    var results = [];

    // normalize selector to string or exit early
    if (typeof selector !== strType) {
        if (selector.isDollar && selector.selector) {
            selector = selector.selector;
        } else if (selector.nodeType) {
            return selector === context ? results : [selector];
        } else {
            return results;
        }
    }

    if (context) {
        context = normalizeContext(context);

        if (context.length > 1) {
            var i = 0,
                len = context.length;

            for (; i < len; i++) {
                arrPush.apply(results, getNodes(selector, context[i]));
            }

            return utils.unique(results);
        } else {
            context = context[0];
        }
    } else {
        context = docElement;
    }

    // -------------------------------------------
    // at this point, selector must be a string
    // & context must be HTML node (or doc.docElem)
    // -------------------------------------------

    var selectorsMap = /^\s*(?:#([\w-]+)|(\w+)|\.([\w-]+)|(<[\w\W]+>)[^>]*)\s*$/.exec(selector);
    // selectorsMap will return:
    // if id => ['#foo', 'foo', undefined, undefined, 'undefined']
    // node  => ['body', undefined, body, undefined', 'undefined']
    // class => ['.bar', undefined, undefined, 'bar', 'undefined']
    // HTML  => ['HTML', undefined, undefined, undefined,  'HTML']
    // else  => null

    if (selectorsMap) {

        // HANDLE: $('#id')
        if (selector = selectorsMap[1]) {
            var result = docConstruct.getElementById(selector);
            if (result && context !== result && context.contains(result)) {
                results[0] = result;
            }

            return results;

        // HANDLE: $('tag')
        } else if (selector = selectorsMap[2]) {
            return utils.merge(results, context.getElementsByTagName(selector));

        // HANDLE: $('.class')
        } else if (selector = selectorsMap[3]) {
            return utils.merge(results, polyfillGetClass(context, selector));

        // HANDLE: $('<div> ... </div>')
        } else if (selector = selectorsMap[4]) {
            return parseHTML(selector);
        }

    // HANDLE: pseudo-selectors, chained classes, etc.
    } else {
        return utils.merge(results, context.querySelectorAll(selector));
    }

    function polyfillGetClass (con, sel) {
        // ie8 polyfill
        // wtf IE, this is so hacky
        return con.getElementsByClassName ?
            con.getElementsByClassName(sel) :
            con.querySelectorAll('.' + sel);
    }
}

function matchesSelector (node, selector, idx) {
    // where node is a single node
    // and selector is string, dollar selection, node, or function
    // and optional idx is index of node within the calee's collection
    // returns boolean

    // reject no selector, doc.frags, text, docConstruct, etc.
    if (!selector || node.nodeType !== 1) {
        return false;
    }

    // handle selectors
    if (typeof selector !== strType) {
        if (selector.isDollar) {
            selector = selector.selector;
        } else if (selector.nodeType) {
            return node === selector;
        } else if (utils.isFunction(selector)) {
            return !!selector.call(node, idx, node);
        } else {
            return false;
        }
    }

    // normalise browser nonsense
    var matches = node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector;

    // IE8 polyfill
    return matches ?
        matches.call(node, selector) :
        polyfillMatches(selector);

    function polyfillMatches (sel) {
        var allMatches = getNodes(sel);
        return Array.prototype.indexOf.call(allMatches, node) !== -1;
    }
}

// element data (use private cache by default)
var DATA_ATTR_ID = 'dollar-id',
    PRIVATE_DATA_CACHE = [null];

function getInternalElementId (elem) {
    return parseInt(elem.getAttribute(DATA_ATTR_ID)) || undef;
}

function setInternalElementId (elem, referenceId) {
    return elem.setAttribute(DATA_ATTR_ID, referenceId);
}

function getElementData (elem, attr, cache) {
    cache = cache || PRIVATE_DATA_CACHE;

    var id = getInternalElementId(elem);

    if (!attr) {
        return cache[id];
    }

    return id && cache[id] && cache[id][attr];
}

function setElementData (elem, attr, value, cache) {
    cache = cache || PRIVATE_DATA_CACHE;

    var id = getInternalElementId(elem);

    if (id) {
        cache[id][attr] = value;
    } else {
        var cachedElemData = {};
        cachedElemData[attr] = value;
        id = cache.push(cachedElemData) - 1;
        setInternalElementId(elem, id);
    }
}

function pushElementData (elem, attr, value, cache) {
    cache = cache || PRIVATE_DATA_CACHE;

    var id = getInternalElementId(elem),
        stack;

    if (id) {
        stack = cache[id][attr] || [];
        stack.push(value);
    } else {
        var cachedElemData = {};
        cachedElemData[attr] = [value];
        id = cache.push(cachedElemData) - 1;
        setInternalElementId(elem, id);
    }
}

/**
 * Export using whatever method is best
 * module.exports
 * window.$
 */

(function () {

    var win = window;

    // AMD loader
    if (typeof win.define === 'function' && define.amd) {
        win.define(function () {
            return $;
        });

    // Node.js
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = $;

    // Global window
    } else {
        win.$ = $;
    }

}.call(this));

}.call(this));
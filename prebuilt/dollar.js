/**
 * DollarJS -- a lighter, faster, jQuery replacement
 */

;(function () {


/*********************/
/*    CORE DOLLAR    */
/*********************/


var $ = function (selector, context) {
    return new $.fn.init(selector, context);
};


var undef,
    strType = 'string',
    fnType = 'function',

    win = window,

    elemProto = win.Element.prototype,

    objProto = Object.prototype,
    objToString = objProto.toString,
    objHasProp = objProto.hasOwnProperty,

    arrProto = Array.prototype,
    arrSlice = arrProto.slice,

    docConstruct = document,
    docElement = document.documentElement,

    utils;

var DATA_ATTR_ID = 'dollar-node-id';
var PUBLIC_DATA_CACHE = [null]; // start ids at 1 for truthyness
var PRIVATE_DATA_CACHE = [null];

var regExpSpacesAndBreaks = /[\s\t\r\n\f]+/g;


$.fn = $.prototype = {
    constructor: $,

    selector: '',

    length: 0,

    isDollar: true,

    // easily add/remove elements in dollar collection
    indexOf: arrProto.indexOf,
    push: arrProto.push,

    // Hack to make console.log display selected elements as an Array
    splice: arrProto.splice,

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {
        if (num === undef) {
            // Return all the elements in a clean array
            return arrSlice.call(this, 0);

        } else {
            // Return just the one element from the set
            return num < 0 ? this[num + this.length] : this[num];
        }
    }
};

$.fn.init = function (selector, context) {

    // make length a property instead of inherited
    this.length = 0;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
        return this;
    }

    if (!context) {
        // HANDLE: simple $("#id") for performance
        if ((/^#[\w-]+$/).test(selector)) {
            var idShortcut = docConstruct.getElementById(selector.substr(1));
            if (idShortcut) {
                this[0] = idShortcut;
                this.length = 1;
            }

            return this;
        }

        // HANDLE: simple $("tag") for performance
        if ((/^[a-z]+$/).test(selector)) {
            var tags = docConstruct.getElementsByTagName(selector);
            var tLen = tags.length;
            for (var i = 0; i < tLen; i++) {
                this[i] = tags[i];
            }
            this.length = tLen;

            return this;
        }
    }

    return utils.merge(this, getNodesBySelector(selector, context));
};

// Give the init function the $ prototype for later instantiation
$.fn.init.prototype = $.fn;


// combines collections/arrays into one dollar collection (with distinct values)
function collect () {
    var distinct = $();
    var i, len, item;

    utils.each(arrSlice.call(arguments), function (collection) {
        if (collection) {
            for (i = 0, len = collection.length; i < len; i++) {
                item = collection[i];
                if (distinct.indexOf(item) === -1) {
                    distinct.push(item);
                }
            }
        }
    });

    return distinct;
}

// takes any type of selector
// returns an array of matching dom nodes
function getNodesBySelector (selector, context) {

    // HANDLE: strings
    if (typeof selector === strType) {
        return getNodesBySelectorString(selector, context);

    // HANDLE: dollar instance
    } else if (selector.isDollar) {
        return selector.get();

    // HANDLE: $(DOM Node)
    } else if (selector.nodeType) {
        return [selector];

    // HANDLE: $([DOM Nodes])
    } else if (selector.length) {
        var arr = [];
        var item;

        for (var i = 0, len = selector.length; i < len; i++) {
            item = selector[i];
            if (utils.isElement(item)) {
                arr.push(item);
            }
        }

        return arr;

    // HANDLE: dom ready
    } else if (typeof selector === fnType) {
        var state = document.readyState;
        if (state === 'interactive' || state === 'complete') {
            selector();

        } else {
            var ev = 'DOMContentLoaded';

            if (elemProto.addEventListener) {
                document.addEventListener(ev, selector, false);

            } else {
                // IE8 Polyfill
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState === 'interactive' || document.readyState === 'complete') {
                        selector();
                    }
                });
            }
        }

    }

    return [];
}

// takes any String as selector
// returns an array of matching dom nodes
function getNodesBySelectorString (selector, context) {
    if (context) {
        var results = [];
        context = normalizeContext(context);

        if (context.length > 1) {
            for (var i = 0, len = context.length; i < len; i++) {
                utils.merge(results, getNodesBySelectorString(selector, context[i]));
            }

            return results;

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

    var selectorsMap = (/^\s*(?:#([\w-]+)|(\w+)|\.([\w-]+)|(<[\w\W]+>)[^>]*)\s*$/).exec(selector);
    // selectorsMap will return:
    // if id => ['#foo', 'foo', undefined, undefined, 'undefined']
    // node  => ['body', undefined, body, undefined', 'undefined']
    // class => ['.bar', undefined, undefined, 'bar', 'undefined']
    // HTML  => ['HTML', undefined, undefined, undefined,  'HTML']
    // else  => null

    if (selectorsMap) {

        // HANDLE: $('#id')
        if (selector = selectorsMap[1]) {
            var idMatch = docConstruct.getElementById(selector);
            if (idMatch && context !== idMatch && context.contains(idMatch)) {
                return [idMatch];
            }

            return [];

        // HANDLE: $('tag')
        } else if (selector = selectorsMap[2]) {
            return context.getElementsByTagName(selector);

        // HANDLE: $('.class')
        } else if (selector = selectorsMap[3]) {
            // IE8 Polyfill
            // OMG... this still fails in quirksmode
            return context.getElementsByClassName ? context.getElementsByClassName(selector) : context.querySelectorAll('.' + selector);

        // HANDLE: $('<div> ... </div>')
        } else if (selector = selectorsMap[4]) {
            return [htmlStringToNode(selector)];
        }

    // HANDLE: pseudo-selectors, chained classes, etc.
    } else {
        return arrSlice.call(context.querySelectorAll(selector));
    }
}

// returns true if the node matches the provided selector
// where node is a single node
// i is index of node within the calee's collection
// selector is string, dollar selection, node, or function
function nodeMatchesSelector (node, i, selector) {
    // reject no selector, doc.frags, text, docConstruct, etc.
    if (!selector || !node || node.nodeType !== 1) {
        return false;
    }

    // handle non-string selectors
    if (typeof selector !== strType) {

        // node/element
        if (selector.nodeType) {
            return node === selector;

        // function
        } else if (typeof selector === fnType) {
            return !!selector.call(node, i, node);

        // array of elements or dollar collection
        } else if (selector.length) {
            return selector.indexOf(node) !== -1;

        } else {
            return false;
        }
    }

    // normalise browser nonsense
    var matches = node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || polyfillMatches;

    return matches.call(node, selector);

    // IE8 Polyfill
    function polyfillMatches (sel) {
        var allMatches = getNodesBySelectorString(sel);
        return Array.prototype.indexOf.call(allMatches, node) !== -1;
    }
}

// convert a string into DOM elements
function htmlStringToNode (htmlString) {
    // thank you jQuery for the awesome regExp
    var singleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/).exec(htmlString);

    // HANDLE: '<div></div>', etc.
    if (singleTag) {
        return [docConstruct.createElement(singleTag[1])];

    // HANDLE: '<div><p></p></div>', etc.
    } else {
        var disposableContainer = docConstruct.createElement('div');
        disposableContainer.innerHTML = htmlString;
        return disposableContainer.childNodes[0];
    }
}

// always returns an array of nodes to use as context
function normalizeContext (context) {
    if (typeof context === strType) {
        return getNodesBySelectorString(context);
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


function getInternalElementId (elem) {
    return Number(elem.getAttribute(DATA_ATTR_ID)) || undef;
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

function formatDashedToCamelCase (str) {
    return str.replace(/\-(.)/g, function (all, s) {
        return s.charAt(0).toUpperCase();
    });
}

/*
 * Helper Utilities
 * @module $.utils
 */

$.utils = utils = (function () {

    var objPrefix = '[object ';

    // IE8 Polyfill
    function isArrayPolyfill (thing) {
        return objToString.call(thing) === objPrefix + 'Array]';
    }

    function isElement (thing) {
        // reject all but dom nodes & the document
        return thing && thing.nodeType === 1 || thing.nodeType === 9;
    }

    function isFunction (thing) {
        return objToString.call(thing) === objPrefix + 'Function]';
    }

    function isObject (thing) {
        return objToString.call(thing) === objPrefix + 'Object]';
    }

    function each (collection, iteratee) {
        if (collection) {
            if (collection.length !== undef) {
                for (var i = 0, len = collection.length; i < len; i++) {
                    if (iteratee.call(collection[i], collection[i], i, collection) === false) {
                        return;
                    }
                }

            } else {
                for (var prop in collection) {
                    if (objHasProp.call(collection, prop)) {
                        if (iteratee.call(collection[prop], collection[prop], prop, collection) === false) {
                            return;
                        }
                    }
                }
            }
        }
    }

    function extend () {
        var ret = arguments[0];
        var assignProp = function (val, key) {
            if (typeof val !== 'undefined') {
                ret[key] = val;
            }
        };

        each(arrSlice.call(arguments, 1), function (ext) {
            each(ext, assignProp);
        });

        return ret;
    }

    function merge () {
        var ret = arguments[0];
        var i, len;

        each(arrSlice.call(arguments, 1), function (collection) {
            if (collection) {
                for (i = 0, len = collection.length; i < len; i++) {
                    if (ret.indexOf(collection[i]) === -1) {
                        ret.push(collection[i]);
                    }
                }
            }
        });

        return ret;
    }


    return {

        isArray: Array.isArray || isArrayPolyfill,
        isElement: isElement,
        isFunction: isFunction,
        isObject: isObject,

        each: each,
        extend: extend,
        merge: merge,

        /* eslint-disable brace-style */
        // IE8 Polyfill
        trim: String.prototype.trim ? function (s) { return s.trim(); } : function (string) {
            return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
        /* eslint-enable brace-style */

    };

})();


$.fn.closest = function (selector, context) {
    if (!selector) {
        return $();
    }

    var allMatches = getNodesBySelector(selector, context);
    var onlyClosest = [];
    var node;

    for (var i = 0, len = this.length; i < len; i++) {
        node = this[i];
        while (node && node !== context) {
            if (arrProto.indexOf.call(allMatches, node) !== -1) {
                onlyClosest.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return collect(onlyClosest);
};


$.fn.each = function (iteratee) {
    utils.each(this, iteratee);
    return this;
};


$.fn.eq = function (index) {
    index = utils.isArray(index) ? NaN : parseInt(index, 10); // prevent parsing array of numbers

    return index >= 0 ?
        $(this[index]) :
        $(this[this.length + index]); // have to + a -index in order to subtract
};


$.fn.filter = function (selector) {
    if (!this.length || !selector) {
        return $();
    }

    var matches = [];

    for (var i = 0, len = this.length; i < len; i++) {
        if (nodeMatchesSelector(this[i], i, selector)) {
            matches.push(this[i]);
        }
    }

    return collect(matches);
};


$.fn.find = function (selector) {
    if (!selector || !this.length) {
        return $();
    }

    return collect(getNodesBySelector(selector, this));
};


/****************/
/*    FILTER    */
/****************/


$.fn.add = function (selector, context) {
    if (!selector) {
        return this;
    }

    return collect(this, $(selector, context));
};


$.fn.has = function (selector) {
    if (!selector) {
        return $();
    }

    return this.filter(function () {
        return !!getNodesBySelector(selector, this).length;
    });
};


$.fn.is = function (selector) {
    return !!(selector && this.filter(selector).length);
};


$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    var criteria;

    if (typeof selector === fnType) {
        criteria = function (i, node) {
            return !selector.call(node, i, node);
        };

    } else {
        criteria = function (i, node) {
            return !nodeMatchesSelector(node, i, selector);
        };
    }

    return collect(this.filter(criteria));
};


/****************/
/*    MUTATE    */
/****************/


/**
 * Inserts an array of contents into the DOM
 * Note: if more than one elem in dollar instance, inserted Elements will be moved instead of cloned
 */
function domInsert (contentsArr, method) {
    // Flatten nested arrays
    contentsArr = [].concat.apply([], contentsArr);

    var i, j, doInsert, content, frag, generatedNode;
    var colLen = contentsArr.length;
    var elemsLen = this.length;

    function nodeToFrag (node) {
        frag.appendChild(node);
        doInsert = true;
    }

    for (j = 0; j < elemsLen; j++) {
        doInsert = false;
        frag = document.createDocumentFragment();

        for (i = 0; i < colLen; i++) {
            content = contentsArr[i];

            if (content) {
                // content is String
                if (typeof content === strType) {
                    if(generatedNode = htmlStringToNode(content)) {
                        nodeToFrag(generatedNode);
                    }

                // content is Element
                } else if (content.nodeType === 1) {
                    nodeToFrag(content);

                // content is dollar collection
                } else if (content.isDollar) {
                    content.each(nodeToFrag);

                // content is function
                } else if (typeof content === fnType) {
                    generatedNode = content(this[j], j);

                    if (typeof generatedNode === strType) {
                        generatedNode = htmlStringToNode(generatedNode);
                    }

                    if (generatedNode) {
                        nodeToFrag(generatedNode);
                    }
                }
            }
        }

        if(doInsert) {
            method(this[j], frag);
        }
    }

    return this;
}


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


$.fn.append = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        elem.appendChild(content);
    });
};


$.fn.before = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.parentNode) {
            elem.parentNode.insertBefore(content, elem);
        }
    });
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


$.fn.prepend = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.firstChild) {
            elem.insertBefore(content, elem.firstChild);
        } else {
            elem.appendChild(content);
        }
    });
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
            if (nodeMatchesSelector(target, i, selector) && target.parentNode) {
                target.parentNode.removeChild(target);
            }
        }
    }

    return this;
};


/*******************/
/*    READWRITE    */
/*******************/


function nodeSupportsAttrProp (node) {
    // don't get/set attributes or properties on text, comment and attribute nodes
    var nType = node && node.nodeType;
    return nType && nType !== 3 && nType !== 8 && nType !== 2;
}


function getAttributeSafely (elem, attr) {
    return (!nodeSupportsAttrProp(elem) || !elem.hasAttribute(attr)) ? undef : (elem.getAttribute(attr) || attr);
}

$.fn.attr = function (attr, value) {

    if (value === undef) {
        return getAttributeSafely(this[0], attr);
    }

    this.each(function (elem, i) {
        if (nodeSupportsAttrProp(elem)) {
            if (typeof value === fnType) {
                value = value(i, getAttributeSafely(elem, attr));
            }

            elem.setAttribute(attr, value);
        }
    });

    return this;
};


function getDataFromDOM (elem) {
    // Polyfill for IE8-10 and Opera Mini
    return elem && elem.dataset || (function () {
        var data = {};
        var allAttr = elem.attributes;
        var isDataAttr = /^data-[a-z_\-\d]*$/i;
        var name;

        for (var n in allAttr) {
            if (allAttr.hasOwnProperty(n)) {
                name = allAttr[n].name;
                if (isDataAttr.test(name)) {
                    name = formatDashedToCamelCase(name.substr(5));
                    data[name] = allAttr[n].value;
                }
            }
        }

        return data;
    })();
}

// setting data through dollar does NOT create corresponding data-attributes on the element
$.fn.data = function (key, value) {
    if (!this.length) {
        return undef;
    }

    var elem, map = {};

    // get all data
    if (!key) {
        return utils.extend({}, getDataFromDOM(this[0]), getElementData(this[0], undef, PUBLIC_DATA_CACHE));
    }

    if (typeof key === strType) {

        // get one value
        if (value === undef) {
            return getElementData(this[0], key, PUBLIC_DATA_CACHE) || getDataFromDOM(this[0])[key];
        }

        // set map with one value
        map[key] = value;

    } else if (utils.isObject(key)) {
        // set using provided object as map
        map = key;
    }

    function setDataByMap (v, k) {
        setElementData(elem, k, v, PUBLIC_DATA_CACHE);
    }

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        utils.each(map, setDataByMap);
    }

    return this;
};


function getPropertyFromElem (elem, prop) {
    return nodeSupportsAttrProp(elem) ? elem[prop] : undef;
}

$.fn.prop = function (prop, value) {

    if (value === undef) {
        return getPropertyFromElem(this[0], prop);
    }

    this.each(function (elem, i) {
        if (nodeSupportsAttrProp(elem)) {
            if (typeof value === fnType) {
                value = value(i, getPropertyFromElem(elem, prop));
            }

            elem[prop] = value;
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


$.fn.removeData = function (key) {
    var elem, id;

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        id = getInternalElementId(elem);

        if (key) {
            // clean dollar data
            if (id) {
                delete PUBLIC_DATA_CACHE[id][key];
            }

            // clean DOM data
            if (elem && elem.dataset && elem.dataset[key]) {
                delete elem.dataset[key];
            }

        } else {
            PUBLIC_DATA_CACHE[id] = {};
        }
    }

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


$.fn.text = function (insertion) {
    if (insertion !== undef) {
        this.each(function (elem, i) {
            if (elem.nodeType === 1 || elem.nodeType === 11 || elem.nodeType === 9) {
                if (typeof insertion === fnType) {
                    elem.textContent = insertion(i, elem.textContent);
                } else {
                    elem.textContent = insertion;
                }
            }
        });

        return this;
    }

    var ret = '';

    this.each(function (elem) {
        var nodeType = elem.nodeType;

        if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof elem.textContent === strType) {
                ret += elem.textContent;
            }

        } else if (nodeType === 3 || nodeType === 4) {
            ret += elem.nodeValue;
        }
    });

    return ret;
};

// IE8 Polyfill
if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(elemProto, 'textContent') && !Object.getOwnPropertyDescriptor(elemProto, 'textContent').get) {
    (function () {
        var innerText = Object.getOwnPropertyDescriptor(elemProto, 'innerText');
        Object.defineProperty(elemProto, 'textContent', {
            get: function () {
                return innerText.get.call(this);
            },
            set: function (s) {
                return innerText.set.call(this, s);
            }
        });
    })();
}


$.fn.val = function (insertion) {
    if (insertion === undef) {
        return this[0].value;
    }

    for (var i = 0; i < this.length; i++) {
        if (this[i].nodeType !== 1) {
            break;
        }

        if (typeof insertion === fnType) {
            insertion = insertion.call(this[i], i, this[i].value);
        }

        this[i].value = insertion;
    }

    return this;
};


/***************/
/*    STYLE    */
/***************/


// get styles across various browsers
function getStyle (elem, prop) {
    // while setting CSS can be done with either camel-cased or dash-separated properties
    // getting computed CSS properties is persnickety about formatting

    // IE8
    if (win.getComputedStyle === undef) {
        prop = prop === 'float' ?
            'styleFloat' :
            prop = formatDashedToCamelCase(prop.replace(/^-ms-/, 'ms-')); // insure that property is camel cased

        return elem.currentStyle[prop];
    }

    // apparently, IE <= 11 will throw for elements in popups
    // and FF <= 30 will throw for elements in an iframe
    if (elem.ownerDocument.defaultView.opener) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null)[prop];
    }

    return win.getComputedStyle(elem, null)[prop];
}

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


$.fn.addClass = function (value) {
    if (!value) {
        return this;
    }

    var newClasses, oldClasses;
    var i, len = this.length;

    if (typeof value === strType) {
        newClasses = utils.trim(value).split(' ');

        for (i = 0; i < len; i++) {
            oldClasses = utils.trim(this[i].className).replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }

    } else if (typeof value === fnType) {
        for (i = 0; i < len; i++) {
            newClasses = value.call(this[i], i, this[i].className).split(' ');
            oldClasses = utils.trim(this[i].className).replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }
    }

    return this;
};


$.fn.css = function (property, value) {
    if (!property) {
        return this;
    }

    var i, len = this.length;
    var elem, map = {};

    if (typeof property === strType) {

        // get one value
        if (value === undef) {
            return getStyle(this[0], property);
        }

        // set with one value
        map[property] = value;

    } else if (utils.isObject(property)) {
        // set using provided object as map
        map = property;
    }

    function setPropertyByMap (v, k) {
        elem.style[k] = typeof v === fnType ? v.call(elem, i, getStyle(elem, k)) : v;
    }

    for (i = 0; i < len; i++) {
        elem = this[i];
        utils.each(map, setPropertyByMap);
    }

    return this;
};


$.fn.hasClass = function (className) {
    if (!className) {
        return false;
    }

    // sandwich className with one space to avoid partial matches
    className = ' ' + utils.trim(className) + ' ';

    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(regExpSpacesAndBreaks, ' ').indexOf(className) !== -1) {
            return true;
        }
    }

    return false;
};


// Does not support animation: use fadeOut instead
$.fn.hide = function () {
    this.each(function () {
        this.style.display = 'none';
    });

    return this;
};


$.fn.removeClass = function (names) {
    var elem, newClasses, oldClasses, doomedClasses;

    function removeDoomed (old) {
        if (doomedClasses.indexOf(old) === -1) {
            newClasses.push(old);
        }
    }

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        newClasses = [];

        // remove all
        if (!names) {
            elem.className = '';

        } else {
            if (typeof names === fnType) {
                doomedClasses = names.call(elem, i, elem.className);
            } else {
                doomedClasses = names;
            }

            if (doomedClasses.length) {
                doomedClasses = typeof doomedClasses === strType ? utils.trim(doomedClasses).split(' ') : doomedClasses;
                oldClasses = elem.className.replace(regExpSpacesAndBreaks, ' ').split(' ');
                oldClasses.forEach(removeDoomed);
                elem.className = newClasses.join(' ');
            }
        }
    }

    return this;
};


// Does not support animation: use fadeIn instead
$.fn.show = function () {
    this.each(function () {
        this.style.display = getNonHiddenDisplayValue(this);
        this.style.visibility = 'visible';
        this.style.opacity = 1;
    });

    return this;
};


/******************/
/*    TRAVERSE    */
/******************/


$.fn.children = function (selector) {
    var childNodes = [];

    for (var i = 0, len = this.length; i < len; i++) {
        utils.merge(childNodes, this[i].children);
    }

    return collect(selector ? $.fn.filter.call(childNodes, selector) : childNodes);
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

    for (var i = 0, len = this.length; i < len; i++) {
        nextNode = this[i].nextElementSibling;
        if (nextNode) {
            subsequents.push(nextNode);
        }
    }

    return collect(selector ? $.fn.filter.call(subsequents, selector) : subsequents);
};

// IE8 Polyfill
if (!('nextElementSibling' in docElement)) {
    Object.defineProperty(elemProto, 'nextElementSibling', {
        get: function () {
            var elem = this.nextSibling;

            while (elem && elem.nodeType !== 1) {
                elem = elem.nextSibling;
            }

            return elem;
        }
    });
}


$.fn.parent = function (selector) {
    var parentElems = [],
        parent;

    for (var i = 0, len = this.length; i < len; i++) {
        parent = this[i].parentNode;

        if (parent) {
            parentElems.push(parent);
        }
    }

    return collect(selector ? $.fn.filter.call(parentElems, selector) : parentElems);
};


$.fn.siblings = function (selector) {
    var siblings = [],
        target;

    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].parentNode) {
            target = this[i].parentNode.firstChild;
        }

        while (target) {
            if (target !== this[i] && target.nodeType === 1) {
                siblings.push(target);
            }

            target = target.nextSibling;
        }
    }

    return collect(selector ? $.fn.filter.call(siblings, selector) : siblings);
};


/*****************/
/*    TRIGGER    */
/*****************/


function triggerEventOnElements (elems, eventName, args) {
    var ev;

    args.unshift(new win.Event(eventName));

    utils.each(elems, function () {
        ev = this[eventName];
        if (typeof ev === fnType) {
            ev.apply(this, args);
        }
    });
}

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


$.fn.trigger = function (eventName) {
    if (!eventName) {
        return this;
    }

    var args = arrSlice.call(arguments, 1);

    triggerEventOnElements(this, eventName, args);

    return this;
};


/****************/
/*    EXPORT    */
/****************/

/**
 * Export using whatever method is best
 * module.exports
 * window.$
 */
(function () {

    var win = window;

    // AMD loader
    if (typeof win.define === fnType && win.define.amd) {
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

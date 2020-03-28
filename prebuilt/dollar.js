/*!
 * DollarJS 2.2.1 -- a light, fast, modular, jQuery replacement
 *   Github: https://github.com/seebigs/dollar-js
 *   Released under the MIT license: https://opensource.org/licenses/MIT
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

var regExpSpacesAndBreaks = /[\s\t\r\n\f]+/g;


$.isDollar = true;

$.fn = {
    isDollar: true,
    indexOf: arrProto.indexOf,
    push: arrProto.push,
    pop: arrProto.pop,
    shift: arrProto.shift,
    unshift: arrProto.unshift,
    slice: arrProto.slice,
    splice: arrProto.splice // Makes console.log display selected elements as an Array
};

$.fn.init = function (selector, context) {

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

var pseudoMatchers = {

    contains: function (tag, context, pseudoPieces) {
        var content = pseudoPieces[1] && pseudoPieces[1].replace(/["')]/g, '');
        if (content) {
            return filterNodes(getNodesBySelectorString(tag, context), function (node) {
                return ( node.textContent || node.innerText ).indexOf(content) !== -1;
            });
        }

        return [];
    },

    hidden: function (tag, context) {
        return filterNodes(getNodesBySelectorString(tag, context), function (node) {
            return node.nodeType === 1 && !( node.offsetWidth || node.offsetHeight || node.getClientRects().length );
        });
    },

    visible: function (tag, context) {
        return filterNodes(getNodesBySelectorString(tag, context), function (node) {
            return node.nodeType === 1 && !!( node.offsetWidth || node.offsetHeight || node.getClientRects().length );
        });
    },

    even: function (tag, context) {
        return arrSlice.call(context.querySelectorAll(tag + ':nth-child(even)'));
    },

    odd: function (tag, context) {
        return arrSlice.call(context.querySelectorAll(tag + ':nth-child(odd)'));
    },

    has: function (tag, context, pseudoPieces) {
        var nestedSelector = typeof pseudoPieces[1] === strType && pseudoPieces[1].replace(')', '');
        if (nestedSelector) {
            return filterNodes(getNodesBySelector(tag, context), function (node) {
                return node.nodeType === 1 && !!getNodesBySelector(nestedSelector, node).length;
            });
        }
        return [];
    },

    not: function (tag, context, pseudoPieces) {

        // set to docConstruct to include <html> & match jQuery
        if (context === docElement) {
            context = docConstruct;
        }

        // ==========================================
        // given original selector "#foo :not(bar) .baz"

        // tag = "#foo "
        var preAndPostNotSelector = tag;
        if (tag !== '*' && tag[tag.length - 1] === ' ') {
            preAndPostNotSelector = tag + '*';
        }

        // pseudoPieces = ["not", "bar) .baz"]
        var notAndPostNot = pseudoPieces[1].split(')'); // ["bar", ".baz"]
        var postNotSelector = notAndPostNot[1]; // ".baz"
        var notSelectors = (notAndPostNot[0] || '').split(','); // ["bar"]

        if (postNotSelector) {
            preAndPostNotSelector += postNotSelector; // #foo .baz
        }

        var filteredOnNotSelectors = [];
        // find all els matching #foo .baz
        var allMatchingPreAndPost = getNodesBySelectorString(preAndPostNotSelector, context);

        // filter those results for !bar
        utils.each(allMatchingPreAndPost, function (el) {

            var returnEl = true;
            utils.each(notSelectors, function (noMatchSelector) {
                if (getMatches.call(el, noMatchSelector)) { // matching bar from :not(bar)? dont return it
                    returnEl = false;
                    return false; // drop out of loop
                }
            });

            if (returnEl) {
                filteredOnNotSelectors.push(el);
            }
        });

        return filteredOnNotSelectors;
    }

};

function findWithinContextIfPresent (childrenEls, context) {
    if (context) {
        var parentEls = normalizeContext(context);
        var found = [];
        utils.each(parentEls, function (parentEl) {
            utils.each(childrenEls, function (childEl) {
                if (typeof parentEl.contains === fnType && parentEl.contains(childEl)) {
                    found.push(childEl);
                }
            });
        });
        return found;
    } else {
        return childrenEls;
    }
}

// takes any type of selector
// returns an array of matching dom nodes
function getNodesBySelector (selector, context) {

    // HANDLE: strings
    if (typeof selector === strType) {
        return getNodesBySelectorString(selector, context);

    // HANDLE: dollar instance
    } else if (selector.isDollar) {
        return findWithinContextIfPresent(selector.get(), context);

    // HANDLE: $(DOM Node)
    } else if (selector.nodeType) {
        return findWithinContextIfPresent([selector], context);

    // HANDLE: $(window)
    } else if (selector === selector.window) {
        return [selector];

    // HANDLE: $([DOM Nodes])
    } else if (selector.length) {

        var selectorEls = [];
        var item;

        for (var i = 0, len = selector.length; i < len; i++) {
            item = selector[i];
            if (utils.isElement(item)) {
                selectorEls.push(item);
            }
        }

        return findWithinContextIfPresent(selectorEls, context);

    // HANDLE: dom ready
    } else if (typeof selector === fnType) {

        if (documentReady()) {
            selector();

        } else {
            if (elemProto.addEventListener) {
                docConstruct.addEventListener('DOMContentLoaded', selector, false);

            } else {
                docConstruct.attachEvent('onreadystatechange', function () {
                    if (documentReady()) {
                        selector();
                    }
                });
            }
        }

    }

    function documentReady () {
        var state = docConstruct.readyState;
        return state === 'interactive' || state === 'complete';
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

    if (!context) {
        return []; // HANDLE $('valid', $());
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
            return typeof context.getElementsByClassName === fnType ? context.getElementsByClassName(selector) : context.querySelectorAll(selector);

        // HANDLE: $('<div> ... </div>')
        } else if (selector = selectorsMap[4]) {
            return [htmlStringToNode(selector)];
        }

    // HANDLE: special pseudo-selectors
    } else {
        var pseudoSelector = /(.*):(.+)/.exec(selector);
        if (pseudoSelector) {
            var tag = pseudoSelector[1] || '*';
            var pseudoPieces = pseudoSelector[2].split('(');
            var pseudoMatcher = pseudoMatchers[pseudoPieces[0]];
            if (pseudoMatcher) {
                return pseudoMatcher(tag, context, pseudoPieces);
            }
        }
    }

    // HANDLE: all other selectors
    return arrSlice.call(context.querySelectorAll(selector));
}

// normalise browser nonsense
var getMatches = elemProto.matches ||
    elemProto.webkitMatchesSelector ||
    elemProto.mozMatchesSelector ||
    elemProto.msMatchesSelector ||
    elemProto.oMatchesSelector ||
    fallbackMatches;

function fallbackMatches (sel) {
    var allMatches = getNodesBySelectorString(sel);
    return arrProto.indexOf.call(allMatches, this) !== -1;
}

// returns true if the node matches the provided selector
// where node is a single node
// i is index of node within the calee's collection
// selector is string, dollar selection, node, or function
function nodeMatchesSelector (node, selector, i) {
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
            return !!selector.call(node, node, i);

        // array of elements or dollar collection
        } else if (selector.length) {
            return selector.indexOf(node) !== -1;

        } else {
            return false;
        }
    }

    return getMatches.call(node, selector);
}

function filterNodes (nodes, selector) {
    var matches = [];

    for (var i = 0, len = nodes.length; i < len; i++) {
        if (nodeMatchesSelector(nodes[i], selector, i)) {
            matches.push(nodes[i]);
        }
    }

    return matches;
}

// convert a string into DOM elements
function htmlStringToNode (htmlString) {
    // thank you jQuery for the awesome regExp
    var singleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/).exec(htmlString);

    // HANDLE: '<div></div>', etc.
    if (singleTag) {
        return docConstruct.createElement(singleTag[1]);

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

    // dom elements are nodeType 1, the document is nodeType 9
    if (context.nodeType === 1 || context.nodeType === 9) {
        return [context];
    }

    if (Array.isArray(context)) {
        return context;
    }

    return [docElement]; // default to the docElement, nodeType 1
}


var DATA_ATTR_NAME = 'dollar-node-id';
var DATA_NEXT_ID = 1;
var DATA_CACHE_PUBLIC = {};
var DATA_CACHE_PRIVATE = {};

function nodeSupportsAttrProp (node) {
    // don't get/set attributes or properties on text, comment and attribute nodes
    var nType = node && node.nodeType;
    return nType && nType !== 3 && nType !== 8 && nType !== 2;
}

function getSafeNodeForAttributeManipulation (elem) {
    if (elem.nodeType === 9) {
        elem = elem.documentElement;
    }
    return nodeSupportsAttrProp(elem) ? elem : undef;
}

function getAttributeSafely (elem, attr) {
    if (!elem) {
        return;
    }

    if (elem === elem.window) { // handle window
        return elem[attr];
    }

    elem = getSafeNodeForAttributeManipulation(elem);
    return elem && elem.hasAttribute(attr) ? elem.getAttribute(attr) : undef;
}

function setAttributeSafely (elem, attr, value) {
    if (elem === elem.window) { // handle window
        elem[attr] = value;
    }

    elem = getSafeNodeForAttributeManipulation(elem);
    return elem && elem.setAttribute(attr, value);
}

function removeAttributeSafely (elem, attr) {
    if (elem === elem.window) { // handle window
        elem[attr] = undef;
    }

    elem = getSafeNodeForAttributeManipulation(elem);
    return elem && elem.removeAttribute(attr);
}

function getInternalElementId (elem) {
    return Number(getAttributeSafely(elem, DATA_ATTR_NAME)) || undef;
}

function setInternalElementId (elem, dollarNodeId) {
    return setAttributeSafely(elem, DATA_ATTR_NAME, dollarNodeId);
}

function getElementData (cache, elem, key) {
    var id = getInternalElementId(elem);

    if (id) {
        if (!key) {
            return cache[id];
        }

        return cache[id] && cache[id][key];
    }
}

function setElementData (cache, elem, key, value) {
    var id = getInternalElementId(elem);

    if (!id) {
        id = DATA_NEXT_ID;
        setInternalElementId(elem, id);
        DATA_NEXT_ID++;
    }

    if (!cache[id]) {
        cache[id] = {};
    }

    cache[id][key] = value;
}

function pushElementData (cache, elem, key, value) {
    var valArr = getElementData(cache, elem, key) || [];
    valArr.push(value);
    setElementData(cache, elem, key, valArr);
}

/*
 * Helper Utilities
 * @module $.utils
 */

$.utils = utils = (function () {

    var objPrefix = '[object ';

    function isElement (thing) {
        // reject all but dom nodes & the document
        return !!thing && (thing.nodeType === 1 || thing.nodeType === 9);
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
            if (val !== undef) {
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

    var format = {

        camelToDash: function (str) {
            return str.replace(/([A-Z])/g, '-$1').toLowerCase();
        },

        dashToCamel: function (str) {
            return str.replace(/-(.)/g, function (all, s) {
                return s.charAt(0).toUpperCase();
            });
        }

    };



    return {

        isElement: isElement,
        isObject: isObject,

        each: each,
        extend: extend,
        merge: merge,

        format: format

    };

})();

/**
 * Find the closest ancestor that matches a given selector
 * For each selected element, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree
 * @module core
 * @param {Selector} selector A selector expression to match elements against
 * @option {Context} context The context to use while searching for matches
 * @returns DollarJS (new set)
 * @example $('p').closest('.outer')
 */

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

/**
 * Iterate over each matched element
 * Aliased as <b>.forEach()</b> for convenience
 * @module core
 * @param {Function} iteratee A function to be invoked once for each element. (element, index, collection) are passed as arguments. Within the iteratee, `this` refers to the current element.
 * @returns DollarJS (chainable)
 * @example $('p').each(function (elem) { console.log(elem); })
 * @example $('p').each(function () { console.log(this); })
 */

$.fn.each = $.fn.forEach = function (iteratee) {
    utils.each(this, iteratee);
    return this;
};

/**
 * Reduce the matched set to the one element at a specific index
 * @module core
 * @param {Integer} index Indicates the position of the element to keep. Negative values count backwards from the end of the set.
 * @returns DollarJS (reduced set)
 * @example $('p').eq(3)
 * @example $('p').eq(-1)
 */

$.fn.eq = function (index) {
    index = Array.isArray(index) ? NaN : parseInt(index, 10); // prevent parsing array of numbers

    return index >= 0 ?
        $(this[index]) :
        $(this[this.length + index]); // have to + a -index in order to subtract
};

/**
 * Reduce the matched set to the ones that match an additional selector
 * @module core
 * @param {Selector} selector A selector expression to match elements against
 * @returns DollarJS (reduced set)
 * @example $('p').filter('.foo')
 */

$.fn.filter = function (selector) {
    if (!this.length || !selector) {
        return $();
    }

    return collect(filterNodes(this, selector));
};

/**
 * Get the descendants of each element in the matched set that match a given selector
 * @module core
 * @param {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').find('span')
 */

$.fn.find = function (selector) {
    if (!selector || !this.length) {
        return $();
    }

    return collect(getNodesBySelector(selector, this));
};

/**
 * Return the actual element at a given index
 * If <b>index</b> is passed, return the one element at the specified index
 * If <b>index</b> is NOT passed, return a true Array of the selected elements
 * @module core
 * @option {Integer} index Indicates the position of the element to return. Negative values count backwards from the end of the set.
 * @returns Element or Array of Elements
 * @example $('p').get(3)
 * @example $('p').get(-1)
 * @example $('p').get()
 */

$.fn.get = function (index) {
    if (index === undef) {
        // Return all the elements in a clean array
        return arrSlice.call(this, 0);

    } else {
        // Return just the one element from the set
        return index < 0 ? this[index + this.length] : this[index];
    }
};

/**
 * Reverse the set of matched elements
 * @module core
 * @returns DollarJS (chainable)
 * @example $('p').reverse()
 */

$.fn.reverse = arrProto.reverse;


/***************/
/*   ANIMATE   */
/***************/

/**
 * Animate styles using CSS transitions
 * @module animate
 * @param {Object} props CSS properties and values to transition into
 * @option {Object|Number} options Object with transition options (duration, easing, delay) / transition delay as an integer
 * @option {Function} complete Callback to be executed after animation is complete
 * @returns DollarJS (chainable)
 */

$.fn.animate = function (props, options, complete) {
    if (!utils.isObject(options)) {
        options = {
            duration: options
        };
    }

    var endEvent = 'transitionend';
    this.each(function (elem, index) {
        utils.each(props, function (val, prop) {
            elem.style.transition = addTransition(elem, prop, options);
            elem.style[prop] = val;
            var afterAnimate = function (propName) {
                elem.removeEventListener(endEvent, afterAnimate, true);
                elem.style.transition = removeTransition(elem, propName);
                if (typeof complete === fnType) {
                    complete.call(elem, elem, index);
                }
            };
            elem.addEventListener(endEvent, afterAnimate, true);
        });
    });

    return this;
};

function addTransition (elem, prop, options) {
    var newStr = prop + ' ' + transitionOptionsAsString(options);
    var trans = elem.style.transition ? elem.style.transition.split(/,\s?/) : [];
    var existing = false;

    trans.forEach(function (t, i) {
        if (t.indexOf(prop + ' ') === 0) {
            trans[i] = newStr;
            existing = true;
        }
    });

    if (!existing) {
        trans.push(newStr);
    }

    return trans.join(', ');
}

function removeTransition (elem, prop) {
    var trans = elem.style.transition.split(/,\s?/);
    var without = [];

    trans.forEach(function (t) {
        if (t.indexOf(prop + ' ') !== 0) {
            without.push(t);
        }
    });

    return without.join(', ');
}

function transitionOptionsAsString (options) {
    var optsArr = [];

    optsArr.push(typeof options.duration === strType ? options.duration : ((parseInt(options.duration) || 400) + 'ms'));
    optsArr.push(options.easing || 'ease');
    optsArr.push(typeof options.delay === strType ? options.delay : ((parseInt(options.delay) || 0) + 'ms'));

    return optsArr.join(' ');
}

/**
 * Slowly fade the matched elements into view
 * @module animate
 * @option {Number} duration Length of the transition
 * @option {Function} complete Callback to be executed after animation is complete
 * @returns DollarJS (chainable)
 */

$.fn.fadeIn = function (duration, complete) {
    return this.animate({ opacity: 1 }, duration, complete);
};

/**
 * Hide the matched elements by slowly fading away
 * @module animate
 * @option {Number} duration Length of the transition
 * @option {Function} complete Callback to be executed after animation is complete
 * @returns DollarJS (chainable)
 */

$.fn.fadeOut = function (duration, complete) {
    return this.animate({ opacity: 0 }, duration, complete);
};


/****************/
/*    FILTER    */
/****************/

/**
 * Add elements that match a new selector to the current set
 * @module filter
 * @param {Selector} selector A selector expression to match elements against
 * @option {Context} context The context to use while searching for matches
 * @returns DollarJS (expanded set)
 * @example $('p').add('span')
 */

$.fn.add = function (selector, context) {
    if (!selector) {
        return this;
    }

    return collect(this, $(selector, context));
};

/**
 * Merge an Array of Elements into the current set
 * @module filter
 * @param {Array} elements An Array of Elemenets to be merged into the current set
 * @option {Array} additionalElements... Additional Arrays to be merged one after another
 * @returns DollarJS (expanded set)
 * @example $('p').concat([elem1, elem2], [elem3])
 */

$.fn.concat = function () {
    var args = arrSlice.call(arguments);
    args.unshift(this);
    return collect.apply(this, args);
};

/**
 * Reduce the set of matched elements to those that have a descendant that matches a new selector
 * @module filter
 * @param {Selector} selector A selector expression to match elements against
 * @returns DollarJS (reduced set)
 * @example $('p').has('span')
 */

$.fn.has = function (selector) {
    if (!selector) {
        return $();
    }

    return this.filter(function () {
        return !!getNodesBySelector(selector, this).length;
    });
};

/**
 * Is the current set of elements a match to a new selector?
 * Returns true if at least one of the elements in the current set matches the new selector. Returns false if otherwise.
 * @module filter
 * @param {Selector} selector A selector expression to match elements against
 * @returns true or false
 * @example $('p').is('.foo')
 */

$.fn.is = function (selector) {
    return !!(selector && this.filter(selector).length);
};

/**
 * Create a new set by calling a function on every element in the current set
 * @module filter
 * @param {Function} iteratee A function that returns an Element for the new set when passed (currentElement, index, collection)
 * @returns DollarJS (new set)
 * @example $('p').map(function(elem){ return elem.parentNode; })
 */

$.fn.map = function (iteratee) {
    if (typeof iteratee !== fnType) {
        return this;
    }

    var newSet = [];
    var newElem;

    for (var i = 0, len = this.length; i < len; i++) {
        newElem = iteratee.call(this[i], this[i], i, this);
        if (utils.isElement(newElem)) {
            newSet.push(newElem);
        } else {
            throw new Error('.map fn should return an Element, not ' + typeof newElem);
        }
    }

    return collect.call(this, newSet);
};

/**
 * Remove elements from the current set that match a new selector
 * @module filter
 * @param {Selector} selector A selector expression to match elements against
 * @returns DollarJS (reduced set)
 * @example $('p').not('.foo')
 */

$.fn.not = function (selector) {
    if (!selector) {
        return this;
    }

    var criteria;

    if (typeof selector === fnType) {
        criteria = function (node, i) {
            return !selector.call(node, i, node);
        };

    } else {
        criteria = function (node, i) {
            return !nodeMatchesSelector(node, selector, i);
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
        frag = docConstruct.createDocumentFragment();

        for (i = 0; i < colLen; i++) {
            content = contentsArr[i];

            if (content) {
                // content is String
                if (typeof content === strType) {
                    if(generatedNode = htmlStringToNode(content)) {
                        nodeToFrag(generatedNode);
                    }

                // content is Element
                } else if (content.nodeType === 1 || content.nodeType === 11) {
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

/**
 * Insert content after each element in the current set
 * @module mutate
 * @param {Content} content Content to be inserted. Existing nodes will be moved instead of duplicated.
 * @option {Content} content Additional args are handled the same as the first, each in turn
 * @returns DollarJS (chainable)
 * @example $('p').after('&lt;div class="new-stuff"&gt;')
 */

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

/**
 * Insert content into each element in the current set (at the bottom)
 * @module mutate
 * @param {Content} content Content to be inserted. Existing nodes will be moved instead of duplicated.
 * @option {Content} content Additional args are handled the same as the first, each in turn
 * @returns DollarJS (chainable)
 * @example $('p').append('&lt;div class="new-stuff"&gt;')
 */

$.fn.append = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        elem.appendChild(content);
    });
};

/**
 * Insert content before each element in the current set
 * @module mutate
 * @param {Content} content Content to be inserted. Existing nodes will be moved instead of duplicated.
 * @option {Content} content Additional args are handled the same as the first, each in turn
 * @returns DollarJS (chainable)
 * @example $('p').before('&lt;div class="new-stuff"&gt;')
 */

$.fn.before = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.parentNode) {
            elem.parentNode.insertBefore(content, elem);
        }
    });
};

/**
 * Clone each element in the current set
 * Uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode" target="_blank">cloneNode</a> with deep=true
 * @module mutate
 * @returns DollarJS (cloned set)
 * @example $('p').clone()
 */

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

/**
 * Empty the contents of each element in the current set
 * @module mutate
 * @returns DollarJS (chainable)
 * @example $('p').empty()
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

/**
 * Get or set the HTML contents of the current set
 * If <b>htmlString</b> is provided, this will set the contents of each element and return the current set for chaining
 * If no argument is passed, this will return the contents of the first element in the current set
 * @module mutate
 * @option {HTMLString} htmlString A string of HTML markup to be created and inserted
 * @returns HTMLString or DollarJS (chainable)
 * @example $('p').html()
 * @example $('p').html('&lt;div&gt;')
 */

$.fn.html = function (htmlString) {
    var elem, i, len = this.length,
        first = this[0];

    if (htmlString === undef) {
        if (first && first.nodeType === 1) {
            return first.innerHTML;
        }

        return undef;
    }

    try {
        for (i = 0; i < len; i++) {
            elem = this[i];
            if (elem.nodeType === 1) {
                elem.innerHTML = htmlString;
            }
        }

    } catch (e) {
        this.empty().append(htmlString);
    }

    return this;
};

/**
 * Insert content into each element in the current set (at the top)
 * @module mutate
 * @param {Content} content Content to be inserted. Existing nodes will be moved instead of duplicated.
 * @option {Content} content Additional args are handled the same as the first, each in turn
 * @returns DollarJS (chainable)
 * @example $('p').prepend('&lt;div class="new-stuff"&gt;')
 */

$.fn.prepend = function () {
    return domInsert.call(this, arguments, function (elem, content) {
        if (elem.firstChild) {
            elem.insertBefore(content, elem.firstChild);
        } else {
            elem.appendChild(content);
        }
    });
};

/**
 * Remove each element in the current set from the document
 * If a selector is provided, only remove elements that match the new selector
 * @module mutate
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (chainable)
 * @example $('p').remove('.foo')
 */

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
            if (nodeMatchesSelector(target, selector, i) && target.parentNode) {
                target.parentNode.removeChild(target);
            }
        }
    }

    return this;
};


/*******************/
/*    READWRITE    */
/*******************/

/**
 * Get or set attributes on the current set
 * If <b>value</b> is provided, this will set the attribute on each element and return the current set for chaining
 * If <b>value</b> is not passed, this will return the value of the attribute for the first element in the current set
 * There is a difference between <a href="http://lucybain.com/blog/2014/attribute-vs-property/" target="_blank">attr vs prop</a>
 * @module readwrite
 * @param {String} name The name of the attribute
 * @option {Any} value A value to be set. Most values will be converted to a String before setting. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Value or DollarJS (chainable)
 * @example $('img').attr('title')
 * @example $('img').attr('title', 'Click Me')
 * @example $('img').attr('title', function(previousValue, index){ return 'Click Me'; })
 */

$.fn.attr = function (name, value) {

    if (value === undef) {
        return getAttributeSafely(this[0], name);
    }

    this.each(function (elem, i) {
        if (nodeSupportsAttrProp(elem)) {
            if (typeof value === fnType) {
                value = value(getAttributeSafely(elem, name), i);
            }

            elem.setAttribute(name, value);
        }
    });

    return this;
};

/**
 * Store or read arbitrary data associated with the matched elements
 * If <b>key</b> and <b>value</b> are provided, this will set data for each element and return the current set for chaining
 * If only <b>key {Object}</b> is provided, this will set data for each element (as key/value pairs) and return the current set for chaining
 * If only <b>key {String}</b> is provided, this will return the data stored under the given key for the first element in the current set
 * If no arguments are passed, this will return all of the data stored for the first element in the current set
 * Note: setting data through dollar does NOT create corresponding data-attributes on the element
 * @module readwrite
 * @option {Object|String} key An Object of key/value pairs to store, or the String key from which to store/read a value
 * @option {Any} value A value to be set. Most values will be converted to a String before setting. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Data or DollarJS (chainable)
 * @example $('p').data('foo', 'bar')
 * @example $('p').data({ foo: 'bar' })
 * @example $('p').data('foo', function(previousValue, index){ return 'foo'; })
 * @example $('p').data('foo')
 * @example $('p').data()
 */

$.fn.data = function (key, value) {
    if (!this.length) {
        return undef;
    }

    var elem, map = {};

    // get all data
    if (!key) {
        return utils.extend({}, getDataFromDOM(this[0]), getElementData(DATA_CACHE_PUBLIC, this[0]));
    }

    if (typeof key === strType) {

        // get one value
        if (value === undef) {
            var retrievedData = getElementData(DATA_CACHE_PUBLIC, this[0], key);
            return retrievedData === undef ? getDataFromDOM(this[0])[key] : retrievedData;
        }

        // set map with one value
        map[key] = value;

    } else if (utils.isObject(key)) {
        // set using provided object as map
        map = key;
    }

    function setDataByMap (v, k) {
        setElementData(DATA_CACHE_PUBLIC, elem, k, v);
    }

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        utils.each(map, setDataByMap);
    }

    return this;
};

function getDataFromDOM (elem) {
    // Polyfill for IE<11 and Opera Mini
    return elem && elem.dataset || (function () {
        var data = {};
        var allAttr = elem.attributes;
        var isDataAttr = /^data-[a-z_\-\d]*$/i;
        var name;

        for (var n in allAttr) {
            if (allAttr.hasOwnProperty(n)) {
                name = allAttr[n].name;
                if (isDataAttr.test(name)) {
                    name = utils.format.dashToCamel(name.substr(5));
                    data[name] = allAttr[n].value;
                }
            }
        }

        return data;
    })();
}

/**
 * Get or set properties on the current set
 * If <b>value</b> is provided, this will set the property on each element and return the current set for chaining
 * If <b>value</b> is not passed, this will return the value of the property for the first element in the current set
 * There is a difference between <a href="http://lucybain.com/blog/2014/attribute-vs-property/" target="_blank">attr vs prop</a>
 * @module readwrite
 * @param {String} name The name of the property
 * @option {Any} value A value to be set. Most values will be converted to a String before setting. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Value or DollarJS (chainable)
 * @example $('input').prop('checked')
 * @example $('input').prop('checked', true)
 * @example $('input').prop('checked', function(previousValue, index){ return true; })
 */

$.fn.prop = function (name, value) {

    if (value === undef) {
        return getPropertyFromElem(this[0], name);
    }

    this.each(function (elem, i) {
        if (nodeSupportsAttrProp(elem)) {
            if (typeof value === fnType) {
                value = value(getPropertyFromElem(elem, name), i);
            }

            elem[name] = value;
        }
    });

    return this;
};

function getPropertyFromElem (elem, name) {
    return nodeSupportsAttrProp(elem) ? elem[name] : undef;
}

/**
 * Remove an attribute from each element in the current set
 * @module readwrite
 * @param {String} name The name of the attribute
 * @returns DollarJS (chainable)
 * @example $('img').removeAttr('title')
 */

$.fn.removeAttr = function (name) {
    this.each(function () {
        this.removeAttribute(name);
    });

    return this;
};

/**
 * Unset data from each element in the current set
 * If <b>key</b> is not passed, ALL data will be removed
 * @module readwrite
 * @option {String} key A key under which specific data was stored
 * @returns DollarJS (chainable)
 * @example $('p').removeData('foo')
 * @example $('p').removeData()
 */

$.fn.removeData = function (key) {
    var elem, id;

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        id = getInternalElementId(elem);

        if (key) {
            // clean dollar data
            if (id) {
                delete DATA_CACHE_PUBLIC[id][key];
            }

            // clean DOM data
            if (elem) {
                if (elem.dataset) {
                    if (elem.dataset[key]) {
                        delete elem.dataset[key];
                    }

                } else {
                    removeAttributeSafely(elem, 'data-' + utils.format.camelToDash(key));
                }
            }

        } else {
            DATA_CACHE_PUBLIC[id] = {};
        }
    }

    return this;
};

/**
 * Remove a property from each element in the current set
 * @module readwrite
 * @param {String} name The name of the property
 * @returns DollarJS (chainable)
 * @example $('img').removeProp('title')
 */

$.fn.removeProp = function (name) {
    this.each(function () {
        if (nodeSupportsAttrProp(this)) {
            delete this[name];
        }
    });

    return this;
};

/**
 * Get or set text contents on the current set
 * If <b>value</b> is provided, this will set the text contents for each element and return the current set for chaining
 * If no arguments are passed, this will return the text contents of the first element in the current set
 * @module readwrite
 * @option {Any} value A value to be set. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Text or DollarJS (chainable)
 * @example $('p').text()
 * @example $('p').text('foo')
 * @example $('p').text(function(previousValue, index){ return 'foo'; })
 */

$.fn.text = function (value) {
    if (value !== undef) {
        this.each(function (elem, i) {
            if (elem.nodeType === 1 || elem.nodeType === 11 || elem.nodeType === 9) {
                if (typeof value === fnType) {
                    elem.textContent = value(elem.textContent, i);
                } else {
                    elem.textContent = value;
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

/**
 * Get or set a value on the current set
 * If <b>value</b> is provided, this will set the value for each element and return the current set for chaining
 * If no arguments are passed, this will return the value of the first element in the current set
 * @module readwrite
 * @option {Any} value A value to be set. Functions will be evaluted with (previousValue, index) and the return value will be set.
 * @returns Value or DollarJS (chainable)
 * @example $('p').val()
 * @example $('p').val('foo')
 * @example $('p').val(function(previousValue, index){ return 'foo'; })
 */

$.fn.val = function (value) {
    if (value === undef) {
        return this[0] ? this[0].value : undef;
    }

    for (var i = 0; i < this.length; i++) {
        if (this[i].nodeType !== 1) {
            break;
        }

        if (typeof value === fnType) {
            value = value.call(this[i], this[i].value, i);
        }

        this[i].value = value;
    }

    return this;
};


/***************/
/*    STYLE    */
/***************/


// get styles across various browsers
var getStyle = win.getComputedStyle !== undef ? getStyleModern : getStyleCompat;

function getStyleModern (elem, prop) {

    if (!elem || typeof prop !== strType) {
        return '';
    }

    // apparently, IE <= 11 will throw for elements in popups
    // and FF <= 30 will throw for elements in an iframe
    if (elem.ownerDocument.defaultView.opener) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null)[prop] || '';
    }

    return win.getComputedStyle(elem, null)[prop] || elem.style[prop] || '';
}

function getStyleCompat (elem, rawProp) {
    var prop;

    rawProp = typeof rawProp === strType ? rawProp : '';
    if (!elem) {
        return '';
    }

    if (rawProp === 'float') {
        prop = 'styleFloat';

    } else {
        prop = utils.format.dashToCamel(rawProp.replace(/^-ms-/, 'ms-'));
    }

    return elem.currentStyle[prop];
}

function getNonHiddenDisplayValue (elem) {
    var disp = elem.style.display;

    if (!disp || disp === 'none') {
        disp = getElementData(DATA_CACHE_PRIVATE, elem, 'nonHiddenDisplayValue') || '';
    }

    if (!disp && elem.parentNode) {
        var tmp = docConstruct.createElement(elem.nodeName);
        elem.parentNode.appendChild(tmp);
        disp = getStyle(tmp, 'display');
        elem.parentNode.removeChild(tmp);
        setElementData(DATA_CACHE_PRIVATE, elem, 'nonHiddenDisplayValue', disp);
    }

    return disp;
}

function getDocumentHeight () {
    return Math.max(docElement.offsetHeight, docElement.scrollHeight);
}

function getDocumentWidth () {
    return Math.max(docElement.offsetWidth, docElement.scrollWidth);
}

function getViewportHeight () {
    return Math.max(docElement.clientHeight, win.innerHeight);
}

function getViewportWidth () {
    return Math.max(docElement.clientWidth, win.innerWidth);
}

/**
 * Add classes to each element in the current set
 * @module style
 * @param {String} names A space-separated list of classes to be added
 * @returns DollarJS (chainable)
 * @example $('p').addClass('one two three')
 */

$.fn.addClass = function (names) {
    if (!names) {
        return this;
    }

    var newClasses, oldClasses;
    var i, len = this.length;

    if (typeof names === strType) {
        newClasses = names.trim().split(' ');

        for (i = 0; i < len; i++) {
            oldClasses = this[i].className.trim().replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }

    } else if (typeof names === fnType) {
        for (i = 0; i < len; i++) {
            newClasses = names.call(this[i], this[i].className, i).split(' ');
            oldClasses = this[i].className.trim().replace(regExpSpacesAndBreaks, ' ').split(' ');
            this[i].className = utils.merge([], oldClasses, newClasses).join(' ');
        }
    }

    return this;
};

/**
 * Get or set the style of each element in the current set
 * If <b>property</b> is a String and <b>value</b> is NOT passed, this will return the current value for that style property on the first element in the set
 * If <b>property</b> is a String and <b>value</b> is provided, this will set the value for that style property on all elements in the set
 * If <b>property</b> is an Object, styles will be set for each key:value pair on all elements in the set
 * @module style
 * @param {String|Object} property The String name of a css property, or an Object with key:value pairs
 * @option {String} value The value to be set. Numerical values should include units.
 * @returns Current style value or DollarJS (chainable)
 * @example $('p').css('color')
 * @example $('p').css('color', '#336699')
 * @example $('p').css({ color: '#336699', fontSize: '14px' })
 */

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
        elem.style[k] = typeof v === fnType ? v.call(elem, getStyle(elem, k), i) : v;
    }

    for (i = 0; i < len; i++) {
        elem = this[i];
        utils.each(map, setPropertyByMap);
    }

    return this;
};

/**
 * Do any of the matched elements have the given class name?
 * @module style
 * @param {String} className A single class name to look for
 * @returns True or False
 * @example $('p').hasClass('foo')
 */

$.fn.hasClass = function (className) {
    if (!className) {
        return false;
    }

    // sandwich className with one space to avoid partial matches
    className = ' ' + className.trim() + ' ';

    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(regExpSpacesAndBreaks, ' ').indexOf(className) !== -1) {
            return true;
        }
    }

    return false;
};

/**
 * Get the current height of the first element in the set
 * This method does not set values. Use .css() instead.
 * @module style
 * @returns Height
 * @example $('div').height()
 */

$.fn.height = function () {
    var firstEl = this[0];
    if (firstEl === window) {
        return getViewportHeight();
    }
    if (firstEl === document) {
        return getDocumentHeight();
    }
    return parseFloat(this.eq(0).css('height')) || 0;
};

/**
 * Hide each element in the current set
 * This method does not support animation. Use .fadeOut() instead.
 * @module style
 * @returns DollarJS (chainable)
 * @example $('p').hide()
 */

$.fn.hide = function () {
    this.each(function () {
        this.style.display = 'none';
    });

    return this;
};

/**
 * Remove classes from each element in the current set
 * @module style
 * @param {String} names A space-separated list of classes to be removed
 * @returns DollarJS (chainable)
 * @example $('p').removeClass('one two three')
 */

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
                doomedClasses = names.call(elem, elem.className, i);
            } else {
                doomedClasses = names;
            }

            if (doomedClasses.length) {
                doomedClasses = typeof doomedClasses === strType ? doomedClasses.trim().split(' ') : doomedClasses;
                oldClasses = elem.className.replace(regExpSpacesAndBreaks, ' ').split(' ');
                utils.each(oldClasses, removeDoomed);
                elem.className = newClasses.join(' ');
            }
        }
    }

    return this;
};

/**
 * Display each element in the current set
 * This method does not support animation. Use .fadeIn() instead.
 * @module style
 * @returns DollarJS (chainable)
 * @example $('p').show()
 */

$.fn.show = function () {
    this.each(function () {
        this.style.display = getNonHiddenDisplayValue(this);
        this.style.visibility = 'visible';
        this.style.opacity = 1;
    });

    return this;
};

/**
 * Get the current width of the first element in the set
 * This method does not set values. Use .css() instead.
 * @module style
 * @returns Width
 * @example $('div').width()
 */

$.fn.width = function () {
    var firstEl = this[0];
    if (firstEl === window) {
        return getViewportWidth();
    }
    if (firstEl === document) {
        return getDocumentWidth();
    }
    return parseFloat(this.eq(0).css('width')) || 0;
};


/******************/
/*    TRAVERSE    */
/******************/

/**
 * Get the children of each element in the current set
 * The results will only include direct children and will not traverse any deeper descendants
 * If <b>selector</b> is provided, the results will only include children that match the selector
 * @module traverse
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').children()
 * @example $('p').children('.foo')
 */

$.fn.children = function (selector) {
    var childNodes = [];

    for (var i = 0, len = this.length; i < len; i++) {
        utils.merge(childNodes, this[i].children);
    }

    return collect(selector ? $.fn.filter.call(childNodes, selector) : childNodes);
};

/**
 * Reduce the set of matched elements to the first in the set
 * This is equivalent to .eq(0)
 * @module traverse
 * @returns DollarJS (reduced set)
 * @example $('p').first()
 */

$.fn.first = function () {
    return this.eq(0);
};

/**
 * Reduce the set of matched elements to the last in the set
 * This is equivalent to .eq(-1)
 * @module traverse
 * @returns DollarJS (reduced set)
 * @example $('p').last()
 */

$.fn.last = function () {
    return this.eq(-1);
};

/**
 * Get the next sibling of each element in the current set
 * If <b>selector</b> is provided, the results will only include siblings that match the selector
 * @module traverse
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').next()
 * @example $('p').next('.foo')
 */

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

/**
 * Get the parents of each element in the current set
 * The results will only include direct parents and will not traverse any higher ancestors
 * If <b>selector</b> is provided, the results will only include parents that match the selector
 * @module traverse
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').parent()
 * @example $('p').parent('.foo')
 */

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

/**
 * Get the previous sibling of each element in the current set
 * If <b>selector</b> is provided, the results will only include siblings that match the selector
 * @module traverse
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').prev()
 * @example $('p').prev('.foo')
 */

$.fn.prev = function (selector) {
    var previousNodes = [],
        prevNode;

    for (var i = 0, len = this.length; i < len; i++) {
        prevNode = this[i].previousElementSibling;
        if (prevNode) {
            previousNodes.push(prevNode);
        }
    }

    return collect(selector ? $.fn.filter.call(previousNodes, selector) : previousNodes);
};

/**
 * Get the siblings of each element in the current set
 * If <b>selector</b> is provided, the results will only include siblings that match the selector
 * @module traverse
 * @option {Selector} selector A selector expression to match elements against
 * @returns DollarJS (new set)
 * @example $('p').siblings()
 * @example $('p').siblings('.foo')
 */

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


var activeEventListenersKey = 'activeEventListeners';
var errorHandlers = [];

$.onEventError = function (errorHandler) {
    errorHandlers.push(errorHandler);
};

function bindEventHandlers (events, handler) {
    if (typeof events !== strType || typeof handler !== fnType) {
        return this;
    }

    function wrappedHandler () {
        if (errorHandlers.length) {
            try {
                handler.apply(this, arrSlice.call(arguments));
            } catch (err) {
                utils.each(errorHandlers, function (errorHandler) {
                    if (typeof errorHandler === fnType) {
                        errorHandler(err);
                    }
                });
            }
        } else {
            handler.apply(this, arrSlice.call(arguments));
        }
    }

    handler.wrappedHandler = wrappedHandler;

    events = events.split(' ');

    var addEventListenerCompat, i, evLen;
    this.each(function () {
        addEventListenerCompat = this.addEventListener || this.attachEvent;
        for (i = 0, evLen = events.length; i < evLen; i++) {
            addEventListenerCompat.call(this, events[i], wrappedHandler, false);
            pushElementData(DATA_CACHE_PRIVATE, this, activeEventListenersKey, handler);
        }
    });

    return this;
}

function unbindEventHandlers (events, handler) {
    if (typeof events !== strType) {
        return this;
    }

    events = events.split(' ');

    var i, evLen, handlers, j, hdlrLen, removeEventListenerCompat;
    this.each(function () {
        removeEventListenerCompat = this.removeEventListener || this.detachEvent;
        for (i = 0, evLen = events.length; i < evLen; i++) {
            handlers = typeof handler === fnType ? [handler] : getElementData(DATA_CACHE_PRIVATE, this, activeEventListenersKey) || [];
            for (j = 0, hdlrLen = handlers.length; j < hdlrLen; j++) {
                removeEventListenerCompat.call(this, events[i], handlers[j].wrappedHandler, false);
            }
        }
    });

    return this;
}

function triggerEventsOnElements (elems, events, args) {
    var ev;
    var eventInit = {
        bubbles: true,
        cancelable: true
    };

    if (args && args.length) {
        eventInit.detail = args;
    }

    utils.each(events, function (eventName) {
        utils.each(elems, function (elem) {
            if (eventName === 'click') {
                elem.click();

            } else if (eventName === 'focus') {
                elem.focus();

            } else if (eventName === 'blur') {
                elem.blur();

            } else {
                ev = new win.CustomEvent(eventName, eventInit);
                elem.dispatchEvent(ev);
            }
        });
    });
}

function bindOrTriggerConvenience (events, handler) {
    // bind handler to event
    if (typeof handler === fnType) {
        return bindEventHandlers.call(this, events, handler);

    // trigger event
    } else {
        triggerEventsOnElements(this, events.split(' '));
        return this;
    }
}

/**
 * Handle a "click" event on any element in the current set
 * Equivalent to .on('click', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is clicked
 * @returns DollarJS (chainable)
 * @example $('div').click(function(event){ console.log(this); })
 */

$.fn.click = function (handler) {
    return bindOrTriggerConvenience.call(this, 'click', handler);
};

/**
 * Handle a "focus" event on any element in the current set
 * Equivalent to .on('focus', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is focused
 * @returns DollarJS (chainable)
 * @example $('input').focus(function(event){ console.log(this); })
 */

$.fn.focus = function (handler) {
    return bindOrTriggerConvenience.call(this, 'focus', handler);
};

/**
 * Handle a "blur" event on any element in the current set
 * Equivalent to .on('blur', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is unfocused
 * @returns DollarJS (chainable)
 * @example $('input').blur(function(event){ console.log(this); })
 */

$.fn.blur = function (handler) {
    return bindOrTriggerConvenience.call(this, 'blur', handler);
};

/**
 * Handle a "change" event on any element in the current set
 * Equivalent to .on('change', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is changed
 * @returns DollarJS (chainable)
 * @example $('input').change(function(event){ console.log(this); })
 */

$.fn.change = function (handler) {
    return bindOrTriggerConvenience.call(this, 'change', handler);
};

/**
 * Handle a "resize" event on any element in the current set
 * Equivalent to .on('resize', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is resized
 * @returns DollarJS (chainable)
 * @example $(window).resize(function(event){ console.log(document.documentElement.clientWidth); })
 */

$.fn.resize = function (handler) {
    return bindOrTriggerConvenience.call(this, 'resize', handler);
};

/**
 * Unbind some event handler from each element in the current set
 * Aliased as <b>.unbind()</b> for compatibility
 * If no <b>handler</b> is provided, ALL handlers will be unbound from the specified events
 * @module trigger
 * @param {String} events A space-separated list of events to unbind
 * @option {Function} handler A specific function to unbind
 * @returns DollarJS (chainable)
 * @example $('p').off('click')
 * @example $('p').off('click', justOneHandler)
 */

$.fn.off = $.fn.unbind = unbindEventHandlers;

/**
 * Bind some event handler to each element in the current set
 * Aliased as <b>.bind()</b> for compatibility
 * @module trigger
 * @param {String} events A space-separated list of events to listen for
 * @param {Function} handler A function to execute when one of the events is triggered
 * @returns DollarJS (chainable)
 * @example $('p').on('click', function(event){ console.log(this); })
 * @example $('p').on('custom', function(event){ console.log(event.detail); })
 */

$.fn.on = $.fn.bind = bindEventHandlers;

/**
 * Trigger events on each element in the current set
 * Executes all handlers bound to each element in the current set corresponding to the given event names
 * @module trigger
 * @param {String} events A string-separated list of event names to be triggered
 * @option {Any} extraParameters... Additional parameters to pass along to the event handler
 * @returns DollarJS (chainable)
 * @example $('p').trigger('click')
 * @example $('p').trigger('click', 'extra', 'params')
 * @example $('p').trigger('one two three')
 */

$.fn.trigger = function (events) {
    if (typeof events !== strType) {
        return this;
    }

    events = events.split(' ');

    triggerEventsOnElements(this, events, arrSlice.call(arguments, 1));

    return this;
};


/******************/
/* IE9-11 SUPPORT */
/******************/

(function (w) {

    function CustomEventPolyfill (event, customInit) {
        customInit = customInit || {
            bubbles: false,
            cancelable: false
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, customInit.bubbles, customInit.cancelable, customInit.detail);
        return evt;
    }

    if (typeof w.CustomEvent !== fnType) {

        CustomEventPolyfill.prototype = w.Event.prototype;

        w.CustomEvent = CustomEventPolyfill;
    }

})(win);


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

    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = $;

    // AMD loader
    } else if (typeof win.define === fnType && win.define.amd) {
        win.define(function () {
            return $;
        });

    // Global window
    } else {
        win.$ = $;
    }

}.call(this));


}.call(this));

/* Internals for matching a collection of selected elements */

function findBySelector (selector, context) {
    // where selector is a string, dollar collection, or dom node
    // and context is array of dom nodes or single dom node

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
        if (!context.nodeType) {
            // if its an array of nodes (or a dollar collection), we'll need to search within each
            if (context.length > 1) {
                var i = 0,
                    len = context.length;

                for (; i < len; i++) {
                    arrPush.apply(results, findBySelector(selector, context[i]));
                }

                return results;
            } else {
                context = context[0];
            }
        // exit early if context is not a HTML node or the document
        } else if (context.nodeType !== 1 && context.nodeType !== 9) {
            return results;
        }
    } else {
        context = document.documentElement;
    }

    // ------------------------------------------
    // at this point, selector must be a string
    // and context must be a HTML node or the document
    // ------------------------------------------

    // thank you to Sizzle for the awesome RegExp
    var selectorsMap = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/.exec(selector);
    // selectorsMap will return:
    // if id => ['#foo', 'foo', undefined, undefined]
    // node  => ['body', undefined, body, undefined']
    // class => ['.bar', undefined, undefined, 'bar']
    // else  => null

    if (selectorsMap) {

        // HANDLE: $('#id')
        if (selector = selectorsMap[1]) {
            var result = document.getElementById(selector);
            if (result && context !== result && context.contains(result)) {
                results.push(result);
            }

        // HANDLE: $('tag')
        } else if (selector = selectorsMap[2]) {
            arrPush.apply(results, nodeListToArray(context.getElementsByTagName(selector)));

        // HANDLE: $('.class')
        } else if (selector = selectorsMap[3]) {
            arrPush.apply(results, nodeListToArray(polyfillGetClass(context, selector)));
        }

    // HANDLE: pseudo-selectors, chained classes, etc.
    } else {
        arrPush.apply(results, nodeListToArray(context.querySelectorAll(selector)));
    }

    return results;

    function nodeListToArray (nl) {
        // needed for browsers like PhantomJS that balk at this
        return arrSlice.call(nl, 0);
    }

    function polyfillGetClass (con, sel) {
        // ie8 polyfill
        // wtf IE, this is so hacky
        return con.getElementsByClassName ?
            con.getElementsByClassName(sel) :
            con.querySelectorAll('.' + sel);
    }
}

function matchesSelector (node, selector) {
    // where node is a single node
    // and selector is a string

    // get element
    node = node.isDollar ? node[0] : node;

    // take only DOM nodes,
    // reject doc.frags, text, document, etc.
    if (node.nodeType !== 1) {
        return false;
    }

    // stringify selector
    if (typeof selector !== strType) {
        if (selector.isDollar) {
            selector = selector.selector
        } else if (selector.nodeType) {
            return node === selector;
        }
    }

    // normalise browser nonsense
    var matches = node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector;

    // return matches.call(node, selector);

    // IE8 polyfill
    return matches ?
        matches.call(node, selector) :
        polyfillMatches(selector);

    function polyfillMatches (sel) {
        // var allMatches = document.querySelectorAll(sel);
        var allMatches = findBySelector(sel);
        return Array.prototype.indexOf.call(allMatches, node) !== -1;
    }
};

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

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

    // reject doc.frags, text, docConstruct, etc.
    if (node.nodeType !== 1) {
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

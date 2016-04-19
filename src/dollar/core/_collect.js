
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
    var results = [];

    if (context) {
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

        // HANDLE: $('tag')
        } else if (selector = selectorsMap[2]) {
            return arrSlice.call(context.getElementsByTagName(selector));

        // HANDLE: $('.class')
        } else if (selector = selectorsMap[3]) {
            // IE8 Polyfill
            // OMG... this still fails in quirksmode
            return arrSlice.call(context.getElementsByClassName ? context.getElementsByClassName(selector) : context.querySelectorAll('.' + selector));

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
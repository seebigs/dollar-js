
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
        var content = pseudoPieces[1] && pseudoPieces[1].replace(/[\"\'\)]/g, '');
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
    }

};

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

    // HANDLE: $(window)
    } else if (selector === selector.window) {
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
            return context.getElementsByClassName(selector);

        // HANDLE: $('<div> ... </div>')
        } else if (selector = selectorsMap[4]) {
            return [htmlStringToNode(selector)];
        }

    // HANDLE: special pseudo-selectors
    } else {
        var pseudoSelector = /(.*)\:(.+)/.exec(selector);
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

    if (context.nodeType === 1) {
        return [context];
    }

    if (Array.isArray(context)) {
        return context;
    }

    return [docElement];
}

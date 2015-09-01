var testArr = $('p');

function findBySelector (selector, context) {
    // where selector is a string
    // and context is array of dom nodes within which to search
    // or single dom node in which to search

    var results = [];

    if (selector.nodeType) {
        return selector === context ? results : [selector];
    }

    // get selector as string
    selector = selector.isDollar ? selector.selector : selector;

    // exit early for improper selectors
    if (!selector || typeof selector !== strType) {
        return results;
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

suite('playground', function () {

    benchmark('.each - fn call', function () {
        $('div').each( function (node) {
            return this;
        });
    });

    benchmark('.each - [idx]', function () {
        nodesListEach.call($('div'), function () {
            return this;
        });
    });

    benchmark('for loop', function () {
        var nodes = $('div'), i = 0, len = nodes.length;
        for (; i < len; i++) {
            nodes[i];
        }
    });
});
/*
 * Extend $ instances/selections
 * @module $
 */

$.fn.each = function (iteratee) {
    utils.each(this.get(), iteratee);
};

$.fn.on = $.fn.bind = function (types, handler) {

    if (!types || typeof handler !== fnType) {
        return this;
    }

    // normalize context to [element]
    // separate events
    var context = this.isDollar ? this.get() : this.length ? this : [this],
        events = types.split(' ');

    for (var i = 0, len = context.length; i < len; i++) {
        for (var j = 0, eventLen = events.length; j < eventLen; j++) {
            addEventListenerPolyfill(context[i], events[j], handler);
        }
    }

    return this;

    function addEventListenerPolyfill (context, event, callback) {
        if (Element.prototype.addEventListener) {
            context.addEventListener(event, callback, false);
        } else {
            // IE8 Polyfill
            if (event === 'DOMContentLoaded') {
                var ev = new Event();
                ev.srcElement = window;
                addEventPolyfillWrapper(ev);
            } else {
                context.attachEvent('on' + event, callback);
            }
        }

        function addEventPolyfillWrapper (e) {
            e.target = e.srcElement;
            e.currentTarget = context;
            if (callback.handleEvent) {
                callback.handleEvent(e);
            } else {
                // FIXIT: wat is var listener?
                // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
                console.log('what should happen here?');
                // listener.call(context, e);
            }
        }
    }
};

$.fn.off = $.fn.unbind = function (types, handler) {

    if (!types || typeof handler !== fnType) {
        return this;
    }

    // normalize context to [element]
    // separate events
    var context = this.isDollar ? this.get() : this.length ? this : [this],
        events = types.split(' ');

    for (var i = 0, len = context.length; i < len; i++) {
        for (var j = 0, eventLen = events.length; j < eventLen; j++) {
            removeEventListenerPolyfill(context[i], events[j], handler);
        }
    }

    return this;

    function removeEventListenerPolyfill(context, event, callback) {
        if (Element.prototype.removeEventListener) {
            context.removeEventListener(event, callback, false);
        } else {
            // The person who wrote this polyfill was on meth:
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener

            // TODO: write a human readable polyfill for IE8
            console.error('IE8 polyfill at: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener');
        }
    }
};

$.fn.find = function (selector) {

    if (!selector || !this.length) {
        return utils.merge($(), []);
    }

    var matches = [];

    if (this.length > 1) {
        var allMatches = $(selector);

        var i = 0,
            collectionLen = this.length;

        var j = 0,
            targetLen = allMatches.length;

        for (; i < collectionLen; i++) {
            for (; j < targetLen; j++) {
                if (this[i] !== allMatches[j] && this[i].contains(allMatches[j])) {
                    matches.push(allMatches[j]);
                }
            }
        }
    } else {
        if (utils.isDomNode(selector)) {
            if (this[0] !== selector && this[0].contains(selector)) {
                matches.push(selector);
            }
        } else {
            matches = $.fn.findBySelector.call(this, selector);
        }
    }

    return utils.merge($(), matches.length > 1 ? utils.unique(matches) : matches);
};

$.fn.closest = function (selector, context) {

    if (!selector) {
        return utils.merge($(), []);
    }

    var matches = [];
    // if is dollar or node, re-wrap the selector in the context
    var foundBySelector = (selector.isDollar || selector.nodeType) && $(selector, context);

    this.each(function (node) {
        while (node && node !== context) {

            var nodeMatchesSelector = foundBySelector ?
                Array.prototype.indexOf.call(foundBySelector, node) !== -1 :
                this.matchesSelector.call(node, selector, context);

            if (nodeMatchesSelector) {
                matches.push(node);
                break;
            }

            node = node.parentNode;
        }
    });

    for (var i = 0, len = this.length; i < len; i++) {
        var node = this[i];
        while (node && node !== context) {

            var nodeMatchesSelector = foundBySelector ?
                Array.prototype.indexOf.call(foundBySelector, node) !== -1 :
                this.matchesSelector.call(node, selector, context);

            if (nodeMatchesSelector) {
                matches.push(node);
                break;
            }

            node = node.parentNode;
        }
    }

    return utils.merge($(), utils.unique(matches));
};

$.fn.filter = function (criteria, collection) {

    collection = collection || this;

    if (!collection.length || !criteria) {
        return utils.merge($(), []);
    }

    var filterFn;

    // HANDLE: function
    if (utils.isFunction(criteria)) {

        filterFn = criteria;

    // HANDLE: 'selector' || dollar instance || node
    } else if (typeof criteria === strType || criteria.isDollar || utils.isDomNode(criteria)) {

        filterFn = function () {
            return $.fn.matchesSelector.call(this, criteria);
        };

    } else {
        return collection;
    }

    var result = [],
        i = 0,
        len = collection.length;

    for (; i < len; i++) {
        if (filterFn.call(collection[i], i, collection[i])) {
            result.push(collection[i]);
        }
    }

    return utils.merge($(), result.length > 1 ? utils.unique(result) : result);
};

$.fn.eq = function (index) {
    if (this[index]) {
        return $(this[index]);
    }
};

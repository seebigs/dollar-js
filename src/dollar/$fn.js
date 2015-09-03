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
            return matchesSelector(this, criteria)
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

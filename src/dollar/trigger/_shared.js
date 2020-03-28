
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

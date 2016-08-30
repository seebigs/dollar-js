
var activeEventListenersKey = 'activeEventListeners';

function bindEventHandlers (events, handler) {
    if (typeof events !== strType || typeof handler !== fnType) {
        return this;
    }

    events = events.split(' ');

    var addEventListenerCompat, i, evLen;
    this.each(function () {
        addEventListenerCompat = this.addEventListener || this.attachEvent;
        for (i = 0, evLen = events.length; i < evLen; i++) {
            addEventListenerCompat.call(this, events[i], handler, false);
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

    var i, evLen, handlers, j, hdlrLen;

    this.each(function () {
        for (i = 0, evLen = events.length; i < evLen; i++) {
            handlers = typeof handler === fnType ? [handler] : getElementData(DATA_CACHE_PRIVATE, this, activeEventListenersKey) || [];
            for (j = 0, hdlrLen = handlers.length; j < hdlrLen; j++) {
                if (this.removeEventListener) {
                    this.removeEventListener(events[i], handlers[j], false);

                } else {
                    this.detachEvent(events[i], handlers[j], false);
                }
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

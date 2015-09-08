/**
 * TRIGGER
 */

$.fn.on = $.fn.bind = function (events, handler) {
    if (typeof events !== strType || typeof handler !== fnType) {
        return this;
    }

    events = events.split(' ');

    var addEventListenerCompat = elemProto.addEventListener || elemProto.attachEvent,
        i, evLen;

    this.each(function () {
        for (i = 0, evLen = events.length; i < evLen; i++) {
            addEventListenerCompat.call(this, events[i], handler, false);
            pushElementData(this, 'activeEventListeners', handler);
        }
    });

    return this;
};

$.fn.off = $.fn.unbind = function (events, handler) {
    if (typeof events !== strType) {
        return this;
    }

    events = events.split(' ');

    var removeEventListenerCompat = elemProto.removeEventListener || elemProto.detachEvent,
        i, evLen, handlers, j, hdlrLen;

    this.each(function () {
        for (i = 0, evLen = events.length; i < evLen; i++) {
            handlers = typeof handler === fnType ? handlers = [handler] : getElementData(this, 'activeEventListeners');
            for (j = 0, hdlrLen = handlers.length; j < hdlrLen; j++) {
                removeEventListenerCompat.call(this, events[i], handlers[j], false);
            }
        }
    });

    return this;
};

function triggerEventOnElements (elems, eventName, args) {
    var ev;

    args.unshift(new Event(eventName));

    utils.each(elems, function () {
        ev = this[eventName];
        if (typeof ev === fnType) {
            ev.apply(this, args);
        }
    });
}

$.fn.trigger = function (eventName) {
    var args = arrSlice.call(arguments, 1);

    triggerEventOnElements(this, eventName, args);

    return this;
};

function bindOrTriggerEventHandler (eventName, args) {
    // transform Arguments object into an Array
    args = arrSlice.call(args);

    // bind handler to event
    if (args.length === 1 && typeof args[0] === fnType) {
        $.fn.on.call(this, eventName, args[0]);

    // trigger event
    } else {
        triggerEventOnElements(this, eventName, args);
    }

    return this;
}

$.fn.click = function () {
    return bindOrTriggerEventHandler.call(this, 'click', arguments);
};

$.fn.focus = function () {
    return bindOrTriggerEventHandler.call(this, 'focus', arguments);
};

$.fn.blur = function () {
    return bindOrTriggerEventHandler.call(this, 'blur', arguments);
};

$.fn.change = function () {
    return bindOrTriggerEventHandler.call(this, 'change', arguments);
};

$.fn.resize = function () {
    return bindOrTriggerEventHandler.call(this, 'resize', arguments);
};

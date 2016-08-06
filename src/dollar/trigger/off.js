
$.fn.off = $.fn.unbind = function (events, handler) {
    if (typeof events !== strType) {
        return this;
    }

    events = events.split(' ');

    var removeEventListenerCompat = elemProto.removeEventListener || elemProto.detachEvent,
        i, evLen, handlers, j, hdlrLen;

    this.each(function () {
        for (i = 0, evLen = events.length; i < evLen; i++) {
            handlers = typeof handler === fnType ? [handler] : getElementData(DATA_CAHCE_PRIVATE, this, 'activeEventListeners') || [];
            for (j = 0, hdlrLen = handlers.length; j < hdlrLen; j++) {
                removeEventListenerCompat.call(this, events[i], handlers[j], false);
            }
        }
    });

    return this;
};

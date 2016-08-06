
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
            pushElementData(DATA_CAHCE_PRIVATE, this, 'activeEventListeners', handler);
        }
    });

    return this;
};


$.fn.trigger = function (eventName) {
    if (!eventName) {
        return this;
    }

    var args = arrSlice.call(arguments, 1);

    triggerEventOnElements(this, eventName, args);

    return this;
};

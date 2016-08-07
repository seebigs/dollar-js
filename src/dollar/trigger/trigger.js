
$.fn.trigger = function (events) {
    if (typeof events !== strType) {
        return this;
    }

    events = events.split(' ');

    triggerEventsOnElements(this, events, arrSlice.call(arguments, 1));

    return this;
};

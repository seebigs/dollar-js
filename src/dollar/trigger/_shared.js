
function triggerEventOnElements (elems, eventName, args) {
    var ev;

    args.unshift(new win.Event(eventName));

    utils.each(elems, function () {
        ev = this[eventName];
        if (typeof ev === fnType) {
            ev.apply(this, args);
        }
    });
}

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

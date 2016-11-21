
/******************/
/* IE9-11 SUPPORT */
/******************/

(function (w) {

    function CustomEventPolyfill (event, customInit) {
        customInit = customInit || {
            bubbles: false,
            cancelable: false
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, customInit.bubbles, customInit.cancelable, customInit.detail);
        return evt;
    }

    if (typeof w.CustomEvent !== fnType) {

        CustomEventPolyfill.prototype = w.Event.prototype;

        w.CustomEvent = CustomEventPolyfill;
    }

})(win);

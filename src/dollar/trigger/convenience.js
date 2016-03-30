
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


$.fn.click = function (handler) {
    return bindOrTriggerConvenience.call(this, 'click', handler);
};

$.fn.focus = function (handler) {
    return bindOrTriggerConvenience.call(this, 'focus', handler);
};

$.fn.blur = function (handler) {
    return bindOrTriggerConvenience.call(this, 'blur', handler);
};

$.fn.change = function (handler) {
    return bindOrTriggerConvenience.call(this, 'change', handler);
};

$.fn.resize = function (handler) {
    return bindOrTriggerConvenience.call(this, 'resize', handler);
};

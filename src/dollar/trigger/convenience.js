/**
 * Handle a "click" event on any element in the current set
 * Equivalent to .on('click', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is clicked
 * @returns DollarJS (chainable)
 * @example $('div').click(function(event){ console.log(this); })
 */

$.fn.click = function (handler) {
    return bindOrTriggerConvenience.call(this, 'click', handler);
};

/**
 * Handle a "focus" event on any element in the current set
 * Equivalent to .on('focus', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is focused
 * @returns DollarJS (chainable)
 * @example $('input').focus(function(event){ console.log(this); })
 */

$.fn.focus = function (handler) {
    return bindOrTriggerConvenience.call(this, 'focus', handler);
};

/**
 * Handle a "blur" event on any element in the current set
 * Equivalent to .on('blur', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is unfocused
 * @returns DollarJS (chainable)
 * @example $('input').blur(function(event){ console.log(this); })
 */

$.fn.blur = function (handler) {
    return bindOrTriggerConvenience.call(this, 'blur', handler);
};

/**
 * Handle a "change" event on any element in the current set
 * Equivalent to .on('change', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is changed
 * @returns DollarJS (chainable)
 * @example $('input').change(function(event){ console.log(this); })
 */

$.fn.change = function (handler) {
    return bindOrTriggerConvenience.call(this, 'change', handler);
};

/**
 * Handle a "resize" event on any element in the current set
 * Equivalent to .on('resize', handler)
 * @module trigger
 * @param {Function} handler A function to execute when an element is resized
 * @returns DollarJS (chainable)
 * @example $(window).resize(function(event){ console.log(document.documentElement.clientWidth); })
 */

$.fn.resize = function (handler) {
    return bindOrTriggerConvenience.call(this, 'resize', handler);
};

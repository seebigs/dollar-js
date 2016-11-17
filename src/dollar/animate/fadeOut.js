/**
 * Hide the matched elements by slowly fading away
 * @module animate
 * @option {Number} duration Length of the transition
 * @option {Function} complete Callback to be executed after animation is complete
 * @returns DollarJS (chainable)
 */

$.fn.fadeOut = function (duration, complete) {
    return this.animate({ opacity: 0 }, duration, complete);
};

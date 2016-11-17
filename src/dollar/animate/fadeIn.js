/**
 * Slowly fade the matched elements into view
 * @module animate
 * @option {Number} duration Length of the transition
 * @option {Function} complete Callback to be executed after animation is complete
 * @returns DollarJS (chainable)
 */

$.fn.fadeIn = function (duration, complete) {
    return this.animate({ opacity: 1 }, duration, complete);
};

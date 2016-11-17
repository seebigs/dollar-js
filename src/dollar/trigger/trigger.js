/**
 * Trigger events on each element in the current set
 * Executes all handlers bound to each element in the current set corresponding to the given event names
 * @module trigger
 * @param {String} events A string-separated list of event names to be triggered
 * @option {Any} extraParameters... Additional parameters to pass along to the event handler
 * @returns DollarJS (chainable)
 * @example $('p').trigger('click')
 * @example $('p').trigger('click', 'extra', 'params')
 * @example $('p').trigger('one two three')
 */

$.fn.trigger = function (events) {
    if (typeof events !== strType) {
        return this;
    }

    events = events.split(' ');

    triggerEventsOnElements(this, events, arrSlice.call(arguments, 1));

    return this;
};

/**
 * Unbind some event handler from each element in the current set
 * Aliased as <b>.unbind()</b> for compatibility
 * If no <b>handler</b> is provided, ALL handlers will be unbound from the specified events
 * @module trigger
 * @param {String} events A space-separated list of events to unbind
 * @option {Function} handler A specific function to unbind
 * @returns DollarJS (chainable)
 * @example $('p').off('click')
 * @example $('p').off('click', justOneHandler)
 */

$.fn.off = $.fn.unbind = unbindEventHandlers;

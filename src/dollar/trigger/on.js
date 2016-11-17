/**
 * Bind some event handler to each element in the current set
 * Aliased as <b>.bind()</b> for compatibility
 * @module trigger
 * @param {String} events A space-separated list of events to listen for
 * @param {Function} handler A function to execute when one of the events is triggered
 * @returns DollarJS (chainable)
 * @example $('p').on('click', function(event){ console.log(this); })
 * @example $('p').on('custom', function(event){ console.log(event.detail); })
 */

$.fn.on = $.fn.bind = bindEventHandlers;

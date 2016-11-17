/**
 * Is the current set of elements a match to a new selector?
 * Returns true if at least one of the elements in the current set matches the new selector. Returns false if otherwise.
 * @module filter
 * @param {Selector} selector A selector expression to match elements against
 * @returns true or false
 * @example $('p').is('.foo')
 */

$.fn.is = function (selector) {
    return !!(selector && this.filter(selector).length);
};

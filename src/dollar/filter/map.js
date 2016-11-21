/**
 * Create a new set by calling a function on every element in the current set
 * @module filter
 * @param {Function} iteratee A function that returns an Element for the new set when passed (currentElement, index, collection)
 * @returns DollarJS (new set)
 * @example $('p').map(function(elem){ return elem.parentNode; })
 */

$.fn.map = function (iteratee) {
    if (typeof iteratee !== fnType) {
        return this;
    }

    var newSet = [];
    var newElem;

    for (var i = 0, len = this.length; i < len; i++) {
        newElem = iteratee.call(this[i], this[i], i, this);
        if (utils.isElement(newElem)) {
            newSet.push(newElem);
        } else {
            throw new Error('.map fn should return an Element, not ' + typeof newElem);
        }
    }

    return collect.call(this, newSet);
};

/**
 * Return the actual element at a given index
 * If <b>index</b> is passed, return the one element at the specified index
 * If <b>index</b> is NOT passed, return a true Array of the selected elements
 * @module core
 * @option {Integer} index Indicates the position of the element to return. Negative values count backwards from the end of the set.
 * @returns Element or Array of Elements
 * @example $('p').get(3)
 * @example $('p').get(-1)
 * @example $('p').get()
 */

$.fn.get = function (index) {
    if (index === undef) {
        // Return all the elements in a clean array
        return arrSlice.call(this, 0);

    } else {
        // Return just the one element from the set
        return index < 0 ? this[index + this.length] : this[index];
    }
};

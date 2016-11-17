/**
 * Unset data from each element in the current set
 * If <b>key</b> is not passed, ALL data will be removed
 * @module readwrite
 * @option {String} key A key under which specific data was stored
 * @returns DollarJS (chainable)
 * @example $('p').removeData('foo')
 * @example $('p').removeData()
 */

$.fn.removeData = function (key) {
    var elem, id;

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        id = getInternalElementId(elem);

        if (key) {
            // clean dollar data
            if (id) {
                delete DATA_CACHE_PUBLIC[id][key];
            }

            // clean DOM data
            if (elem) {
                if (elem.dataset) {
                    if (elem.dataset[key]) {
                        delete elem.dataset[key];
                    }

                } else {
                    removeAttributeSafely(elem, 'data-' + utils.format.camelToDash(key));
                }
            }

        } else {
            DATA_CACHE_PUBLIC[id] = {};
        }
    }

    return this;
};

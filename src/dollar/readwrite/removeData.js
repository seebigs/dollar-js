
$.fn.removeData = function (key) {
    var elem, id;

    for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        id = getInternalElementId(elem);

        if (key) {
            // clean dollar data
            if (id) {
                delete PUBLIC_DATA_CACHE[id][key];
            }

            // clean DOM data
            if (elem && elem.dataset && elem.dataset[key]) {
                delete elem.dataset[key];
            }

        } else {
            PUBLIC_DATA_CACHE[id] = {};
        }
    }

    return this;
};

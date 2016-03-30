
function getInternalElementId (elem) {
    return Number(elem.getAttribute(DATA_ATTR_ID)) || undef;
}

function setInternalElementId (elem, referenceId) {
    return elem.setAttribute(DATA_ATTR_ID, referenceId);
}

function getElementData (elem, attr, cache) {
    cache = cache || PRIVATE_DATA_CACHE;

    var id = getInternalElementId(elem);

    if (!attr) {
        return cache[id];
    }

    return id && cache[id] && cache[id][attr];
}

function setElementData (elem, attr, value, cache) {
    cache = cache || PRIVATE_DATA_CACHE;

    var id = getInternalElementId(elem);

    if (id) {
        cache[id][attr] = value;
    } else {
        var cachedElemData = {};
        cachedElemData[attr] = value;
        id = cache.push(cachedElemData) - 1;
        setInternalElementId(elem, id);
    }
}

function pushElementData (elem, attr, value, cache) {
    cache = cache || PRIVATE_DATA_CACHE;

    var id = getInternalElementId(elem),
        stack;

    if (id) {
        stack = cache[id][attr] || [];
        stack.push(value);
    } else {
        var cachedElemData = {};
        cachedElemData[attr] = [value];
        id = cache.push(cachedElemData) - 1;
        setInternalElementId(elem, id);
    }
}

function formatDashedToCamelCase (str) {
    return str.replace(/\-(.)/g, function (all, s) {
        return s.charAt(0).toUpperCase();
    });
}

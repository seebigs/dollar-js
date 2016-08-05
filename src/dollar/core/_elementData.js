
function nodeSupportsAttrProp (node) {
    // don't get/set attributes or properties on text, comment and attribute nodes
    var nType = node && node.nodeType;
    return nType && nType !== 3 && nType !== 8 && nType !== 2;
}

function getSafeNodeForAttributeManipulation (elem) {
    if (elem === docConstruct) {
        elem = docElement;
    }
    return nodeSupportsAttrProp(elem) ? elem : undef;
}

function getAttributeSafely (elem, attr) {
    elem = getSafeNodeForAttributeManipulation(elem);
    return elem && elem.hasAttribute(attr) ? elem.getAttribute(attr) : undef;
}

function setAttributeSafely (elem, attr, value) {
    elem = getSafeNodeForAttributeManipulation(elem);
    return elem && elem.setAttribute(attr, value);
}

function getInternalElementId (elem) {
    return Number(getAttributeSafely(elem, DATA_ATTR_ID)) || undef;
}

function setInternalElementId (elem, referenceId) {
    return setAttributeSafely(elem, DATA_ATTR_ID, referenceId);
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


var DATA_ATTR_NAME = 'dollar-node-id';
var DATA_NEXT_ID = 1;
var DATA_CACHE_PUBLIC = {};
var DATA_CACHE_PRIVATE = {};

function nodeSupportsAttrProp (node) {
    // don't get/set attributes or properties on text, comment and attribute nodes
    var nType = node && node.nodeType;
    return nType && nType !== 3 && nType !== 8 && nType !== 2;
}

function getSafeNodeForAttributeManipulation (elem) {
    if (elem.nodeType === 9) {
        elem = elem.documentElement;
    }
    return nodeSupportsAttrProp(elem) ? elem : undef;
}

function getAttributeSafely (elem, attr) {
    if (!elem) {
        return;
    }

    if (elem === elem.window) { // handle window
        return elem[attr];
    }

    elem = getSafeNodeForAttributeManipulation(elem);
    return elem && elem.hasAttribute(attr) ? elem.getAttribute(attr) : undef;
}

function setAttributeSafely (elem, attr, value) {
    if (elem === elem.window) { // handle window
        elem[attr] = value;
    }

    elem = getSafeNodeForAttributeManipulation(elem);
    return elem && elem.setAttribute(attr, value);
}

function removeAttributeSafely (elem, attr) {
    if (elem === elem.window) { // handle window
        elem[attr] = undef;
    }

    elem = getSafeNodeForAttributeManipulation(elem);
    return elem && elem.removeAttribute(attr);
}

function getInternalElementId (elem) {
    return Number(getAttributeSafely(elem, DATA_ATTR_NAME)) || undef;
}

function setInternalElementId (elem, dollarNodeId) {
    return setAttributeSafely(elem, DATA_ATTR_NAME, dollarNodeId);
}

function getElementData (cache, elem, key) {
    var id = getInternalElementId(elem);

    if (id) {
        if (!key) {
            return cache[id];
        }

        return cache[id] && cache[id][key];
    }
}

function setElementData (cache, elem, key, value) {
    var id = getInternalElementId(elem);

    if (!id) {
        id = DATA_NEXT_ID;
        setInternalElementId(elem, id);
        DATA_NEXT_ID++;
    }

    if (!cache[id]) {
        cache[id] = {};
    }

    cache[id][key] = value;
}

function pushElementData (cache, elem, key, value) {
    var valArr = getElementData(cache, elem, key) || [];
    valArr.push(value);
    setElementData(cache, elem, key, valArr);
}

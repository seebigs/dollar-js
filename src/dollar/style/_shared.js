
// get styles across various browsers
var getStyle = win.getComputedStyle !== undef ? getStyleModern : getStyleCompat;

function getStyleModern (elem, prop) {

    if (!elem || typeof prop !== strType) {
        return '';
    }

    // apparently, IE <= 11 will throw for elements in popups
    // and FF <= 30 will throw for elements in an iframe
    if (elem.ownerDocument.defaultView.opener) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null)[prop] || '';
    }

    return win.getComputedStyle(elem, null)[prop] || elem.style[prop] || '';
}

function getStyleCompat (elem, rawProp) {
    var prop;

    rawProp = typeof rawProp === strType ? rawProp : '';
    if (!elem) {
        return '';
    }

    if (rawProp === 'float') {
        prop = 'styleFloat';

    } else {
        prop = utils.format.dashToCamel(rawProp.replace(/^-ms-/, 'ms-'));
    }

    return elem.currentStyle[prop];
}

function getNonHiddenDisplayValue (elem) {
    var disp = elem.style.display;

    if (!disp || disp === 'none') {
        disp = getElementData(DATA_CACHE_PRIVATE, elem, 'nonHiddenDisplayValue') || '';
    }

    if (!disp && elem.parentNode) {
        var tmp = docConstruct.createElement(elem.nodeName);
        elem.parentNode.appendChild(tmp);
        disp = getStyle(tmp, 'display');
        elem.parentNode.removeChild(tmp);
        setElementData(DATA_CACHE_PRIVATE, elem, 'nonHiddenDisplayValue', disp);
    }

    return disp;
}

function getDocumentHeight () {
    return Math.max(docElement.offsetHeight, docElement.scrollHeight);
}

function getDocumentWidth () {
    return Math.max(docElement.offsetWidth, docElement.scrollWidth);
}

function getViewportHeight () {
    return Math.max(docElement.clientHeight, win.innerHeight);
}

function getViewportWidth () {
    return Math.max(docElement.clientWidth, win.innerWidth);
}

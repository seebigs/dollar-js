
// get styles across various browsers
var getStyle = win.getComputedStyle !== undef ? getStyleModern : $.compat.ie8.getStyle;

function getStyleModern (elem, prop) {
    // apparently, IE <= 11 will throw for elements in popups
    // and FF <= 30 will throw for elements in an iframe
    if (elem.ownerDocument.defaultView.opener) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null)[prop];
    }

    return win.getComputedStyle(elem, null)[prop];
}

function getNonHiddenDisplayValue (elem) {
    var disp = elem.style.display;

    if (!disp || disp === 'none') {
        disp = getElementData(elem, 'nonHiddenDisplayValue');
    }

    if (!disp) {
        var tmp = docConstruct.createElement(elem.nodeName);
        elem.parentNode.appendChild(tmp);
        disp = getStyle(tmp, 'display');
        elem.parentNode.removeChild(tmp);
        setElementData(elem, 'nonHiddenDisplayValue', disp);
    }

    return disp;
}

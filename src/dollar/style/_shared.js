
// get styles across various browsers
function getStyle (elem, prop) {
    // while setting CSS can be done with either camel-cased or dash-separated properties
    // getting computed CSS properties is persnickety about formatting

    // IE8
    if (win.getComputedStyle === undef) {
        prop = prop === 'float' ?
            'styleFloat' :
            prop = formatDashedToCamelCase(prop.replace(/^-ms-/, 'ms-')); // insure that property is camel cased

        return elem.currentStyle[prop];
    }

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

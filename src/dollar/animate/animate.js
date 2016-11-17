/**
 * Animate styles using CSS transitions
 * @module animate
 * @param {Object} props CSS properties and values to transition into
 * @option {Object|Number} options Object with transition options (duration, easing, delay) / transition delay as an integer
 * @option {Function} complete Callback to be executed after animation is complete
 * @returns DollarJS (chainable)
 */

$.fn.animate = function (props, options, complete) {
    if (!utils.isObject(options)) {
        options = {
            duration: options
        };
    }

    var endEvent = 'transitionend';
    this.each(function (elem, index) {
        utils.each(props, function (val, prop) {
            elem.style.transition = addTransition(elem, prop, options);
            elem.style[prop] = val;
            var afterAnimate = function (propName) {
                elem.removeEventListener(endEvent, afterAnimate, true);
                elem.style.transition = removeTransition(elem, propName);
                if (typeof complete === fnType) {
                    complete.call(elem, elem, index);
                }
            };
            elem.addEventListener(endEvent, afterAnimate, true);
        });
    });

    return this;
};

function addTransition (elem, prop, options) {
    var newStr = prop + ' ' + transitionOptionsAsString(options);
    var trans = elem.style.transition ? elem.style.transition.split(/,\s?/) : [];
    var existing = false;

    trans.forEach(function (t, i) {
        if (t.indexOf(prop + ' ') === 0) {
            trans[i] = newStr;
            existing = true;
        }
    });

    if (!existing) {
        trans.push(newStr);
    }

    return trans.join(', ');
}

function removeTransition (elem, prop) {
    var trans = elem.style.transition.split(/,\s?/);
    var without = [];

    trans.forEach(function (t) {
        if (t.indexOf(prop + ' ') !== 0) {
            without.push(t);
        }
    });

    return without.join(', ');
}

function transitionOptionsAsString (options) {
    var optsArr = [];

    optsArr.push(typeof options.duration === strType ? options.duration : ((parseInt(options.duration) || 400) + 'ms'));
    optsArr.push(options.easing || 'ease');
    optsArr.push(typeof options.delay === strType ? options.delay : ((parseInt(options.delay) || 0) + 'ms'));

    return optsArr.join(' ');
}

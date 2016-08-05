
/*****************/
/*  IE8 SUPPORT  */
/*****************/

if (!Array.isArray) {
    Array.isArray = function (thing) {
        return Object.prototype.toString.call(thing) === '[object Array]';
    };
}

/* eslint-disable */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
/* eslint-enable */

if (!elemProto.getElementsByClassName) {
    elemProto.getElementsByClassName = function (selector) {
        if (this.querySelectorAll) {
            return this.querySelectorAll('.' + selector);

        } else {
            var results = [];
            var elements = this.getElementsByTagName('*');
            var pattern = new RegExp('(^|\\s)' + selector + '(\\s|$)');
            for (var i = 0; i < elements.length; i++) {
                if (pattern.test(elements[i].className)) {
                    results.push(elements[i]);
                }
            }

            return results;
        }
    };
}

if (Object.defineProperty && Object.getOwnPropertyDescriptor) {

    if (Object.getOwnPropertyDescriptor(elemProto, 'textContent') && !Object.getOwnPropertyDescriptor(elemProto, 'textContent').get) {
        (function () {
            var innerText = Object.getOwnPropertyDescriptor(elemProto, 'innerText');
            Object.defineProperty(elemProto, 'textContent', {
                get: function () {
                    return innerText.get.call(this);
                },
                set: function (s) {
                    return innerText.set.call(this, s);
                }
            });
        })();
    }

    if (!('nextElementSibling' in docElement)) {
        Object.defineProperty(elemProto, 'nextElementSibling', {
            get: function () {
                var elem = this.nextSibling;

                while (elem && elem.nodeType !== 1) {
                    elem = elem.nextSibling;
                }

                return elem;
            }
        });
    }

}

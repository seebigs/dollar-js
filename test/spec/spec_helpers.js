var selectors = [
    '#container',
    '#container.div',
    '.div',
    '.radio.checked',
    '.radio .checked',
    '.radio:checked',
    'li',
    'li:nth-child(2n)',
    'li p',
    'li > p',
    '.id + .div'
    // pseudo classes aren't part of the dom
    // and can't be selected, sadly.
    
    // '.pseudo-class:before',
    // '.pseudo-class:after'
];

var sharedExpectations = {
    
    compareCollection: function (nodeListOne, nodeListTwo) {
        expect(nodeListOne.length).toBe(nodeListTwo.length);

        var passed = true;

        for (var i = 0, len = nodeListOne.length; i < len; i++) {
            if (nodeListOne[i] !== nodeListTwo[i]) {
                passed = false;
            }
        }

        expect(passed).toBe(true);
    },

    compareCollectionForFn: function (fnName, paramTypes) {

        var paramTypes = paramTypes || ['string', 'node', 'dollar'];

        var _this = this,
            i = 0,
            len = selectors.length,
            j = len;

        for (; i < len, j > 0; i++, j--) {

            if (paramTypes === []) {
                var dolCol = $(selectors[i])[fnName],
                    jQCol = jQuery(selectors[i])[fnName];

                it('returns a dollar collection', function () {
                    expect(dolCol.isDollar).toBe(true);
                });

                it('returns the same collection as jQuery', function () {
                    _this.compareCollection(dolCol.get(), jQCol.get());
                });
            }

            if (paramTypes.indexOf('string') !== -1) {
                var dolColStringSel = $(selectors[i])[fnName](selectors[j]),
                    jQColStringSel = jQuery(selectors[i])[fnName](selectors[j]);

                it('returns a dollar collection when $(' + selectors[i] + ') is passed the string ' + selectors[j], function () {
                    expect(dolColStringSel.isDollar).toBe(true);
                });

                it('returns the same collection as jQuery when $(' + selectors[i] + ') is passed the string ' + selectors[j], function () {
                    _this.compareCollection(dolColStringSel.get(), jQColStringSel.get());
                });
            }

            if (paramTypes.indexOf('node') !== -1) {
                var dolColNodeSel = $($(selectors[i])[0])[fnName]($(selectors[j])[0]),
                    jQColNodeSel = jQuery(jQuery(selectors[i])[0])[fnName](jQuery(selectors[j])[0]);

                it('returns a dollar collection when  $(' + selectors[i] + ') is passed a node found with ' + selectors[j], function () {
                    expect(dolColNodeSel.isDollar).toBe(true);
                });

                it('returns the same collection as jQuery when  $(' + selectors[i] + ') is passed a node found with ' + selectors[j], function () {
                    _this.compareCollection(dolColNodeSel.get(), jQColNodeSel.get());
                });
            }

            if (paramTypes.indexOf('dollar') !== -1) {
                var dolColInstanceSel = $($(selectors[i]))[fnName]($(selectors[j])),
                    jQColInstanceSel = jQuery(jQuery(selectors[i]))[fnName](jQuery(selectors[j]));

                it('returns a dollar collection when $(' + selectors[i] + ') is passed a dollar instance w/ selector ' + selectors[j], function () {
                    expect(dolColInstanceSel.isDollar).toBe(true);
                });

                it('returns the same collection as jQuery when $(' + selectors[i] + ') is passed a dollar instance w/ selector ' + selectors[j], function () {
                    _this.compareCollection(dolColInstanceSel.get(), jQColInstanceSel.get());
                });
            }

            if (paramTypes.indexOf('function') !== -1) {
                var testCallback = function (i, node) { return !!(i % 2) },
                    dolColFnSel = $($(selectors[i]))[fnName](testCallback),
                    jQColFnSel = jQuery(jQuery(selectors[i]))[fnName](testCallback);

                it('returns a dollar collection when $(' + selectors[i] + ') is passed a callback function ', function () {
                    expect(dolColFnSel.isDollar).toBe(true);
                });

                it('returns the same collection as jQuery when $(' + selectors[i] + ') passed a callback function ', function () {
                    _this.compareCollection(dolColFnSel.get(), jQColInstanceSel.get());
                });
            }
        }
    },

    noParamsPassedForFn: function (fnName) {

        if (!fnName) {
            throw 'Must pass a function name to test SharedExpectations.emptySelector';
        }

        selectors.forEach( function (selector) {
            var dolRes = $(selector)[fnName]();
            expect(dolRes.length).toBe(0);
            expect(dolRes.isDollar).toBe(true);
        });
    }
}
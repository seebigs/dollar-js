var sharedExpectations = (function () {

    var _this = this,
        _selectors = [
            '#container',
            '#container.div',
            'form',
            '#form',
            'input button#button',
            '.div',
            '.radio.checked',
            '.radio .checked',
            '.radio:checked',
            'p:first-child',
            'li:last-child',
            'li',
            'li:nth-child(2n)',
            'li p',
            'li > p',
            'li p:empty',
            '.id + .div',
            '.id ~ div',
            ':empty',
            '[data-test-value="test"]',
            '[data-test-value|="test"]',
            '[data-test-value$="-three"]',
            '[data-test-value*="four"]',
            // TODO: build support around these selectors?
            // ':parent'
            // ':header',
            // ':button',
            // ':checkbox',
            // ':disabled',
            // ':enabled',
            // :visible
            // :hidden
            // ':contains(text)',
            // 'form:has(button)',
            // 'ul#list li:eq(3)',
            //             'li:even',

            // pseudo classes aren't part of the dom
            // and can't be selected, sadly.
            // '.pseudo-class:before',
            // '.pseudo-class:after'
        ];

    return {

        compareCollectionForFn: function (fnName, paramTypes) {

            var i = 0,
                len = _selectors.length,
                j = 0;

            for (; i < len; i++) {
                for (; j < len; j++) {

                    if (!paramTypes) {
                        compareWithNone(_selectors[i], fnName, _selectors[j]);
                    } else {

                        if (paramTypes.indexOf('') !== -1) {
                            compareWithNone(_selectors[i], fnName, _selectors[j]);
                        }

                        if (paramTypes.indexOf('string') !== -1) {
                            compareWithString(_selectors[i], fnName, _selectors[j]);
                        }

                        if (paramTypes.indexOf('node') !== -1) {
                            compareWithNode(_selectors[i], fnName, _selectors[j]);
                        }

                        if (paramTypes.indexOf('dollar') !== -1) {
                            compareWithDollarInstance(_selectors[i], fnName, _selectors[j]);
                        }

                        if (paramTypes.indexOf('function') !== -1) {
                            compareWithCallback(_selectors[i], fnName, _selectors[j]);
                        }
                    }
                }
            }
        },

        noParamsPassedForFn: function (fnName) {

            if (!fnName) {
                throw 'Must pass a function name to test';
            }

            _selectors.forEach( function (selector) {
                var dolRes = $(selector)[fnName]();
                expect(dolRes.length).toBe(0);
                expect(dolRes.isDollar).toBe(true);
            });
        },

        // exposed for testing init
        selectors: _selectors,
        compareCollection: _compareCollection,
        // loopSelectorsForFn: _loopSelectorsForFn
    }

    // -----------------------------------------------
    // private helpers
    // -----------------------------------------------
    
    // function _loopSelectorsForFn (fnName) {
    //     var i = 0,
    //         len = _selectors.length,
    //         j = 0;

    //     for (; i < len; i++) {
    //         for (; j < len; j++) {
    //             _compareCollection($(_selectors[i])[fnName](), jQuery(_selectors[i])[fnName]());
    //         }
    //     }
    // }

    function _compareCollection (nodeListOne, nodeListTwo) {
        expect(nodeListOne.length).toBe(nodeListTwo.length);

        var collectionsMatch = true;

        for (var i = 0, len = nodeListOne.length; i < len; i++) {
            if (nodeListOne[i] !== nodeListTwo[i]) {
                collectionsMatch = false;
            }
        }

        expect(collectionsMatch).toBe(true);
    }

    function compareWithNone (context, fnName, selector) {
        var dolCol = $(context)[fnName](),
            jQCol = jQuery(context)[fnName]();

        it('returns a dollar collection', function () {
            expect(dolCol.isDollar).toBe(true);
        });

        it('returns the same collection as jQuery', function () {
            _compareCollection(dolCol.get(), jQCol.get());
        });
    }

    function compareWithString (context, fnName, selector) {
        var dolColStringSel = $(context)[fnName](selector),
            jQColStringSel = jQuery(context)[fnName](selector);

        it('returns a dollar collection when $(' + context + ') is passed the string ' + selector, function () {
            expect(dolColStringSel.isDollar).toBe(true);
        });

        it('returns the same collection as jQuery when $(' + context + ') is passed the string ' + selector, function () {
            _compareCollection(dolColStringSel.get(), jQColStringSel.get());
        });
    }

    function compareWithNode (context, fnName, selector) {
        var dolColNodeSel = $($(context)[0])[fnName]($(selector)[0]),
            jQColNodeSel = jQuery(jQuery(context)[0])[fnName](jQuery(selector)[0]);

        it('returns a dollar collection when  $(' + context + ') is passed a node found with ' + selector, function () {
            expect(dolColNodeSel.isDollar).toBe(true);
        });

        it('returns the same collection as jQuery when  $(' + context + ') is passed a node found with ' + selector, function () {
            _compareCollection(dolColNodeSel.get(), jQColNodeSel.get());
        });
    }

    function compareWithDollarInstance (context, fnName, selector) {
        var dolColInstanceSel = $($(context))[fnName]($(selector)),
            jQColInstanceSel = jQuery(jQuery(context))[fnName](jQuery(selector));

        it('returns a dollar collection when $(' + context + ') is passed a dollar instance w/ selector ' + selector, function () {
            expect(dolColInstanceSel.isDollar).toBe(true);
        });

        it('returns the same collection as jQuery when $(' + context + ') is passed a dollar instance w/ selector ' + selector, function () {
            _compareCollection(dolColInstanceSel.get(), jQColInstanceSel.get());
        });
    }

    function compareWithCallback (context, fnName, selector) {
        var testCallback = function (i, node) { return !!(i % 2) },
            dolColFnSel = $($(context))[fnName](testCallback),
            jQColFnSel = jQuery(jQuery(context))[fnName](testCallback);

        it('returns a dollar collection when $(' + context + ') is passed a callback function ', function () {
            expect(dolColFnSel.isDollar).toBe(true);
        });

        it('returns the same collection as jQuery when $(' + context + ') passed a callback function ', function () {
            _compareCollection(dolColFnSel.get(), jQColFnSel.get());
        });
    }
})();
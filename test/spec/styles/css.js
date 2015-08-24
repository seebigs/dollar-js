(function () {
    var selectors = sharedExpectations.selectors,
        css = [
            { prop: 'background-color', val: 'red' },
            { prop: 'backgroundColor', val: 'blue' },
            { prop: 'fontFamily', val: 'helvetica' },
            { prop: 'font-family', val: 'arial' },
            { prop: 'width', val: '50px' },
            { prop: 'width', val: '150' },
            { prop: 'width', val: 250 },
            { prop: 'display', val: 'none' },
            { prop: 'display', val: 'block' },
            { prop: 'float', val: 'left' },
            { prop: 'position', val: 'absolute' }
        ];

    beforeEach( function () {
        for (var i = 0; i < selectors.length; i++) {
            for (var j = 0; j < css.length; j++) {
                $(selectors[i]).css(css[j], '');
            }
        }
    });

    describe('css', function () {
        var i = 0,
            len = selectors.length;

        var j = 0,
            cssLen = css.length;

        for (; i < len; i++) {
            for (; j < cssLen; j++) {
                compareSharedExpectations(selectors[i], css[j]);
            }
        }
    });

    function compareSharedExpectations (selector, cssSet) {
        it('accepts two strings ("prop", "val")', function () {
            $(selector).css(cssSet.prop, cssSet.val);
            compareSetStyles(selector, cssSet);
        });

        it('accepts a function', function () {
            $(selector).css(cssSet.prop, function () {
                return cssSet.val;
            });
            compareSetStyles(selector, cssSet);
        });

        it('accepts an object ({ prop, val })', function () {
            $(selector).css(cssSet);
            compareSetStyles(selector, cssSet);
        });

        function compareSetStyles () {
            var selection = $(selector).get(),
                k = 0,
                selLen = selection.length;

            for (; k < selLen; k++) {
                expect($(selector).css(cssSet.prop)).toBe(jQuery(selector).css(cssSet.prop));
            }
        }
    }
})();
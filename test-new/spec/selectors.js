(function () {
    describe('selectors', function () {

        beforeEach(function () {
            jasmine.addMatchers(SPEC.customMatchers);
        });

        describe('mimic jQuery', function () {
            jQuery.each(SPEC.selectors.matchJQuery, function (sel, match) {
                it('matches ' + sel, function () {
                    expect($(sel).get()).toEqual(jQuery(sel).get());
                });
            });
        });

        describe('match our DOM', function () {
            jQuery.each(SPEC.selectors.matchJQuery, function (sel, match) {
                it('matches ' + sel, function () {
                    expect($(sel)).toMatchElementsWith(match);
                });
            });
        });

        describe('handle all types', function () {
            var emptyDollar = new $.fn.init();

            it('handles no selector', function () {
                expect($()).toEqual(emptyDollar);
            });

            it('handles empty string as selector', function () {
                expect($('')).toEqual(emptyDollar);
            });

            it('handles null as selector', function () {
                expect($(null)).toEqual(emptyDollar);
            });

            it('handles false as selector', function () {
                expect($(false)).toEqual(emptyDollar);
            });

            it('handles true as selector', function () {
                expect($(true)).toEqual(emptyDollar);
            });

            // it('handles array as selector', function () {
            //     expect($([1,2,3])).toEqual(emptyDollar);
            // });

            it('handles object as selector', function () {
                expect($({abc:123})).toEqual(emptyDollar);
            });

            it('handles dollar instance as selector', function () {
                expect($($('a'))).toEqual($('a'));
            });

            it('handles HTML string as selector', function () {
                expect($('<div></div>')[0].nodeName).toEqual('DIV');
            });

            it('handles element as selector', function () {
                var elem = document.getElementById('slim_shady');
                expect($(elem)[0]).toEqual(elem);
            });

            // it('handles function as selector', function () {
            //     var obj = {
            //         fn: function () {}
            //     };
            //
            //     spyOn(obj, 'fn');
            //     $(obj.fn);
            //     expect(obj.fn).toHaveBeenCalled();
            // });

        });

    });
})();

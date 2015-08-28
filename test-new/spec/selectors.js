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

    });
})();

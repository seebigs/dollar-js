(function () {
    describe('init', function () {
        it('returns empty dollar collection when passed no arguments', function () {
            expect($().isDollar).toBe(true);
            expect($().length).toBe(jQuery().length);
        });

        it('returns elements when passed a string selector', function () {
            selectors.forEach(function (selector) {
                sharedExpectations.compareCollection($(selector).get(), jQuery(selector).get());
            });
        });

        it('returns elements when passed a node selector', function () {
            selectors.forEach(function (selector) {
                sharedExpectations.compareCollection($($(selector)[0]).get(), jQuery(jQuery(selector)[0]).get());
            });
        });

        it('returns elements when passed a dollar/jQ instance', function () {
            selectors.forEach(function (selector) {
                sharedExpectations.compareCollection($($(selector)).get(), jQuery(jQuery(selector)).get());
            });
        });

        it('binds to document ready', function () {
            // $()
        });
    });
})();

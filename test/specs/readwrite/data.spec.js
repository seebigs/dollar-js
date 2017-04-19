(function () {

    describe(".data", function () {

        describe("gets element data", function () {

            it("DOM element has a dollar-node-id but DATA_CACHE_PUBLIC is undefined", function (expect) {
                // This happens when DATA_CACHE_PRIVATE has been used already
                expect($('#data_baby').data('howSlobbery')).toBe('to the bib');
            });

            it("pre-existing data from the DOM", function (expect) {
                expect($('#data_daddy').data('howBad')).toBe('to the bone');
            });

            it("set by dollar", function (expect) {
                $('#data_daddy').data('rides', ['harley','tbird']);
                expect($('#data_daddy').data('rides')).toEqual(['harley','tbird']);
            });

            it("all data at once", function (expect) {
                $('#data_daddy').data('rides', ['harley','tbird']);
                expect($('#data_daddy').data()).toEqual({
                    howBad: 'to the bone',
                    rides: ['harley','tbird']
                });
            });

            it("returns undefined when no data is set", function (expect) {
                expect($('#data_daddy').data('yomomma')).toBe(void 0);
            });

            it('returns falsy data', function (expect) {
                $('#data_daddy').data('foo', 0);
                expect($('#data_daddy').data('foo')).toBe(0);
            });

        });

        describe("sets element data", function () {

            it("one key at a time", function (expect) {
                $('#data_daddy span').data('coolCat', true);
                expect($('#data_daddy span').data()).toEqual({ coolCat: true });
            });

            it("many at a time", function (expect) {
                $('#data_daddy span').data({
                    face: 'scruff',
                    voice: 'gruff'
                });
                expect($('#data_daddy span').data()).toEqual({
                    face: 'scruff',
                    voice: 'gruff'
                });
            });

            it("with complex data types", function (expect) {
                $('#data_daddy').data('fn', function () {});
                expect(typeof $('#data_daddy').data('fn')).toBe('function');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('#data_daddy').data('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();

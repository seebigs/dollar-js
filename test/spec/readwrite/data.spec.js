(function () {

    describe(".data", function () {

        describe("sets element data", function () {

            it("one key at a time", function () {
                $('#data_daddy span').data('coolCat', true);
                expect($('#data_daddy span').data()).toEqual({ coolCat: true });
            });

            it("many at a time", function () {
                $('#data_daddy span').data({
                    face: 'scruff',
                    voice: 'gruff'
                });
                expect($('#data_daddy span').data()).toEqual({
                    face: 'scruff',
                    voice: 'gruff'
                });
            });

            it("with complex data types", function () {
                $('#data_daddy').data('fn', function () {});
                expect(typeof $('#data_daddy').data('fn')).toBe('function');
            });

        });

        describe("gets element data", function () {

            it("pre-existing data from the DOM", function () {
                expect($('#data_daddy').data('howBad')).toBe('to the bone');
            });

            it("set by dollar", function () {
                $('#data_daddy').data('rides', ['harley','tbird']);
                expect($('#data_daddy').data('rides')).toEqual(['harley','tbird']);
            });

            it("all data at once", function () {
                $('#data_daddy').data('rides', ['harley','tbird']);
                expect($('#data_daddy').data()).toEqual({
                    howBad: 'to the bone',
                    rides: ['harley','tbird']
                });
            });

            it("returns undefined when no data is set", function () {
                expect($('#data_daddy').data('yomomma')).toBe(void 0);
            });

            it('returns falsy data', function () {
                $('#data_daddy').data('foo', 0);
                expect($('#data_daddy').data('foo')).toBe(0);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function () {
                expect($('#data_daddy').data('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();

(function () {

    describe(".removeData", function () {

        describe("remove element data", function () {

            it("pre-existing data from the DOM", function (expect) {
                $('#data_daddy').removeData('howBad');
                expect($('#data_daddy').data()).toEqual({});
            });

            it("set by dollar", function (expect) {
                $('#data_daddy').data('rides', ['harley','tbird']);
                $('#data_daddy').removeData('rides');
                expect($('#data_daddy').data('rides')).toBe(void 0);
            });

            it("all data at once", function (expect) {
                $('#data_daddy span').data('face', 'scruff');
                $('#data_daddy span').data('voice', 'gruff');
                $('#data_daddy span').removeData();
                expect($('#data_daddy span').data()).toEqual({});
            });

            it("does not remove the wrong data", function (expect) {
                $('#data_daddy').data('sick', 'shades');
                $('#data_daddy').removeData('yomomma');
                expect($('#data_daddy').data()).toEqual({
                    howBad: 'to the bone',
                    sick: 'shades'
                });
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('#data_daddy').removeData('foo').isDollar).toBe(true);
            });
        });

    });

})();

(function () {

    describe(".val", function () {

        describe("handles all types of arguments", function () {

            it("returns value when no args provided", function (expect) {
                // for one element
                expect($('#tbox').val()).toBe('momma');
                // returns the first of many
                expect($('input', '#readwrite').val()).toBe('onoff');

                expect($().val()).toBe(jQuery().val());
            });

            it("sets values", function (expect) {
                $('#tbox').val('poppa');
                expect(document.getElementById('tbox').value).toBe('poppa');
            });

            it("handles function as insertion", function (expect) {
                $('#tbox').val(function (oldVal, i) {
                    return 'now' + i + oldVal;
                });
                expect(document.getElementById('tbox').value).toBe('now0momma');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('.wonka').val('foo').isDollar).toBe(true);
            });
        });

    });

})();

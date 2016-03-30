(function () {

    describe(".val", function () {

        describe("handles all types of arguments", function () {

            it("returns value when no args provided", function () {
                // for one element
                expect($('#tbox').val()).toBe('momma');
                // returns the first of many
                expect($('input', '#readwrite').val()).toBe('onoff');
            });

            it("sets values", function () {
                $('#tbox').val('poppa');
                expect(document.getElementById('tbox').value).toBe('poppa');
            });

            it("handles function as insertion", function () {
                $('#tbox').val(function (i, oldVal) {
                    return 'now' + i + oldVal;
                });
                expect(document.getElementById('tbox').value).toBe('now0momma');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function () {
                expect($('.wonka').val('foo').isDollar).toBe(true);
            });
        });

    });

})();

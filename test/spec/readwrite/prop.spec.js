(function () {

    describe(".prop", function () {

        describe("handles all types of arguments", function () {

            it("gets a property when it exists", function () {
                // pre-existing
                expect($('#cbox').prop('disabled')).toBe(true);
                // set by dollar
                $('#cbox').prop('checked', true);
                expect($('#cbox').prop('checked')).toBe(true);
            });

            it("returns undefined when no property is set", function () {
                expect($('#cbox').prop('yomomma')).toBe(void 0);
            });

            it("handles function as property", function () {
                $('#cbox').prop('value', function (i, oldVal) {
                    return 'now' + i + oldVal;
                });
                expect($('#cbox').prop('value')).toBe('now0onoff');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function () {
                expect($('#cbox').prop('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();

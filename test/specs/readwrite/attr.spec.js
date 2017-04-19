(function () {

    describe(".attr", function () {

        describe("handles all types of arguments", function () {

            it("gets attributes from the DOM", function (expect) {
                expect($('#image').attr('alt')).toBe('fakeroo');
            });

            it("sets attributes within dollar", function (expect) {
                $('#image').attr('flash', 'thunder');
                expect($('#image').attr('flash')).toBe('thunder');
            });

            it("returns undefined when no attribute is set", function (expect) {
                expect($('#image').attr('yomomma')).toBe(void 0);
            });

            it("handles function as attribute", function (expect) {
                $('#image').attr('alt', function (oldVal, i) {
                    return 'now' + i + oldVal;
                });
                expect($('#image').attr('alt')).toBe('now0fakeroo');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('#image').attr('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();

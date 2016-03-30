(function () {

    describe(".attr", function () {

        describe("handles all types of arguments", function () {

            it("gets attributes from the DOM", function () {
                expect($('#image').attr('alt')).toBe('fakeroo');
            });

            it("sets attributes within dollar", function () {
                $('#image').attr('flash', 'thunder');
                expect($('#image').attr('flash')).toBe('thunder');
            });

            it("returns undefined when no attribute is set", function () {
                expect($('#image').attr('yomomma')).toBe(void 0);
            });

            it("handles function as attribute", function () {
                $('#image').attr('alt', function (i, oldVal) {
                    return 'now' + i + oldVal;
                });
                expect($('#image').attr('alt')).toBe('now0fakeroo');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function () {
                expect($('#image').attr('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();

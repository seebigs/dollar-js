(function () {

    describe(".on", function () {

        describe("binds a native event listener", function () {

            it("hears when a native event is triggered", function (expect) {
                var clicked = false;
                $('#slim_shady').on('click', function (e) {
                    if (e.target.id === 'slim_shady') {
                        clicked = true;
                    }
                });
                $('#slim_shady').click();
                expect(clicked).toBe(true);
            });

        });

        describe("binds a custom event listener", function () {

            it("hears when a custom event is triggered", function (expect) {
                var clicked = false;
                $('#slim_shady').on('goTime', function (e) {
                    if (e.target.id === 'slim_shady') {
                        clicked = true;
                    }
                });
                $('#slim_shady').trigger('goTime');
                expect(clicked).toBe(true);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').on('foo', function () {}).isDollar).toBe(true);
            });
        });

        describe("allows optional custom error handlers", function () {

            it("handles errors in triggered events", function (expect) {
                var handled;
                $.onEventError(function (err) {
                    handled = err.message;
                });
                $('#slim_shady').on('click', function () {
                    throw new Error('bad code');
                });
                $('#slim_shady').click();
                expect(handled).toBe('bad code');
            });

        });

    });

})();

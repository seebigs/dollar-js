(function () {

    describe(".trigger", function () {

        describe("firing an event", function () {

            it("triggers a previously-bound event listener for a native event name", function () {
                var clicked = false;
                $('#slim_shady').on('click', function () {
                    clicked = true;
                });
                $('#slim_shady').trigger('click');
                expect(clicked).toBe(true);
            });

            it("triggers a previously-bound event listener for a custom event name", function () {
                var clicked = false;
                $('#slim_shady').on('goTime', function () {
                    clicked = true;
                });
                $('#slim_shady').trigger('goTime');
                expect(clicked).toBe(true);
            });

            it("passes arguments to the handler", function () {
                var foundArgs = false;
                $('#slim_shady').on('goTime', function (e) {
                    if (e.detail[0] === 'arg1' && e.detail[0] === 'arg1') {
                        foundArgs = true;
                    }
                });
                $('#slim_shady').trigger('goTime', 'arg1', 'arg2');
                expect(foundArgs).toBe(true);
            });

            it("can trigger multiple space-separated events", function () {
                var clicked = 0;
                $('#slim_shady').on('one two three', function () {
                    clicked++;
                });
                $('#slim_shady').trigger('one two three');
                expect(clicked).toBe(3);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('#slim_shady').trigger().isDollar).toBe(true);
            });
        });

    });

})();

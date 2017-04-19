(function () {

    describe(".trigger", function () {

        describe("firing an event", function () {

            it("triggers native events", function (expect) {
                $('.trigger').click();
                expect(document.getElementById('cbox01').checked).toBe(true);
                expect(document.getElementById('cbox02').checked).toBe(true);
            });

            it("triggers a previously-bound event listener for a native event name", function (expect) {
                var clicked = 0;
                $('#slim_shady').on('click', function () {
                    clicked++;
                });
                $('#slim_shady').trigger('click');
                $('#slim_shady').trigger('click');
                expect(clicked).toBe(2);
            });

            it("triggers a previously-bound event listener for a custom event name", function (expect) {
                var clicked = 0;
                $('#slim_shady').on('goTime', function () {
                    clicked++;
                });
                $('#slim_shady').trigger('goTime');
                $('#slim_shady').trigger('goTime');
                expect(clicked).toBe(2);
            });

            it("passes arguments to the handler", function (expect) {
                var foundArgs = false;
                $('#slim_shady').on('goTime', function (e) {
                    if (e.detail[0] === 'arg1' && e.detail[0] === 'arg1') {
                        foundArgs = true;
                    }
                });
                $('#slim_shady').trigger('goTime', 'arg1', 'arg2');
                expect(foundArgs).toBe(true);
            });

            it("can trigger multiple space-separated events", function (expect) {
                var clicked = 0;
                $('#slim_shady').on('one two three', function () {
                    clicked++;
                });
                $('#slim_shady').trigger('one two three');
                expect(clicked).toBe(3);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').trigger().isDollar).toBe(true);
            });
        });

    });

})();

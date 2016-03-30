(function () {

    describe(".trigger", function () {

        describe("fires an event", function () {

            it("triggers a previously-bound event listener", function () {
                var clicked = false;
                $('#slim_shady').on('click', function () {
                    clicked = true;
                });
                $('#slim_shady').trigger('click');
                expect(clicked).toBe(true);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('#slim_shady').trigger().isDollar).toBe(true);
            });
        });

    });

})();
